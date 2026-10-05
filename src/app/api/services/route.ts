import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vendorId = searchParams.get('vendorId');

    const where: any = {};
    if (vendorId) where.vendorId = vendorId;

    const services = await prisma.vendorService.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        subCategory: true,
      },
    });

    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      vendorId,
      name,
      categoryId,
      subCategoryId,
      description,
      startingPrice = 0,
      pricingType = 'STARTING_FROM',
      images = [],
      tags = [],
    } = body;

    if (!vendorId || !name || !categoryId) {
      return NextResponse.json(
        { error: 'Vendor ID, Service Name, and Category are required' },
        { status: 400 }
      );
    }

    const service = await prisma.vendorService.create({
      data: {
        vendorId,
        name,
        categoryId,
        subCategoryId: subCategoryId || null,
        description,
        startingPrice: Number(startingPrice),
        pricingType,
        images: JSON.stringify(images),
        tags: JSON.stringify(tags),
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    await prisma.vendorService.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
