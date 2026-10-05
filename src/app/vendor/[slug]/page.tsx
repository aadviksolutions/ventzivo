import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FALLBACK_VENDORS, MockVendor } from '@/lib/mockData';
import VendorProfileClient from '@/components/vendor/VendorProfileClient';

export const revalidate = 0;

export default async function VendorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let vendor: any = null;

  try {
    vendor = await prisma.vendor.findUnique({
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

    if (vendor) {
      await prisma.vendor.update({
        where: { id: vendor.id },
        data: { viewCount: { increment: 1 } },
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('Prisma vendor lookup failed, checking fallback data:', err);
  }

  // If vendor not in DB, check fallback list
  if (!vendor) {
    const fallback = FALLBACK_VENDORS.find((v: MockVendor) => v.slug === slug || v.id === slug);
    if (!fallback) {
      notFound();
    }
    const formattedFallback = {
      id: fallback.id,
      businessName: fallback.businessName,
      ownerName: fallback.ownerName,
      slug: fallback.slug,
      email: fallback.email,
      mobile: fallback.mobile || '7566145566',
      whatsapp: fallback.whatsapp || '7566145566',
      website: 'https://ventzivo.com',
      category: fallback.category?.name || 'General',
      subCategory: fallback.subCategory?.name,
      city: fallback.city,
      state: fallback.state,
      address: fallback.address,
      serviceAreas: fallback.serviceAreas,
      experienceYears: fallback.experienceYears,
      teamSize: fallback.teamSize,
      startingPrice: fallback.startingPrice,
      gstNumber: '22AAAAA0000A1Z5',
      logo: fallback.logo || '/ventzivo-logo.jpg',
      coverImage: fallback.coverImage,
      status: fallback.status,
      isVerified: fallback.isVerified,
      isFeatured: fallback.isFeatured,
      rating: fallback.rating,
      reviewCount: fallback.reviewCount,
      description: fallback.description,
      eventTypes: fallback.eventTypes.map((et: any) => et.eventType.name),
      services: fallback.services.map((s: any) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        startingPrice: s.price,
        pricingType: s.priceUnit,
        availability: 'AVAILABLE',
      })),
      gallery: fallback.galleryImages.map((img: string, i: number) => ({
        id: `g-${i}`,
        imageUrl: img,
        title: `Portfolio Image ${i + 1}`,
      })),
      businessHours: [
        { dayOfWeek: 'Monday - Friday', openTime: '09:00', closeTime: '21:00', isClosed: false },
        { dayOfWeek: 'Saturday - Sunday', openTime: '09:00', closeTime: '22:00', isClosed: false },
      ],
      reviews: [
        {
          id: 'r-1',
          clientName: 'Priya & Rahul Sharma',
          rating: 5,
          title: 'Unbelievable execution & royal elegance!',
          comment: 'VentZivo connected us with this vendor for our dream wedding in Raipur. Everything was delivered on time and beyond expectations.',
          createdAt: new Date().toISOString(),
        },
      ],
    };
    return <VendorProfileClient vendor={formattedFallback} />;
  }

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
    eventTypes: vendor.eventTypes.map((et: any) => et.eventType.name),
    services: vendor.services.map((s: any) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      startingPrice: s.startingPrice,
      pricingType: s.pricingType,
      availability: s.availability,
    })),
    gallery: vendor.gallery.map((g: any) => ({
      id: g.id,
      imageUrl: g.imageUrl,
      title: g.title,
    })),
    businessHours: vendor.businessHours.map((bh: any) => ({
      dayOfWeek: bh.dayOfWeek,
      openTime: bh.openTime,
      closeTime: bh.closeTime,
      isClosed: bh.isClosed,
    })),
    reviews: vendor.reviews.map((r: any) => ({
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
