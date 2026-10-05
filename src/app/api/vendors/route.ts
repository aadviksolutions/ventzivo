import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';
    const eventType = searchParams.get('eventType') || '';
    const category = searchParams.get('category') || '';
    const subCategory = searchParams.get('subCategory') || '';
    const city = searchParams.get('city') || '';
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 10000000;
    const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : 0;
    const experience = searchParams.get('experience') ? Number(searchParams.get('experience')) : 0;
    const verifiedOnly = searchParams.get('verified') === 'true';
    const featuredOnly = searchParams.get('featured') === 'true';
    const status = searchParams.get('status') || ''; // if admin wants all or pending
    const sort = searchParams.get('sort') || 'recommended';

    // Where filters
    const where: any = {};

    // By default, public search only shows APPROVED or VERIFIED vendors
    if (status) {
      if (status !== 'ALL') {
        where.status = status;
      }
    } else {
      where.status = { in: ['APPROVED', 'VERIFIED'] };
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { ownerName: { contains: search } },
        { description: { contains: search } },
        { city: { contains: search } },
      ];
    }

    if (category) {
      where.category = {
        OR: [
          { slug: category },
          { name: { contains: category } },
        ],
      };
    }

    if (subCategory) {
      where.subCategory = {
        OR: [
          { slug: subCategory },
          { name: { contains: subCategory } },
        ],
      };
    }

    if (city && city !== 'All') {
      where.city = { contains: city };
    }

    if (minPrice > 0 || maxPrice < 10000000) {
      where.startingPrice = {
        gte: minPrice,
        lte: maxPrice,
      };
    }

    if (minRating > 0) {
      where.rating = { gte: minRating };
    }

    if (experience > 0) {
      where.experienceYears = { gte: experience };
    }

    if (verifiedOnly) {
      where.isVerified = true;
    }

    if (featuredOnly) {
      where.isFeatured = true;
    }

    if (eventType) {
      where.eventTypes = {
        some: {
          eventType: {
            OR: [
              { slug: eventType },
              { name: { contains: eventType } },
            ],
          },
        },
      };
    }

    // Sort order
    let orderBy: any = {};
    if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    } else if (sort === 'price_low') {
      orderBy = { startingPrice: 'asc' };
    } else if (sort === 'price_high') {
      orderBy = { startingPrice: 'desc' };
    } else if (sort === 'experience') {
      orderBy = { experienceYears: 'desc' };
    } else if (sort === 'popular') {
      orderBy = { viewCount: 'desc' };
    } else {
      // Recommended: Featured first, verified first, highest rating
      orderBy = [
        { isFeatured: 'desc' },
        { isVerified: 'desc' },
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ];
    }

    const vendors = await prisma.vendor.findMany({
      where,
      orderBy,
      include: {
        category: true,
        subCategory: true,
        eventTypes: {
          include: {
            eventType: true,
          },
        },
        services: {
          where: { isActive: true },
        },
      },
    });

    const formatted = vendors.map((v) => ({
      id: v.id,
      name: v.businessName,
      ownerName: v.ownerName,
      slug: v.slug,
      email: v.email,
      mobile: v.mobile,
      whatsapp: v.whatsapp,
      category: v.category?.name || 'General',
      categorySlug: v.category?.slug,
      subCategory: v.subCategory?.name,
      city: v.city,
      state: v.state,
      address: v.address,
      rating: v.rating,
      reviewCount: v.reviewCount,
      startingPrice: v.startingPrice,
      experienceYears: v.experienceYears,
      teamSize: v.teamSize,
      description: v.description,
      isVerified: v.isVerified,
      isFeatured: v.isFeatured,
      status: v.status,
      rejectionReason: v.rejectionReason,
      coverImage: v.coverImage,
      logo: v.logo,
      eventTypes: v.eventTypes.map((et) => et.eventType.name),
      serviceAreas: (() => {
        try {
          return JSON.parse(v.serviceAreas);
        } catch {
          return [];
        }
      })(),
      servicesCount: v.services.length,
      createdAt: v.createdAt,
    }));

    return NextResponse.json({ success: true, vendors: formatted, total: formatted.length });
  } catch (error: any) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      businessName,
      ownerName,
      email,
      mobile,
      password,
      categoryId,
      subCategoryId,
      city,
      state,
      address,
      serviceAreas = [],
      experienceYears = 1,
      teamSize = 1,
      startingPrice = 0,
      description = '',
      whatsapp = '',
      website = '',
      gstNumber = '',
      businessRegNumber = '',
      logo = '',
      coverImage = '',
      selectedEventTypes = [],
    } = body;

    if (!businessName || !ownerName || !email || !mobile || !password || !categoryId || !city) {
      return NextResponse.json(
        { error: 'Please provide all mandatory fields.' },
        { status: 400 }
      );
    }

    // Check if email already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    // Generate slug
    const baseSlug = businessName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

    const passwordHash = await bcrypt.hash(password, 10);

    // Create User with role VENDOR
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: ownerName,
        phone: mobile,
        role: 'VENDOR',
      },
    });

    // Create Vendor profile with PENDING_APPROVAL status
    const vendor = await prisma.vendor.create({
      data: {
        userId: user.id,
        businessName,
        ownerName,
        slug: uniqueSlug,
        email,
        mobile,
        whatsapp,
        website,
        categoryId,
        subCategoryId: subCategoryId || null,
        city,
        state: state || 'Chhattisgarh',
        address,
        serviceAreas: JSON.stringify(serviceAreas),
        experienceYears: Number(experienceYears),
        teamSize: Number(teamSize),
        startingPrice: Number(startingPrice),
        description,
        gstNumber,
        businessRegNumber,
        logo: logo || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300&q=80',
        coverImage: coverImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
        status: 'PENDING_APPROVAL',
        isVerified: false,
        isFeatured: false,
      },
    });

    // Link event types
    if (selectedEventTypes.length > 0) {
      for (const etId of selectedEventTypes) {
        await prisma.vendorEventType.create({
          data: {
            vendorId: vendor.id,
            eventTypeId: etId,
          },
        });
      }
    }

    // Create default business hours
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const d of days) {
      await prisma.businessHours.create({
        data: {
          vendorId: vendor.id,
          dayOfWeek: d,
          openTime: '09:00 AM',
          closeTime: '09:00 PM',
          isClosed: false,
        },
      });
    }

    // Notification for Admin
    const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (adminUser) {
      await prisma.notification.create({
        data: {
          userId: adminUser.id,
          title: 'New Vendor Registration Awaiting Approval',
          message: `${businessName} (${ownerName}) registered in ${city}. Please review profile.`,
          type: 'VENDOR_APPROVAL',
          link: '/admin/vendors',
        },
      });
    }

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        businessName: vendor.businessName,
        status: vendor.status,
        slug: vendor.slug,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
