export interface MockEventType {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  sortOrder: number;
  _count?: { vendors: number };
}

export interface MockSubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  sortOrder: number;
  subCategories: MockSubCategory[];
  _count?: { vendors: number };
}

export interface MockVendor {
  id: string;
  businessName: string;
  name?: string;
  ownerName: string;
  slug: string;
  email: string;
  mobile: string;
  whatsapp?: string;
  category: { id: string; name: string; slug: string };
  categorySlug?: string;
  subCategory?: { id: string; name: string; slug: string };
  city: string;
  state: string;
  address: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  experienceYears: number;
  teamSize: number;
  description: string;
  isVerified: boolean;
  isFeatured: boolean;
  status: string;
  coverImage: string;
  logo?: string;
  galleryImages: string[];
  serviceAreas: string[];
  eventTypes: { eventType: { id: string; name: string; slug: string } }[];
  services: {
    id: string;
    name: string;
    description: string;
    price: number;
    priceUnit: string;
    images: string[];
  }[];
  businessHours?: string;
}

export const FALLBACK_EVENT_TYPES: MockEventType[] = [
  {
    id: 'et-wedding',
    name: 'Weddings & Receptions',
    slug: 'weddings',
    description: 'Complete luxury wedding solutions, mandap decorators, grand banquets, royal catering & cinematic photography.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 1,
    _count: { vendors: 24 },
  },
  {
    id: 'et-corporate',
    name: 'Corporate Conferences & Summits',
    slug: 'corporate-events',
    description: 'State-of-the-art AV tech, executive banquets, keynote stages, LED backdrops, and corporate branding setups.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 2,
    _count: { vendors: 18 },
  },
  {
    id: 'et-birthday',
    name: 'Birthday Parties & Milestones',
    slug: 'birthday-parties',
    description: 'Immersive themed decors, customized designer cakes, energetic emcees, balloon artistry & fun live food stalls.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 3,
    _count: { vendors: 15 },
  },
  {
    id: 'et-concert',
    name: 'Concerts & Live Shows',
    slug: 'concerts-live-shows',
    description: 'Concert grade line-array sound systems, moving beam lasers, trussing, crowd control barricades & artist management.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 4,
    _count: { vendors: 12 },
  },
  {
    id: 'et-exhibition',
    name: 'Exhibitions & Trade Fairs',
    slug: 'exhibitions-trade-shows',
    description: 'High-capacity German hangar structures, modular octanorm stalls, electrical distribution & registration setups.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 5,
    _count: { vendors: 10 },
  },
  {
    id: 'et-anniversary',
    name: 'Anniversaries & Private Dinners',
    slug: 'anniversaries',
    description: 'Intimate candlelight dinners, acoustic musicians, personalized storytelling decors & gourmet multi-course meals.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 6,
    _count: { vendors: 14 },
  },
  {
    id: 'et-religious',
    name: 'Spiritual & Traditional Pujas',
    slug: 'religious-events',
    description: 'Auspicious sacred havans, traditional floral rangolis, bhajan vocalists, brass lighting & sattvik catering.',
    image: 'https://images.unsplash.com/photo-1609137144822-2615c4d0e14a?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 7,
    _count: { vendors: 8 },
  },
  {
    id: 'et-college',
    name: 'College & School Annual Fests',
    slug: 'college-fests',
    description: 'Youth-centric EDM stages, arena audio-visuals, celebrity anchor engagements & campus fest coordination.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    sortOrder: 8,
    _count: { vendors: 9 },
  },
];

export const FALLBACK_CATEGORIES: MockCategory[] = [
  {
    id: 'cat-venues',
    name: 'Event Venues & Banquets',
    slug: 'event-venues-banquets',
    description: 'Royal palaces, air-conditioned banquet halls, lush green open lawns, and 5-star resort lawns.',
    sortOrder: 1,
    subCategories: [
      { id: 'sub-1', name: 'Banquet Halls', slug: 'banquet-halls' },
      { id: 'sub-2', name: 'Open Lawns & Resorts', slug: 'lawns-resorts' },
      { id: 'sub-3', name: 'Convention Centers', slug: 'convention-centers' },
      { id: 'sub-4', name: 'Poolside Venues', slug: 'poolside-venues' },
    ],
    _count: { vendors: 14 },
  },
  {
    id: 'cat-catering',
    name: 'Catering & Food Services',
    slug: 'catering-services',
    description: 'Multi-cuisine royal buffets, live chaat stalls, continental & oriental counters, and craft mocktail bars.',
    sortOrder: 2,
    subCategories: [
      { id: 'sub-5', name: 'Royal Indian Buffet', slug: 'royal-indian-buffet' },
      { id: 'sub-6', name: 'Live Food Counters', slug: 'live-food-counters' },
      { id: 'sub-7', name: 'Mocktail & Coffee Bar', slug: 'mocktail-coffee-bar' },
      { id: 'sub-8', name: 'Custom Pastry & Desserts', slug: 'custom-desserts' },
    ],
    _count: { vendors: 19 },
  },
  {
    id: 'cat-decor',
    name: 'Event Decoration & Themes',
    slug: 'event-decoration',
    description: 'Designer floral mandaps, fairy-light tunnels, stage backdrops, thematic entry gates & ceiling installations.',
    sortOrder: 3,
    subCategories: [
      { id: 'sub-9', name: 'Floral & Mandap Decor', slug: 'floral-mandap' },
      { id: 'sub-10', name: 'LED & Architectural Lighting', slug: 'lighting-truss' },
      { id: 'sub-11', name: 'Balloon & Kids Themes', slug: 'balloon-kids-themes' },
      { id: 'sub-12', name: 'Corporate Backdrop & Stages', slug: 'corporate-stages' },
    ],
    _count: { vendors: 22 },
  },
  {
    id: 'cat-photo',
    name: 'Photography & Cinema',
    slug: 'photography-videography',
    description: 'Candid wedding photography, 4K cinematic teasers, drone aerial cinematography & instant photo-booths.',
    sortOrder: 4,
    subCategories: [
      { id: 'sub-13', name: 'Candid Wedding Photography', slug: 'candid-wedding' },
      { id: 'sub-14', name: 'Cinematic Films & Teasers', slug: 'cinematic-films' },
      { id: 'sub-15', name: 'Pre-Wedding Destinations', slug: 'pre-wedding' },
      { id: 'sub-16', name: 'Drone Aerial 4K', slug: 'drone-aerial' },
    ],
    _count: { vendors: 16 },
  },
  {
    id: 'cat-dj',
    name: 'Sound, DJ & Artists',
    slug: 'sound-dj-entertainment',
    description: 'Celebrity DJs, Dhol troupes, live bands, acoustic duos, standup comedians, and emcees.',
    sortOrder: 5,
    subCategories: [
      { id: 'sub-17', name: 'Professional Club DJs', slug: 'club-djs' },
      { id: 'sub-18', name: 'Live Acoustic & Sufi Bands', slug: 'live-bands' },
      { id: 'sub-19', name: 'Punjabi & Nasik Dhol', slug: 'dhol-troupes' },
      { id: 'sub-20', name: 'Anchors & Emcees', slug: 'anchors-emcees' },
    ],
    _count: { vendors: 11 },
  },
  {
    id: 'cat-tents',
    name: 'German Tents & Infrastructure',
    slug: 'tents-infrastructure',
    description: 'Waterproof German hangars, pagoda tents, VIP air conditioning units, generator backups & barricades.',
    sortOrder: 6,
    subCategories: [
      { id: 'sub-21', name: 'German Hangar Structures', slug: 'german-hangar' },
      { id: 'sub-22', name: 'Pagoda Canopies', slug: 'pagoda-canopies' },
      { id: 'sub-23', name: 'Tower AC & Cooling Systems', slug: 'tower-ac-cooling' },
      { id: 'sub-24', name: 'Silent DG Generator Sets', slug: 'dg-generators' },
    ],
    _count: { vendors: 8 },
  },
];

export const FALLBACK_VENDORS: MockVendor[] = [
  {
    id: 'v-1',
    businessName: 'Dream Decor Events',
    name: 'Dream Decor Events',
    ownerName: 'Vikramaditya Sharma',
    slug: 'dream-decor-events',
    email: 'dreamdecor@ventzivo.com',
    mobile: '7566145566',
    whatsapp: '7566145566',
    category: { id: 'cat-decor', name: 'Event Decoration & Themes', slug: 'event-decoration' },
    categorySlug: 'event-decoration',
    subCategory: { id: 'sub-9', name: 'Floral & Mandap Decor', slug: 'floral-mandap' },
    city: 'Raipur',
    state: 'Chhattisgarh',
    address: 'VIP Road, Near Magneto Mall, Raipur',
    rating: 4.9,
    reviewCount: 128,
    startingPrice: 50000,
    experienceYears: 9,
    teamSize: 35,
    description: 'Dream Decor Events transforms spaces into fairy tale venues. Specializing in royal mandap setups, destination wedding florals, architectural fairy-light ceilings, and corporate conference production across Central India.',
    isVerified: true,
    isFeatured: true,
    status: 'VERIFIED',
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    logo: '/ventzivo-logo.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    ],
    serviceAreas: ['Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Nagpur'],
    eventTypes: [
      { eventType: { id: 'et-wedding', name: 'Weddings & Receptions', slug: 'weddings' } },
      { eventType: { id: 'et-corporate', name: 'Corporate Conferences & Summits', slug: 'corporate-events' } },
      { eventType: { id: 'et-birthday', name: 'Birthday Parties & Milestones', slug: 'birthday-parties' } },
    ],
    services: [
      {
        id: 's-1',
        name: 'Royal Floral Mandap Package',
        description: 'Exotic Dutch roses, white orchids, crystal chandeliers, royal thrones and mirror carpet runway.',
        price: 85000,
        priceUnit: 'per setup',
        images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'],
      },
      {
        id: 's-2',
        name: 'Fairy-Light Starry Ceiling',
        description: 'Over 20,000 warm white micro LEDs suspended with golden drapes and central amber chandeliers.',
        price: 45000,
        priceUnit: 'per night',
        images: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'],
      },
    ],
    businessHours: 'Monday - Sunday: 9:00 AM - 9:00 PM',
  },
  {
    id: 'v-2',
    businessName: 'Gulab Catering & Royal Feasts',
    name: 'Gulab Catering & Royal Feasts',
    ownerName: 'Chef Rajesh Agrawal',
    slug: 'gulab-catering-services',
    email: 'gulabcatering@ventzivo.com',
    mobile: '7566145566',
    whatsapp: '7566145566',
    category: { id: 'cat-catering', name: 'Catering & Food Services', slug: 'catering-services' },
    categorySlug: 'catering-services',
    subCategory: { id: 'sub-5', name: 'Royal Indian Buffet', slug: 'royal-indian-buffet' },
    city: 'Raipur',
    state: 'Chhattisgarh',
    address: 'Civil Lines, Raipur',
    rating: 4.8,
    reviewCount: 96,
    startingPrice: 450,
    experienceYears: 14,
    teamSize: 50,
    description: 'Renowned for sumptuous banquet dining, live fusion counters, wood-fired pizza ovens, artisanal dessert spreads, and strict hygiene protocols.',
    isVerified: true,
    isFeatured: true,
    status: 'VERIFIED',
    coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    logo: '/ventzivo-logo.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    ],
    serviceAreas: ['Raipur', 'Bilaspur', 'Bhilai', 'Rajnandgaon'],
    eventTypes: [
      { eventType: { id: 'et-wedding', name: 'Weddings & Receptions', slug: 'weddings' } },
      { eventType: { id: 'et-anniversary', name: 'Anniversaries & Private Dinners', slug: 'anniversaries' } },
      { eventType: { id: 'et-corporate', name: 'Corporate Conferences & Summits', slug: 'corporate-events' } },
    ],
    services: [
      {
        id: 's-3',
        name: 'Grand Royal Wedding Thali / Buffet',
        description: '56 Bhog luxury vegetarian banquet including 8 starter passes, 4 live kitchens, and 6 exotic desserts.',
        price: 750,
        priceUnit: 'per plate',
        images: ['https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80'],
      },
    ],
    businessHours: 'Monday - Sunday: 8:00 AM - 10:00 PM',
  },
  {
    id: 'v-3',
    businessName: 'Studio Royale Cinema & 4K Aerials',
    name: 'Studio Royale Cinema & 4K Aerials',
    ownerName: 'Aman Deep Sen',
    slug: 'studio-royale-cinema',
    email: 'studioroyale@ventzivo.com',
    mobile: '7566145566',
    whatsapp: '7566145566',
    category: { id: 'cat-photo', name: 'Photography & Cinema', slug: 'photography-videography' },
    categorySlug: 'photography-videography',
    subCategory: { id: 'sub-13', name: 'Candid Wedding Photography', slug: 'candid-wedding' },
    city: 'Raipur',
    state: 'Chhattisgarh',
    address: 'Shankar Nagar, Main Commercial Belt, Raipur',
    rating: 4.9,
    reviewCount: 78,
    startingPrice: 35000,
    experienceYears: 8,
    teamSize: 12,
    description: 'Award-winning visual storytellers capturing emotive wedding cinema, timeless candid portraits, and FAA certified 4K drone cinematography.',
    isVerified: true,
    isFeatured: true,
    status: 'VERIFIED',
    coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    logo: '/ventzivo-logo.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    ],
    serviceAreas: ['Raipur', 'Mumbai', 'Goa', 'Bhilai', 'Indore'],
    eventTypes: [
      { eventType: { id: 'et-wedding', name: 'Weddings & Receptions', slug: 'weddings' } },
      { eventType: { id: 'et-concert', name: 'Concerts & Live Shows', slug: 'concerts-live-shows' } },
      { eventType: { id: 'et-college', name: 'College & School Annual Fests', slug: 'college-fests' } },
    ],
    services: [
      {
        id: 's-4',
        name: '3-Day Wedding Cinema & Candid Coverage',
        description: '4 Master cinematographers, candid photographer, drone coverage, 5-minute teaser & full documentary film in 4K.',
        price: 125000,
        priceUnit: 'full package',
        images: ['https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80'],
      },
    ],
    businessHours: 'Monday - Saturday: 10:00 AM - 8:00 PM',
  },
  {
    id: 'v-4',
    businessName: 'The Imperial Palace Grand Banquets',
    name: 'The Imperial Palace Grand Banquets',
    ownerName: 'Manish Verma',
    slug: 'the-imperial-palace',
    email: 'imperialpalace@ventzivo.com',
    mobile: '7566145566',
    whatsapp: '7566145566',
    category: { id: 'cat-venues', name: 'Event Venues & Banquets', slug: 'event-venues-banquets' },
    categorySlug: 'event-venues-banquets',
    subCategory: { id: 'sub-1', name: 'Banquet Halls', slug: 'banquet-halls' },
    city: 'Raipur',
    state: 'Chhattisgarh',
    address: 'Labhandi, Raipur Express Highway',
    rating: 4.85,
    reviewCount: 142,
    startingPrice: 150000,
    experienceYears: 11,
    teamSize: 60,
    description: 'Air-conditioned luxury banquet pillarless hall with capacity of 1,500 guests and 40,000 sq.ft adjacent royal lawn with private valet parking for 300 cars.',
    isVerified: true,
    isFeatured: true,
    status: 'VERIFIED',
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    logo: '/ventzivo-logo.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    ],
    serviceAreas: ['Raipur', 'Durg', 'Bhilai'],
    eventTypes: [
      { eventType: { id: 'et-wedding', name: 'Weddings & Receptions', slug: 'weddings' } },
      { eventType: { id: 'et-corporate', name: 'Corporate Conferences & Summits', slug: 'corporate-events' } },
      { eventType: { id: 'et-exhibition', name: 'Exhibitions & Trade Fairs', slug: 'exhibitions-trade-shows' } },
    ],
    services: [
      {
        id: 's-5',
        name: 'Full Day Ballroom & Lawn Rental',
        description: 'Complete hall air-conditioning, backup generators, 4 green rooms, security staff & parking crew included.',
        price: 180000,
        priceUnit: 'per day',
        images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'],
      },
    ],
    businessHours: 'Open 24/7 for booking enquiries',
  },
  {
    id: 'v-5',
    businessName: 'VibeWave Live Sound & Concert DJ',
    name: 'VibeWave Live Sound & Concert DJ',
    ownerName: 'DJ Harsh Vardhan',
    slug: 'vibewave-sound-dj',
    email: 'vibewave@ventzivo.com',
    mobile: '7566145566',
    whatsapp: '7566145566',
    category: { id: 'cat-dj', name: 'Sound, DJ & Artists', slug: 'sound-dj-entertainment' },
    categorySlug: 'sound-dj-entertainment',
    subCategory: { id: 'sub-17', name: 'Professional Club DJs', slug: 'club-djs' },
    city: 'Raipur',
    state: 'Chhattisgarh',
    address: 'Telibandha Marine Drive, Raipur',
    rating: 4.95,
    reviewCount: 64,
    startingPrice: 20000,
    experienceYears: 7,
    teamSize: 10,
    description: 'High-energy DJ setups, concert JBL VTX line arrays, intelligent moving head beams, cold pyro sparkle machines, and CO2 jets for unforgettable parties.',
    isVerified: true,
    isFeatured: true,
    status: 'VERIFIED',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    logo: '/ventzivo-logo.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    ],
    serviceAreas: ['Raipur', 'Bilaspur', 'Nagpur', 'Indore'],
    eventTypes: [
      { eventType: { id: 'et-concert', name: 'Concerts & Live Shows', slug: 'concerts-live-shows' } },
      { eventType: { id: 'et-birthday', name: 'Birthday Parties & Milestones', slug: 'birthday-parties' } },
      { eventType: { id: 'et-college', name: 'College & School Annual Fests', slug: 'college-fests' } },
    ],
    services: [
      {
        id: 's-6',
        name: 'Sangeet & Cocktail DJ Stage Extravaganza',
        description: 'Pioneer DJ console, 4000W subwoofer arrays, truss lighting with moving heads and haze generators.',
        price: 35000,
        priceUnit: 'per night',
        images: ['https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'],
      },
    ],
    businessHours: 'Monday - Sunday: 11:00 AM - 11:00 PM',
  },
  {
    id: 'v-6',
    businessName: 'German Hangar & Super Infrastructure',
    name: 'German Hangar & Super Infrastructure',
    ownerName: 'Sanjay Deshmukh',
    slug: 'german-hangar-super-structures',
    email: 'hangars@ventzivo.com',
    mobile: '7566145566',
    whatsapp: '7566145566',
    category: { id: 'cat-tents', name: 'German Tents & Infrastructure', slug: 'tents-infrastructure' },
    categorySlug: 'tents-infrastructure',
    subCategory: { id: 'sub-21', name: 'German Hangar Structures', slug: 'german-hangar' },
    city: 'Raipur',
    state: 'Chhattisgarh',
    address: 'Tatibandh Industrial Area, Raipur',
    rating: 4.8,
    reviewCount: 52,
    startingPrice: 65000,
    experienceYears: 15,
    teamSize: 80,
    description: 'Heavy aluminum alloy German hangar structures tested for 120km/h winds and heavy rain. Ideal for massive political conventions, corporate expos, and royal weddings.',
    isVerified: true,
    isFeatured: true,
    status: 'VERIFIED',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    logo: '/ventzivo-logo.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    ],
    serviceAreas: ['Raipur', 'Bilaspur', 'Nagpur', 'Bhubaneswar', 'Bhopal'],
    eventTypes: [
      { eventType: { id: 'et-exhibition', name: 'Exhibitions & Trade Fairs', slug: 'exhibitions-trade-shows' } },
      { eventType: { id: 'et-wedding', name: 'Weddings & Receptions', slug: 'weddings' } },
      { eventType: { id: 'et-corporate', name: 'Corporate Conferences & Summits', slug: 'corporate-events' } },
    ],
    services: [
      {
        id: 's-7',
        name: '10,000 Sq.Ft Waterproof German Hangar',
        description: 'Complete erection with fire-retardant PVC fabric, wooden flooring, side walls and glass entry doors.',
        price: 150000,
        priceUnit: 'per setup',
        images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'],
      },
    ],
    businessHours: 'Monday - Saturday: 8:00 AM - 8:00 PM',
  },
];
