import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Building, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function CategoriesDirectoryPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      subCategories: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
      _count: {
        select: { vendors: true },
      },
    },
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest block">
            Vendor Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Browse Vendor Categories & Sub-Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From photography and catering to German tents, royal venues, and celebrity DJs — explore specialized event services across India.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                    <Building className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-brand-blue-800">
                    {cat._count.vendors} Vendors
                  </span>
                </div>

                <Link
                  href={`/vendors?category=${encodeURIComponent(cat.slug)}`}
                  className="hover:text-brand-blue-800 transition-colors"
                >
                  <h3 className="font-extrabold text-lg text-slate-900 mb-1.5">{cat.name}</h3>
                </Link>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {cat.description || 'Top verified service vendors for your event.'}
                </p>

                {/* Subcategories Pills */}
                {cat.subCategories.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Sub-Services:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subCategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/vendors?category=${encodeURIComponent(cat.slug)}&subCategory=${encodeURIComponent(sub.slug)}`}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60 font-medium transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={`/vendors?category=${encodeURIComponent(cat.slug)}`}
                  className="w-full py-2.5 rounded-xl bg-brand-blue-800 hover:bg-brand-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Explore {cat.name} Vendors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
