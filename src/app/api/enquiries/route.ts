import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorId = searchParams.get('vendorId');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    const where: any = {};
    if (vendorId) where.vendorId = vendorId;
    if (userId) where.userId = userId;
    if (status && status !== 'ALL') where.status = status;

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            slug: true,
            city: true,
            category: { select: { name: true } },
          },
        },
        eventType: true,
      },
    });

    return NextResponse.json({ success: true, enquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      vendorId,
      userId,
      name,
      mobile,
      email = '',
      eventType = 'Wedding',
      eventDate = '',
      location = '',
      guestCount = 100,
      budget = '',
      requiredServices = '',
      message = '',
    } = body;

    if (!vendorId || !name || !mobile) {
      return NextResponse.json(
        { error: 'Vendor ID, Name, and Mobile Number are required.' },
        { status: 400 }
      );
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Find or link event type if exists
    let eventTypeId: string | null = null;
    if (eventType) {
      const et = await prisma.eventType.findFirst({
        where: {
          OR: [
            { name: { contains: eventType } },
            { slug: { contains: eventType.toLowerCase() } },
          ],
        },
      });
      if (et) eventTypeId = et.id;
    }

    const parsedBudget = budget ? parseFloat(budget.replace(/[^0-9.]/g, '')) || null : null;

    // Create Enquiry
    const enquiry = await prisma.enquiry.create({
      data: {
        vendorId,
        userId: userId || null,
        name,
        mobile,
        email,
        eventTypeId,
        eventDate,
        location: location || vendor.city,
        guestCount: Number(guestCount) || null,
        budget: parsedBudget,
        requiredServices,
        message: message || `Enquiry for ${eventType} on ${eventDate || 'upcoming date'}.`,
        status: 'NEW',
      },
    });

    // Create a corresponding Lead for vendor CRM pipeline
    await prisma.lead.create({
      data: {
        vendorId,
        clientName: name,
        clientPhone: mobile,
        clientEmail: email,
        eventType,
        budget: parsedBudget,
        eventDate,
        city: location || vendor.city,
        status: 'NEW',
        notes: `Enquiry generated from VentZivo portal. Services: ${requiredServices}`,
      },
    });

    // Send Notification to Vendor
    if (vendor.userId) {
      await prisma.notification.create({
        data: {
          userId: vendor.userId,
          title: `New Lead: ${name} (${eventType})`,
          message: `${name} sent an enquiry for ${eventType} in ${location || vendor.city}. Phone: ${mobile}`,
          type: 'NEW_ENQUIRY',
          link: '/vendor/dashboard/enquiries',
        },
      });
    }

    return NextResponse.json({ success: true, enquiry });
  } catch (error: any) {
    console.error('Enquiry error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, vendorNotes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(vendorNotes !== undefined && { vendorNotes }),
      },
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
