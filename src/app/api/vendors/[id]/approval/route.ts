import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { action, rejectionReason, isFeatured, isVerified } = body;

    const vendor = await prisma.vendor.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    let updateData: any = {};
    let notificationTitle = '';
    let notificationMessage = '';

    if (action === 'APPROVE') {
      updateData.status = 'APPROVED';
      updateData.rejectionReason = null;
      notificationTitle = 'Vendor Profile Approved!';
      notificationMessage = 'Congratulations! Your VentZivo vendor profile is approved and now publicly visible.';
    } else if (action === 'VERIFY') {
      updateData.status = 'VERIFIED';
      updateData.isVerified = true;
      notificationTitle = 'Verified Badge Granted!';
      notificationMessage = 'Your business has been officially verified with the VentZivo Green Shield.';
    } else if (action === 'UNVERIFY') {
      updateData.isVerified = false;
      if (vendor.status === 'VERIFIED') {
        updateData.status = 'APPROVED';
      }
    } else if (action === 'REJECT') {
      updateData.status = 'REJECTED';
      updateData.rejectionReason = rejectionReason || 'Profile did not meet marketplace guidelines.';
      notificationTitle = 'Vendor Application Update';
      notificationMessage = `Your profile was not approved. Reason: ${updateData.rejectionReason}`;
    } else if (action === 'SUSPEND') {
      updateData.status = 'SUSPENDED';
      notificationTitle = 'Account Suspended';
      notificationMessage = 'Your vendor account has been temporarily suspended by platform administration.';
    } else if (action === 'ACTIVATE') {
      updateData.status = 'APPROVED';
    } else if (action === 'TOGGLE_FEATURED') {
      updateData.isFeatured = isFeatured !== undefined ? isFeatured : !vendor.isFeatured;
    }

    const updated = await prisma.vendor.update({
      where: { id },
      data: updateData,
    });

    // Send notification to vendor's user account
    if (notificationTitle && vendor.userId) {
      await prisma.notification.create({
        data: {
          userId: vendor.userId,
          title: notificationTitle,
          message: notificationMessage,
          type: action,
          link: '/vendor/dashboard',
        },
      });
    }

    return NextResponse.json({ success: true, vendor: updated });
  } catch (error: any) {
    console.error('Approval action error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
