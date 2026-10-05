import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const eventTypes = await prisma.eventType.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { vendors: true },
        },
      },
    });

    return NextResponse.json({ success: true, eventTypes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, icon, description, isPopular = false } = body;

    if (!name) {
      return NextResponse.json({ error: 'Event Type name is required' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const eventType = await prisma.eventType.create({
      data: {
        name,
        slug,
        icon: icon || 'Sparkles',
        description,
        isPopular,
      },
    });

    return NextResponse.json({ success: true, eventType });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, icon, description, isPopular, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'Event Type ID is required' }, { status: 400 });
    }

    const eventType = await prisma.eventType.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(icon && { icon }),
        ...(description !== undefined && { description }),
        ...(isPopular !== undefined && { isPopular }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ success: true, eventType });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Event Type ID is required' }, { status: 400 });
    }

    await prisma.eventType.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Event type deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
