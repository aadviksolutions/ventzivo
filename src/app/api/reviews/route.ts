import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { vendorId, userId, clientName, clientEmail, rating, title, comment } = await req.json();

    if (!vendorId || !clientName || !comment) {
      return NextResponse.json(
        { error: 'Vendor ID, Name, and Review comment are required.' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        vendorId,
        userId: userId || null,
        clientName,
        clientEmail: clientEmail || null,
        rating: Number(rating) || 5,
        title: title || 'Event Review',
        comment,
        status: 'PENDING', // Admin moderation
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Review ID and status are required.' }, { status: 400 });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status },
      include: { vendor: true },
    });

    // If approved, update vendor average rating & review count
    if (status === 'APPROVED') {
      const approvedReviews = await prisma.review.findMany({
        where: { vendorId: review.vendorId, status: 'APPROVED' },
      });

      const avgRating =
        approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length;

      await prisma.vendor.update({
        where: { id: review.vendorId },
        data: {
          rating: Number(avgRating.toFixed(1)),
          reviewCount: approvedReviews.length,
        },
      });
    }

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
