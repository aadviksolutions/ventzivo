import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let content = await prisma.homepageContent.findUnique({
      where: { id: 'default' },
    });

    if (!content) {
      content = await prisma.homepageContent.create({
        data: { id: 'default' },
      });
    }

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const updated = await prisma.homepageContent.upsert({
      where: { id: 'default' },
      update: body,
      create: {
        id: 'default',
        ...body,
      },
    });

    return NextResponse.json({ success: true, content: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
