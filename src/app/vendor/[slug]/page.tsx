import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import VendorProfileClient from '@/components/vendor/VendorProfileClient';

export const revalidate = 0;

export default async function VendorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const vendor = await prisma.vendor.findUnique({
    where: { slug },
    include: {
      category: true,
      subCategory: true,
      eventTypes: {
        include: { eventType: true },
      },
      services: {
        where: { isActive: true },
        include: { category: true, subCategory: true },
      },
      gallery: {
        orderBy: { sortOrder: 'asc' },
      },
      businessHours: true,
      reviews: {
        where: { status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!vendor) {
    notFound();
  }

  // Increment view count asynchronously
  await prisma.vendor.update({
    where: { id: vendor.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  const formattedVendor = {
    id: vendor.id,
    businessName: vendor.businessName,
    ownerName: vendor.ownerName,
    slug: vendor.slug,
    email: vendor.email,
    mobile: vendor.mobile,
    whatsapp: vendor.whatsapp,
    website: vendor.website,
    category: vendor.category?.name || 'General',
    subCategory: vendor.subCategory?.name,
    city: vendor.city,
    state: vendor.state,
    address: vendor.address,
    serviceAreas: (() => {
      try {
        return JSON.parse(vendor.serviceAreas);
      } catch {
        return [];
      }
    })(),
    experienceYears: vendor.experienceYears,
    teamSize: vendor.teamSize,
    startingPrice: vendor.startingPrice,
    gstNumber: vendor.gstNumber,
    logo: vendor.logo,
    coverImage: vendor.coverImage,
    status: vendor.status,
    isVerified: vendor.isVerified,
    isFeatured: vendor.isFeatured,
    rating: vendor.rating,
    reviewCount: vendor.reviewCount,
    description: vendor.description,
    eventTypes: vendor.eventTypes.map((et) => et.eventType.name),
    services: vendor.services.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      startingPrice: s.startingPrice,
      pricingType: s.pricingType,
      availability: s.availability,
    })),
    gallery: vendor.gallery.map((g) => ({
      id: g.id,
      imageUrl: g.imageUrl,
      title: g.title,
    })),
    businessHours: vendor.businessHours.map((bh) => ({
      dayOfWeek: bh.dayOfWeek,
      openTime: bh.openTime,
      closeTime: bh.closeTime,
      isClosed: bh.isClosed,
    })),
    reviews: vendor.reviews.map((r) => ({
      id: r.id,
      clientName: r.clientName,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
    })),
  };

  return <VendorProfileClient vendor={formattedVendor} />;
}
