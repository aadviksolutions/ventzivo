const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding VentZivo Marketplace Database...');

  // 1. Create Default Homepage CMS Content
  await prisma.homepageContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heroHeading: 'Plan Your Event. Find Every Vendor.',
      heroSubheading: 'From weddings and birthdays to corporate events, exhibitions and celebrations — discover trusted vendors on VentZivo.',
      bannerText: "India's Premier All-Event Marketplace • 100% Verified Vendors",
      bannerLink: '/vendors',
      contactEmail: 'support@ventzivo.com',
      contactPhone: '+91 7566145566',
      contactAddress: 'Raipur, Chhattisgarh, India',
      facebookUrl: 'https://facebook.com/ventzivo',
      instagramUrl: 'https://instagram.com/ventzivo',
      youtubeUrl: 'https://youtube.com/ventzivo',
      linkedinUrl: 'https://linkedin.com/company/ventzivo',
      seoTitle: "VentZivo — Plan. Connect. Celebrate. India's Event Marketplace",
      seoDescription: "Find, compare and connect with top event vendors for weddings, corporate events, parties, birthdays, photography, catering, and decor across India.",
      metaKeywords: "event marketplace, wedding vendors, event planners, photographers, caterers, banquet halls, India events",
    },
  });

  // 2. Initial Event Types
  const eventTypesData = [
    { name: 'Wedding', slug: 'wedding', isPopular: true, sortOrder: 1, icon: 'HeartHandshake', description: 'Grand Indian weddings, royal celebrations, and traditional ceremonies' },
    { name: 'Engagement', slug: 'engagement', isPopular: true, sortOrder: 2, icon: 'Gem', description: 'Ring ceremonies and elegant engagement celebrations' },
    { name: 'Reception', slug: 'reception', isPopular: true, sortOrder: 3, icon: 'Sparkles', description: 'Grand wedding dinners, receptions, and post-wedding parties' },
    { name: 'Birthday', slug: 'birthday', isPopular: true, sortOrder: 4, icon: 'Cake', description: 'Kids theme birthdays, milestone adult parties, and family gatherings' },
    { name: 'Anniversary', slug: 'anniversary', isPopular: false, sortOrder: 5, icon: 'Gift', description: 'Silver, Golden, and annual relationship milestones' },
    { name: 'Baby Shower', slug: 'baby-shower', isPopular: false, sortOrder: 6, icon: 'Baby', description: 'Godh Bharai and modern celebration of new life' },
    { name: 'Corporate Event', slug: 'corporate-event', isPopular: true, sortOrder: 7, icon: 'Briefcase', description: 'Annual general meetings, town halls, and business celebrations' },
    { name: 'Conference', slug: 'conference', isPopular: true, sortOrder: 8, icon: 'Users', description: 'Multi-track industry conventions, summits, and symposiums' },
    { name: 'Exhibition', slug: 'exhibition', isPopular: true, sortOrder: 9, icon: 'LayoutGrid', description: 'Trade expos, consumer fairs, and art galleries' },
    { name: 'Product Launch', slug: 'product-launch', isPopular: false, sortOrder: 10, icon: 'Zap', description: 'Unveiling ceremonies with high-impact production and PR' },
    { name: 'Concert & Live Show', slug: 'concert', isPopular: true, sortOrder: 11, icon: 'Music', description: 'Live musical performances, festivals, and arena shows' },
    { name: 'Private Party', slug: 'private-party', isPopular: true, sortOrder: 12, icon: 'GlassWater', description: 'House parties, terrace celebrations, and intimate gatherings' },
    { name: 'Religious Event & Puja', slug: 'religious-event', isPopular: false, sortOrder: 13, icon: 'Sun', description: 'Puja, Bhajan Sandhya, Mata ki Chowki, and spiritual functions' },
    { name: 'Fashion Show', slug: 'fashion-show', isPopular: false, sortOrder: 14, icon: 'Camera', description: 'Runway ramps, designer showcases, and beauty pageants' },
    { name: 'College Fest / Farewell', slug: 'college-event', isPopular: false, sortOrder: 15, icon: 'GraduationCap', description: 'Annual days, college fests, freshers, and farewells' },
  ];

  const createdEventTypes = {};
  for (const et of eventTypesData) {
    const res = await prisma.eventType.upsert({
      where: { slug: et.slug },
      update: et,
      create: et,
    });
    createdEventTypes[et.slug] = res;
  }

  // 3. Initial Categories and Subcategories
  const categoriesData = [
    {
      name: 'Venue',
      slug: 'venue',
      icon: 'Building2',
      isPopular: true,
      sortOrder: 1,
      description: 'Banquet halls, luxury resorts, farmhouses, and heritage lawns',
      subCategories: ['Banquet Hall', 'Marriage Garden', 'Luxury Resort', 'Hotel Ballrooms', 'Conference Hall', 'Party Terrace', 'Farmhouse'],
    },
    {
      name: 'Catering & Food',
      slug: 'catering-food',
      icon: 'UtensilsCrossed',
      isPopular: true,
      sortOrder: 2,
      description: 'Gourmet Indian, Mughlai, Continental, and specialized live counters',
      subCategories: ['Wedding Catering', 'Corporate Buffet', 'Live Chaat Counter', 'Beverages & Mocktail Bar', 'Artisanal Bakery & Cakes'],
    },
    {
      name: 'Decoration',
      slug: 'decoration',
      icon: 'Palette',
      isPopular: true,
      sortOrder: 3,
      description: 'Floral mandaps, luxury stage setups, LED lighting, and theme aesthetics',
      subCategories: ['Floral Decoration', 'Stage & Mandap Decor', 'Balloon & Party Themes', 'Lighting Ambience', 'Entry Tunnel Decor'],
    },
    {
      name: 'Photography & Video',
      slug: 'photography-video',
      icon: 'Camera',
      isPopular: true,
      sortOrder: 4,
      description: 'Cinematic wedding films, pre-wedding shoots, 4K live streaming, and drones',
      subCategories: ['Candid Wedding Photography', 'Cinematic Videography', 'Pre-Wedding Shoot', 'Drone Coverage', '360 Selfie Booth'],
    },
    {
      name: 'Entertainment & Music',
      slug: 'entertainment-music',
      icon: 'Music2',
      isPopular: true,
      sortOrder: 5,
      description: 'Top Bollywood DJs, live Sufi bands, anchors, celebrity artists, and dancers',
      subCategories: ['Wedding DJ & Console', 'Live Band & Singers', 'Professional Emcee / Anchor', 'Choreographer & Dancers', 'Comedy & Magic Shows'],
    },
    {
      name: 'Beauty & Styling',
      slug: 'beauty-styling',
      icon: 'Sparkles',
      isPopular: true,
      sortOrder: 6,
      description: 'Bridal HD makeup, hair artists, intricate bridal mehndi, and groom grooming',
      subCategories: ['Bridal HD Makeup', 'Hair Stylist', 'Mehndi Artist', 'Groom Styling', 'Draping & Saree Styling'],
    },
    {
      name: 'Event Production',
      slug: 'event-production',
      icon: 'Activity',
      isPopular: true,
      sortOrder: 7,
      description: 'German hanger tents, hydraulic stages, line array sound, and P3 LED walls',
      subCategories: ['Sound Systems (JBL/Line Array)', 'LED Video Walls (P2/P3)', 'Stage Truss & Rigging', 'German Hanger Tents', 'Power Generators'],
    },
    {
      name: 'Transportation',
      slug: 'transportation',
      icon: 'Car',
      isPopular: false,
      sortOrder: 8,
      description: 'Vintage wedding cars, luxury Mercedes/Audi fleets, and tempo travellers',
      subCategories: ['Vintage Wedding Cars', 'Luxury Fleet (BMW/Audi)', 'Guest Tempo Travellers', 'Airport Transfers'],
    },
  ];

  const createdCategories = {};
  const createdSubCategories = {};

  for (const cat of categoriesData) {
    const { subCategories, ...catFields } = cat;
    const categoryRecord = await prisma.category.upsert({
      where: { slug: catFields.slug },
      update: catFields,
      create: catFields,
    });
    createdCategories[cat.slug] = categoryRecord;

    for (const subName of subCategories) {
      const subSlug = subName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const subRecord = await prisma.subCategory.upsert({
        where: { slug: subSlug },
        update: { name: subName, categoryId: categoryRecord.id },
        create: { name: subName, slug: subSlug, categoryId: categoryRecord.id },
      });
      createdSubCategories[subSlug] = subRecord;
    }
  }

  // 4. Locations
  const locations = [
    { city: 'Raipur', state: 'Chhattisgarh', isPopular: true, sortOrder: 1 },
    { city: 'Bilaspur', state: 'Chhattisgarh', isPopular: true, sortOrder: 2 },
    { city: 'Bhilai', state: 'Chhattisgarh', isPopular: true, sortOrder: 3 },
    { city: 'Delhi NCR', state: 'Delhi', isPopular: true, sortOrder: 4 },
    { city: 'Mumbai', state: 'Maharashtra', isPopular: true, sortOrder: 5 },
    { city: 'Jaipur', state: 'Rajasthan', isPopular: true, sortOrder: 6 },
    { city: 'Bengaluru', state: 'Karnataka', isPopular: true, sortOrder: 7 },
    { city: 'Hyderabad', state: 'Telangana', isPopular: true, sortOrder: 8 },
  ];

  for (const loc of locations) {
    await prisma.location.upsert({
      where: { city: loc.city },
      update: loc,
      create: loc,
    });
  }

  // 5. Create Core Users: Admin, Vendor, Client
  const passwordHash = await bcrypt.hash('Ventzivo@123', 10);

  // Admin User
  await prisma.user.upsert({
    where: { email: 'admin@ventzivo.com' },
    update: { role: 'ADMIN', name: 'VentZivo Administrator' },
    create: {
      email: 'admin@ventzivo.com',
      passwordHash,
      name: 'VentZivo Administrator',
      phone: '+91 99999 00000',
      role: 'ADMIN',
    },
  });

  // Client User
  await prisma.user.upsert({
    where: { email: 'client@ventzivo.com' },
    update: { role: 'CLIENT', name: 'Aarav Sharma' },
    create: {
      email: 'client@ventzivo.com',
      passwordHash,
      name: 'Aarav Sharma',
      phone: '+91 98261 11223',
      role: 'CLIENT',
    },
  });

  // 6. Seed Realistic Verified & Featured Vendors
  const sampleVendors = [
    {
      email: 'grandpalace@ventzivo.com',
      businessName: 'The Grand Imperial Palace & Resort',
      ownerName: 'Vikramaditya Rathore',
      slug: 'the-grand-imperial-palace-resort',
      mobile: '+91 98261 44556',
      city: 'Raipur',
      state: 'Chhattisgarh',
      categorySlug: 'venue',
      subCategorySlug: 'banquet-hall',
      address: 'VIP Road, Near Airport, Raipur, CG',
      serviceAreas: ['Raipur', 'Bhilai', 'Durg', 'Bilaspur'],
      experienceYears: 12,
      teamSize: 85,
      startingPrice: 150000,
      rating: 4.9,
      reviewCount: 48,
      isVerified: true,
      isFeatured: true,
      status: 'VERIFIED',
      description: 'Sprawling 12-acre luxury event destination featuring 2 centralized AC banquet halls (capacity 1500+ guests), a royal Roman courtyard, manicured open lawns, 45 royal suites, and in-house five-star hospitality for dream weddings and corporate summits.',
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80',
      logo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300&q=80',
      events: ['wedding', 'reception', 'corporate-event', 'conference', 'exhibition'],
      services: [
        { name: 'Royal Grand Banquet Hall Booking', startingPrice: 150000, pricingType: 'PER_DAY', description: 'Centralized AC hall with acoustic soundproofing, 1200 guest capacity, and VIP lounge.' },
        { name: 'Lawn & Roman Courtyard Package', startingPrice: 220000, pricingType: 'PER_DAY', description: 'Open garden setup under the stars with thematic lighting for up to 3000 guests.' },
      ]
    },
    {
      email: 'luminafilms@ventzivo.com',
      businessName: 'Lumina Wedding Stories & Films',
      ownerName: 'Rohan Mehra',
      slug: 'lumina-wedding-stories-films',
      mobile: '+91 98711 22334',
      city: 'Raipur',
      state: 'Chhattisgarh',
      categorySlug: 'photography-video',
      subCategorySlug: 'candid-wedding-photography',
      address: 'Pandri Commercial Complex, Raipur',
      serviceAreas: ['Raipur', 'Bilaspur', 'Delhi NCR', 'Pan-India Destination'],
      experienceYears: 9,
      teamSize: 14,
      startingPrice: 65000,
      rating: 4.8,
      reviewCount: 36,
      isVerified: true,
      isFeatured: true,
      status: 'VERIFIED',
      description: 'Award-winning destination wedding visual storytellers. We specialize in heartfelt candid moments, 4K Sony FX cinema cameras, master aerial drone captures, same-day teaser edits, and heirloom leather photo books.',
      coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=80',
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      events: ['wedding', 'engagement', 'pre-wedding', 'birthday', 'corporate-event'],
      services: [
        { name: 'Complete 3-Day Wedding Cinema Package', startingPrice: 120000, pricingType: 'FIXED', description: 'Full coverage of Mehndi, Sangeet & Wedding. 2 Candid, 2 Traditional, Drone & Cinematic Teaser.' },
        { name: 'Pre-Wedding Destination Shoot', startingPrice: 45000, pricingType: 'STARTING_FROM', description: 'Cinematic 2-minute film, 50 master retouched photos, stylized drone shots.' },
      ]
    },
    {
      email: 'royalzaika@ventzivo.com',
      businessName: 'Royal Zaika Gourmet Caterers',
      ownerName: 'Chef Harpreet Singh',
      slug: 'royal-zaika-gourmet-caterers',
      mobile: '+91 98263 77889',
      city: 'Raipur',
      state: 'Chhattisgarh',
      categorySlug: 'catering-food',
      subCategorySlug: 'wedding-catering',
      address: 'Telibandha Main Road, Raipur',
      serviceAreas: ['Raipur', 'Bhilai', 'Durg', 'Rajnandgaon'],
      experienceYears: 15,
      teamSize: 120,
      startingPrice: 850,
      rating: 4.9,
      reviewCount: 62,
      isVerified: true,
      isFeatured: true,
      status: 'VERIFIED',
      description: 'Central India’s premier culinary catering team providing authentic Awadhi, Rajasthani, North Indian, Pan-Asian, and Italian live counters with hygienic five-star service presentation and luxury tableware.',
      coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      events: ['wedding', 'reception', 'corporate-event', 'birthday', 'anniversary'],
      services: [
        { name: 'Luxury Royal Wedding Buffet (120+ Items)', startingPrice: 1250, pricingType: 'STARTING_FROM', description: 'Per plate cost including welcome drinks, 8 live counters, luxury desserts, and silver service.' },
        { name: 'Corporate High-Tea & Lunch Spread', startingPrice: 650, pricingType: 'STARTING_FROM', description: 'Hot gourmet appetizers, executive main courses, beverages, and clean setup.' },
      ]
    },
    {
      email: 'auraevents@ventzivo.com',
      businessName: 'Aura Luxe Decor & Floral Design',
      ownerName: 'Shreya Kapoor',
      slug: 'aura-luxe-decor-floral-design',
      mobile: '+91 98110 55667',
      city: 'Delhi NCR',
      state: 'Delhi',
      categorySlug: 'decoration',
      subCategorySlug: 'floral-decoration',
      address: 'South Extension Part II, New Delhi',
      serviceAreas: ['Delhi NCR', 'Jaipur', 'Raipur', 'Chandigarh'],
      experienceYears: 8,
      teamSize: 45,
      startingPrice: 75000,
      rating: 4.7,
      reviewCount: 29,
      isVerified: true,
      isFeatured: true,
      status: 'VERIFIED',
      description: 'Contemporary floral design house and event styling studio creating bespoke mandap concepts, ethereal fairy-light canopies, imported orchid arches, and custom designer stage setups.',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      events: ['wedding', 'engagement', 'reception', 'product-launch', 'anniversary'],
      services: [
        { name: 'Exotic Floral Mandap & Entry Design', startingPrice: 110000, pricingType: 'STARTING_FROM', description: 'Fresh exotic flowers, crystal hangings, ambient fairy-light walk, and brass props.' },
        { name: 'Modern Sangeet Stage & Neon Zone', startingPrice: 85000, pricingType: 'STARTING_FROM', description: 'Geometric gold trusses, LED screens, moving heads, and quirky photo-ops.' },
      ]
    },
    {
      email: 'soundwave@ventzivo.com',
      businessName: 'DJ Aryan & Soundwave Production',
      ownerName: 'Aryan Verma',
      slug: 'dj-aryan-soundwave-production',
      mobile: '+91 98930 11447',
      city: 'Raipur',
      state: 'Chhattisgarh',
      categorySlug: 'entertainment-music',
      subCategorySlug: 'wedding-dj-console',
      address: 'Civil Lines, Raipur',
      serviceAreas: ['Raipur', 'Bilaspur', 'Nagpur', 'Indore'],
      experienceYears: 10,
      teamSize: 18,
      startingPrice: 35000,
      rating: 4.9,
      reviewCount: 42,
      isVerified: true,
      isFeatured: true,
      status: 'VERIFIED',
      description: 'Official Resident & Touring Club DJ delivering high-octane Bollywood, Punjabi, EDM, and Commercial club music with concert-grade JBL line-array sound, wireless DMX beam moving heads, and LED stages.',
      coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
      logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      events: ['wedding', 'private-party', 'concert', 'college-event', 'birthday'],
      services: [
        { name: 'Ultimate Sangeet DJ & Lighting Night', startingPrice: 45000, pricingType: 'PER_DAY', description: '4 Line arrays, 8 Sharpy beam lights, cold spark pyro machines, Pioneer CDJ-3000 console.' },
      ]
    },
    {
      email: 'glamourstudio@ventzivo.com',
      businessName: 'Glamour Touch Bridal Studio & Academy',
      ownerName: 'Sakshi Agrawal',
      slug: 'glamour-touch-bridal-studio-academy',
      mobile: '+91 98271 33221',
      city: 'Raipur',
      state: 'Chhattisgarh',
      categorySlug: 'beauty-styling',
      subCategorySlug: 'bridal-hd-makeup',
      address: 'Samta Colony, Near Main Market, Raipur',
      serviceAreas: ['Raipur', 'Bhilai', 'Destination'],
      experienceYears: 7,
      teamSize: 8,
      startingPrice: 18000,
      rating: 5.0,
      reviewCount: 31,
      isVerified: true,
      isFeatured: false,
      status: 'VERIFIED',
      description: 'Certified International Makeup Artist utilizing Dior, Huda Beauty, MAC, and Charlotte Tilbury products for radiant, glowing, photo-ready bridal makeovers and hairstyling.',
      coverImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
      logo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      events: ['wedding', 'engagement', 'reception', 'fashion-show'],
      services: [
        { name: 'HD Signature Bridal Makeover', startingPrice: 22000, pricingType: 'FIXED', description: 'HD makeup, hairstyling, premium eyelashes, draping, lens, and touch-up kit.' },
        { name: 'Airbrush Reception Makeover', startingPrice: 28000, pricingType: 'FIXED', description: 'Waterproof 24-hr flawless airbrush finish with bespoke hair extensions.' },
      ]
    },
    {
      email: 'apexvisuals@ventzivo.com',
      businessName: 'Apex Visuals & Drone Studio',
      ownerName: 'Manish Patel',
      slug: 'apex-visuals-drone-studio',
      mobile: '+91 98260 99887',
      city: 'Bilaspur',
      state: 'Chhattisgarh',
      categorySlug: 'photography-video',
      subCategorySlug: 'drone-coverage',
      address: 'Link Road, Bilaspur',
      serviceAreas: ['Bilaspur', 'Raipur', 'Korba'],
      experienceYears: 4,
      teamSize: 6,
      startingPrice: 25000,
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      isFeatured: false,
      status: 'PENDING_APPROVAL',
      description: 'Upcoming modern aerial cinematography and event documentation team. Awaiting admin verification.',
      coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80',
      logo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      events: ['wedding', 'corporate-event'],
      services: [
        { name: 'Dual Drone 4K Event Streaming', startingPrice: 25000, pricingType: 'PER_DAY', description: 'DJI Mavic 3 Cine aerial coverage with live HDMI output to LED screens.' },
      ]
    },
  ];

  for (const vData of sampleVendors) {
    const userRecord = await prisma.user.upsert({
      where: { email: vData.email },
      update: { role: 'VENDOR', name: vData.ownerName },
      create: {
        email: vData.email,
        passwordHash,
        name: vData.ownerName,
        phone: vData.mobile,
        role: 'VENDOR',
      },
    });

    const category = createdCategories[vData.categorySlug];
    const subCategory = vData.subCategorySlug ? createdSubCategories[vData.subCategorySlug] : null;

    const vendor = await prisma.vendor.upsert({
      where: { slug: vData.slug },
      update: {
        businessName: vData.businessName,
        ownerName: vData.ownerName,
        email: vData.email,
        mobile: vData.mobile,
        city: vData.city,
        state: vData.state,
        address: vData.address,
        serviceAreas: JSON.stringify(vData.serviceAreas),
        experienceYears: vData.experienceYears,
        teamSize: vData.teamSize,
        startingPrice: vData.startingPrice,
        rating: vData.rating,
        reviewCount: vData.reviewCount,
        isVerified: vData.isVerified,
        isFeatured: vData.isFeatured,
        status: vData.status,
        description: vData.description,
        coverImage: vData.coverImage,
        logo: vData.logo,
        categoryId: category ? category.id : Object.values(createdCategories)[0].id,
        subCategoryId: subCategory ? subCategory.id : null,
      },
      create: {
        userId: userRecord.id,
        businessName: vData.businessName,
        ownerName: vData.ownerName,
        slug: vData.slug,
        email: vData.email,
        mobile: vData.mobile,
        city: vData.city,
        state: vData.state,
        address: vData.address,
        serviceAreas: JSON.stringify(vData.serviceAreas),
        experienceYears: vData.experienceYears,
        teamSize: vData.teamSize,
        startingPrice: vData.startingPrice,
        rating: vData.rating,
        reviewCount: vData.reviewCount,
        isVerified: vData.isVerified,
        isFeatured: vData.isFeatured,
        status: vData.status,
        description: vData.description,
        coverImage: vData.coverImage,
        logo: vData.logo,
        categoryId: category ? category.id : Object.values(createdCategories)[0].id,
        subCategoryId: subCategory ? subCategory.id : null,
      },
    });

    // Link Event Types
    for (const etSlug of vData.events) {
      const et = createdEventTypes[etSlug];
      if (et) {
        await prisma.vendorEventType.upsert({
          where: {
            vendorId_eventTypeId: {
              vendorId: vendor.id,
              eventTypeId: et.id,
            },
          },
          update: {},
          create: {
            vendorId: vendor.id,
            eventTypeId: et.id,
          },
        });
      }
    }

    // Add Services
    for (const s of vData.services) {
      const existing = await prisma.vendorService.findFirst({
        where: { vendorId: vendor.id, name: s.name }
      });
      if (!existing) {
        await prisma.vendorService.create({
          data: {
            vendorId: vendor.id,
            name: s.name,
            categoryId: vendor.categoryId,
            subCategoryId: vendor.subCategoryId,
            description: s.description,
            startingPrice: s.startingPrice,
            pricingType: s.pricingType,
            images: JSON.stringify([]),
            tags: JSON.stringify([]),
          },
        });
      }
    }

    // Business Hours
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const d of days) {
      await prisma.businessHours.upsert({
        where: {
          vendorId_dayOfWeek: {
            vendorId: vendor.id,
            dayOfWeek: d,
          },
        },
        update: {},
        create: {
          vendorId: vendor.id,
          dayOfWeek: d,
          openTime: '09:00 AM',
          closeTime: '09:00 PM',
          isClosed: false,
        },
      });
    }
  }

  // 7. Seed Testimonials
  const testimonials = [
    {
      name: 'Pooja & Rohan Singhania',
      role: 'Wedding Clients',
      city: 'Raipur',
      rating: 5,
      comment: 'VentZivo made planning our 3-day wedding so effortless! We booked our venue, photographer, and DJ all through the platform. The transparent pricing and verified badges gave us complete peace of mind.',
    },
    {
      name: 'Nitin Agrawal',
      role: 'Head of Corporate Communications',
      city: 'Delhi NCR',
      rating: 5,
      comment: 'We organized an annual conference for 800 delegates. Within 2 hours of sending requirements on VentZivo, we received quotations from 4 top-rated event production vendors. Exceptional efficiency!',
    },
    {
      name: 'Priya Deshmukh',
      role: 'Birthday & Anniversary Planner',
      city: 'Bhilai',
      rating: 5,
      comment: 'The smart vendor matching recommended the most amazing floral decorator and gourmet caterer for my parents’ 25th anniversary celebration. 10/10 experience!',
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }

  // 8. Seed FAQs
  const faqs = [
    {
      question: 'Is VentZivo free for clients planning an event?',
      answer: 'Yes! Clients can browse vendors, compare pricing, view portfolios, check ratings, and send unlimited direct enquiries completely free of charge without any hidden platform commission.',
      category: 'Clients',
      sortOrder: 1,
    },
    {
      question: 'How are vendors verified on VentZivo?',
      answer: 'Our admin verification team inspects business registration, GST details, physical studio/office presence, client reviews, and past event track records before granting the "Verified" badge.',
      category: 'General',
      sortOrder: 2,
    },
    {
      question: 'How do vendors receive leads and enquiries?',
      answer: 'When a client submits an enquiry on your profile or through the event planning matching wizard, you receive an instant alert on your dashboard with complete event details, budget, guest count, and contact info.',
      category: 'Vendors',
      sortOrder: 3,
    },
    {
      question: 'Can I find vendors for non-wedding events like conferences or concerts?',
      answer: 'Absolutely! VentZivo caters to ALL events: corporate meetings, conferences, birthday parties, exhibitions, rock concerts, baby showers, private house parties, college fests, and religious gatherings.',
      category: 'Events',
      sortOrder: 4,
    },
    {
      question: 'How long does vendor approval take after registration?',
      answer: 'Our admin verification team reviews new vendor applications within 24 to 48 business hours. Once verified and approved, your business profile and services become instantly searchable to thousands of clients.',
      category: 'Vendors',
      sortOrder: 5,
    },
  ];

  for (const f of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.fAQ.create({ data: f });
    }
  }

  console.log('VentZivo Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
