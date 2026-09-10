/* ==========================================================================
   ELYSIAN LUXURY ESTATES — CORE APPLICATION ENGINE
   Standalone ES6+ Real Estate Platform Logic & State Management
   Zero Dependencies, High Performance, Fully Functional
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 01. CURRENCY CONVERSION TABLES & FORMATTERS
  // --------------------------------------------------------------------------
  const CURRENCY_RATES = {
    USD: { rate: 1.0, symbol: '$', code: 'USD', prefix: true },
    AED: { rate: 3.6725, symbol: 'AED ', code: 'AED', prefix: true },
    PKR: { rate: 278.50, symbol: 'PKR ', code: 'PKR', prefix: true },
    EUR: { rate: 0.92, symbol: '€', code: 'EUR', prefix: true },
    GBP: { rate: 0.79, symbol: '£', code: 'GBP', prefix: true }
  };

  function formatPrice(amountUSD, isRent = false) {
    const currentCode = state.currency || 'USD';
    const curr = CURRENCY_RATES[currentCode] || CURRENCY_RATES.USD;
    const converted = amountUSD * curr.rate;

    let formatted = '';
    if (currentCode === 'PKR') {
      if (converted >= 10000000) {
        const crore = (converted / 10000000).toFixed(2);
        formatted = `₨ ${crore} Crore`;
      } else if (converted >= 100000) {
        const lakh = (converted / 100000).toFixed(2);
        formatted = `₨ ${lakh} Lakh`;
      } else {
        formatted = `₨ ${Math.round(converted).toLocaleString()}`;
      }
    } else {
      formatted = `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }

    if (isRent) {
      formatted += ' <span class="card-price-period">/ month</span>';
    }
    return formatted;
  }

  // --------------------------------------------------------------------------
  // 02. MASTER SEED PROPERTY CATALOG (REALISTIC LUXURY DATA)
  // --------------------------------------------------------------------------
  const SEED_PROPERTIES = [
    {
      id: 'prop-isl-01',
      title: 'The Margalla Ridge Sanctuary',
      tagline: 'Private Cliffside Architectural Marvel with Diplomatic Security',
      priceUSD: 4850000,
      purpose: 'Sale',
      city: 'Islamabad',
      address: 'Sector F-6/3, Hillside Ridge, Islamabad',
      type: 'Villa',
      beds: 6,
      baths: 7,
      areaSqFt: 11500,
      parking: 5,
      yearBuilt: 2024,
      furnishing: 'Fully Furnished',
      featured: true,
      exclusive: true,
      verified: true,
      rating: 4.98,
      agent: {
        id: 'agent-1',
        name: 'Sophia Reynolds',
        role: 'Senior Private Advisor, Islamabad & Lahore',
        phone: '+92 300 855 4910',
        email: 'sophia.reynolds@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70',
        deals: '$240M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'Commanding an elevated ridge directly beneath the Margalla Hills National Park in Sector F-6/3, this landmark residence features cantilevered glass pavilions, Italian Travertine stone, and an infinity pool that merges seamlessly into the pine canopy.',
      amenities: ['Swimming Pool', 'Private Gym', 'Smart Home', 'Security & CCTV', 'Zen Garden', 'Balcony', 'Air Conditioning', 'Servant Quarters'],
      floorPlans: [
        { level: 'Level 1 (Ground & Garden)', area: '4,800 sq ft', label: 'Grand Atrium, Double-Height Salon, Infinity Pool Deck & Gourmet Kitchen' },
        { level: 'Level 2 (Private Suites)', area: '4,500 sq ft', label: '4 Master En-Suites with Margalla Panoramas & Private Library' },
        { level: 'Terrace Penthouse Deck', area: '2,200 sq ft', label: 'Rooftop Observatory, Sunset Lounge & Hydrotherapy Spa' }
      ]
    },
    {
      id: 'prop-dub-01',
      title: 'Palm Jumeirah Water Palace',
      tagline: 'Direct Private Beachfront Mansion with Superyacht Mooring',
      priceUSD: 14500000,
      purpose: 'Sale',
      city: 'Dubai',
      address: 'Frond N, Palm Jumeirah, Dubai, UAE',
      type: 'Mansion',
      beds: 7,
      baths: 9,
      areaSqFt: 14800,
      parking: 6,
      yearBuilt: 2025,
      furnishing: 'Fully Furnished',
      featured: true,
      exclusive: true,
      verified: true,
      rating: 5.0,
      agent: {
        id: 'agent-2',
        name: 'Tariq Al-Mansoor',
        role: 'Senior Partner, Dubai & London',
        phone: '+971 50 491 8820',
        email: 'tariq.mansoor@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70',
        deals: '$650M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'An architectural masterpiece occupying an exclusive Frond tip on Palm Jumeirah with 120 feet of private white-sand beach. Features double-height ceilings, Calacatta marble, Poggenpohl kitchen, private cinema, and private private yacht dock.',
      amenities: ['Swimming Pool', 'Private Gym', 'Smart Home', 'Security & CCTV', 'Private Elevator', 'Wine Cellar', 'Cinema', 'Sea / Mountain View'],
      floorPlans: [
        { level: 'Ground Floor & Lagoon', area: '6,200 sq ft', label: 'Beachfront Living Pavilion, Infinity Pool & Staff Residences' },
        { level: 'First Floor Suites', area: '5,600 sq ft', label: '5 Royal Suites with Dubai Marina Skyline Views' },
        { level: 'Master Penthouse Suite', area: '3,000 sq ft', label: 'Full Floor Master Sanctuary with Private Jacuzzi & Solarium' }
      ]
    },
    {
      id: 'prop-lah-01',
      title: 'The Raya Heritage Manor',
      tagline: 'Colonial Elegance Merged with Ultra-Contemporary Tech',
      priceUSD: 3400000,
      purpose: 'Sale',
      city: 'Lahore',
      address: 'DHA Phase 8, Golf Course Enclave, Lahore',
      type: 'Villa',
      beds: 5,
      baths: 6,
      areaSqFt: 9800,
      parking: 4,
      yearBuilt: 2024,
      furnishing: 'Fully Furnished',
      featured: true,
      exclusive: false,
      verified: true,
      rating: 4.95,
      agent: {
        id: 'agent-1',
        name: 'Sophia Reynolds',
        role: 'Senior Private Advisor, Islamabad & Lahore',
        phone: '+92 300 855 4910',
        email: 'sophia.reynolds@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70',
        deals: '$240M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'Situated on the fairway of the prestigious Raya Golf Club in DHA Phase 8, this residence fuses Spanish colonial courtyards with Scandinavian minimalist interiors. Triple glazed acoustic facades, heated indoor lap pool, and solar smart grid.',
      amenities: ['Swimming Pool', 'Private Gym', 'Smart Home', 'Security & CCTV', 'Zen Garden', 'Air Conditioning', 'Servant Quarters'],
      floorPlans: [
        { level: 'Lower Ground Leisure', area: '3,200 sq ft', label: 'Cinema, Spa Suite & Tasting Room' },
        { level: 'Ground Floor Grand Hall', area: '4,200 sq ft', label: 'Double Courtyard & Formal Dining' },
        { level: 'Upper Floor Living', area: '2,400 sq ft', label: 'Family Lounges & 4 Suites' }
      ]
    },
    {
      id: 'prop-kar-01',
      title: 'Clifton Oceanfront Sky Duplex',
      tagline: 'Panoramic Arabian Sea Horizon Penthouse with Helipad Access',
      priceUSD: 2950000,
      purpose: 'Sale',
      city: 'Karachi',
      address: 'Sea View Road, Clifton Block 4, Karachi',
      type: 'Penthouse',
      beds: 4,
      baths: 5,
      areaSqFt: 7200,
      parking: 3,
      yearBuilt: 2024,
      furnishing: 'Fully Furnished',
      featured: true,
      exclusive: true,
      verified: true,
      rating: 4.96,
      agent: {
        id: 'agent-3',
        name: 'Farhan Zaidi',
        role: 'Director of Prime Holdings, Karachi Coast',
        phone: '+92 321 445 9012',
        email: 'farhan.zaidi@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=70',
        deals: '$310M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'Soaring 34 stories above the Arabian Sea in Clifton, this trophy penthouse provides uninterrupted maritime sunsets. Includes private express elevator, wraparound glass observation deck, Lutron lighting system, and concierge valet.',
      amenities: ['Smart Home', 'Security & CCTV', 'Private Elevator', 'Balcony', 'Air Conditioning', 'Sea / Mountain View', 'Helipad'],
      floorPlans: [
        { level: 'Lower Sky Level', area: '4,000 sq ft', label: 'Grand Living Salon, Chef Kitchen & Guest Suite' },
        { level: 'Upper Master Floor', area: '3,200 sq ft', label: 'Primary Master Suite, Walk-in Dressing & Sunset Jacuzzi' }
      ]
    },
    {
      id: 'prop-pesh-01',
      title: 'The Hayatabad Oak Residence',
      tagline: 'Gated Diplomatic Sanctuary with Hand-Carved Teak Millwork',
      priceUSD: 1850000,
      purpose: 'Sale',
      city: 'Peshawar',
      address: 'Phase 5, Hayatabad Prime Sector, Peshawar',
      type: 'Villa',
      beds: 6,
      baths: 7,
      areaSqFt: 8400,
      parking: 4,
      yearBuilt: 2023,
      furnishing: 'Semi Furnished',
      featured: false,
      exclusive: false,
      verified: true,
      rating: 4.92,
      agent: {
        id: 'agent-1',
        name: 'Sophia Reynolds',
        role: 'Senior Private Advisor, Islamabad & Lahore',
        phone: '+92 300 855 4910',
        email: 'sophia.reynolds@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70',
        deals: '$240M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'Set within an ultra-secure cul-de-sac in Hayatabad, this distinguished residence combines regional historic stone masonry with Swiss engineering. Features central hydronic underfloor heating, solar battery backup, and lush orchards.',
      amenities: ['Security & CCTV', 'Zen Garden', 'Air Conditioning', 'Servant Quarters', 'Smart Home'],
      floorPlans: [
        { level: 'Ground Floor', area: '4,600 sq ft', label: 'Grand Traditional Hujra / Reception & Dining' },
        { level: 'First Floor', area: '3,800 sq ft', label: 'Family En-Suites & Private Verandas' }
      ]
    },
    {
      id: 'prop-lon-01',
      title: 'Mayfair Eaton Square Suite',
      tagline: 'Historic Grade-II Listed Georgian Stately Residence',
      priceUSD: 18900000,
      purpose: 'Sale',
      city: 'London',
      address: 'Eaton Square, Belgravia / Mayfair, London SW1W',
      type: 'Mansion',
      beds: 5,
      baths: 6,
      areaSqFt: 8100,
      parking: 2,
      yearBuilt: 2023,
      furnishing: 'Fully Furnished',
      featured: true,
      exclusive: true,
      verified: true,
      rating: 5.0,
      agent: {
        id: 'agent-2',
        name: 'Tariq Al-Mansoor',
        role: 'Senior Partner, Dubai & London',
        phone: '+971 50 491 8820',
        email: 'tariq.mansoor@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70',
        deals: '$650M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'One of the United Kingdom’s premier addresses overlooking private manicured garden squares. Meticulously restored with original ornamental plasterwork, French parquet flooring, passenger lift, and wine vault.',
      amenities: ['Smart Home', 'Security & CCTV', 'Private Elevator', 'Wine Cellar', 'Zen Garden', 'Air Conditioning'],
      floorPlans: [
        { level: 'Lower Ground', area: '2,200 sq ft', label: 'Vaulted Cellar, Staff Quarters & Cinema' },
        { level: 'Ground Floor', area: '2,400 sq ft', label: 'Entrance Portico & Morning Drawing Room' },
        { level: 'First & Second Floors', area: '3,500 sq ft', label: 'Principal Master Wing & Guest Suites' }
      ]
    },
    {
      id: 'prop-dub-rent',
      title: 'Downtown Sky Duplex Penthouse',
      tagline: 'Front-Row Burj Khalifa & Fountains Panoramic Vista',
      priceUSD: 24000,
      purpose: 'Rent',
      city: 'Dubai',
      address: 'Downtown Opera District, Dubai, UAE',
      type: 'Penthouse',
      beds: 3,
      baths: 4,
      areaSqFt: 4600,
      parking: 2,
      yearBuilt: 2024,
      furnishing: 'Fully Furnished',
      featured: false,
      exclusive: false,
      verified: true,
      rating: 4.94,
      agent: {
        id: 'agent-2',
        name: 'Tariq Al-Mansoor',
        role: 'Senior Partner, Dubai & London',
        phone: '+971 50 491 8820',
        email: 'tariq.mansoor@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70',
        deals: '$650M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'Available for short or multi-year diplomatic lease. Fully equipped with Armani Casa furnishings, automated mood lighting, floor-to-ceiling glass, and hotel services from the adjacent five-star palace.',
      amenities: ['Swimming Pool', 'Private Gym', 'Smart Home', 'Security & CCTV', 'Balcony', 'Air Conditioning'],
      floorPlans: [
        { level: 'Lower Level', area: '2,600 sq ft', label: 'Living Salon, Open Dining & Sunset Balcony' },
        { level: 'Upper Level', area: '2,000 sq ft', label: '3 Luxury Suites with Direct Burj Khalifa Views' }
      ]
    },
    {
      id: 'prop-isl-rent',
      title: 'Bani Gala Hilltop Villa',
      tagline: 'Lake Rawal Vistas with Private Helicopter Landing Site',
      priceUSD: 9500,
      purpose: 'Rent',
      city: 'Islamabad',
      address: 'Bani Gala Green Ridge, Islamabad',
      type: 'Villa',
      beds: 4,
      baths: 5,
      areaSqFt: 6800,
      parking: 4,
      yearBuilt: 2023,
      furnishing: 'Fully Furnished',
      featured: false,
      exclusive: false,
      verified: true,
      rating: 4.9,
      agent: {
        id: 'agent-1',
        name: 'Sophia Reynolds',
        role: 'Senior Private Advisor, Islamabad & Lahore',
        phone: '+92 300 855 4910',
        email: 'sophia.reynolds@elysian-estates.com',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70',
        deals: '$240M Closed'
      },
      images: [
        'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=720&q=75'
      ],
      description: 'An idyllic retreat situated on an expansive acre overlooking Lake Rawal. Features infinity pool, organic olive orchard, solar battery backup, and dedicated security post.',
      amenities: ['Swimming Pool', 'Security & CCTV', 'Zen Garden', 'Air Conditioning', 'Servant Quarters'],
      floorPlans: [
        { level: 'Ground Floor', area: '4,000 sq ft', label: 'Pool Deck, Sun Lounge & Great Room' },
        { level: 'Upper Floor', area: '2,800 sq ft', label: '3 Lakeview Suites & Library' }
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // 03. EDITORIAL ARTICLES & REAL ESTATE INSIGHTS SEED
  // --------------------------------------------------------------------------
  const SEED_INSIGHTS = [
    {
      id: 'insight-1',
      title: 'Global Sovereign Allocations: Why Prime Real Estate Outperforms in 2026',
      category: 'Market Intelligence',
      date: 'September 2, 2026',
      readTime: '6 min read',
      photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=70',
      snippet: 'An institutional analysis of prime residential capital flows from GCC family offices and European private wealth trusts into high-security enclaves.',
      content: 'In turbulent macroeconomic cycles, prime freehold residential real estate represents the supreme wealth preservation asset. With geopolitical shifts favoring transparent, stable jurisdictions with triple-vetted land titles, cities like Islamabad, Dubai, and London have witnessed unprecedented demand for trophy assets exceeding $5M.'
    },
    {
      id: 'insight-2',
      title: 'Architectural Biophilia: Designing With Margalla Topography',
      category: 'Design & Architecture',
      date: 'August 24, 2026',
      readTime: '4 min read',
      photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=70',
      snippet: 'How sustainable cantilever engineering and natural ventilation corridors are transforming luxury hillside villas in Islamabad’s Sectors F-6 and E-7.',
      content: 'True luxury today is defined by harmony between structure and earth. Modern buyers demand residences that touch the landscape gently while providing bulletproof structural resilience. Integrating native Travertine stone, triple-pane acoustic glazing, and thermal mass walls reduces active energy footprints by up to 60%.'
    },
    {
      id: 'insight-3',
      title: 'Cross-Border Escrow Protocols & The New FATF Compliance Era',
      category: 'Legal & Tax Optimization',
      date: 'August 10, 2026',
      readTime: '8 min read',
      photo: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=500&q=70',
      snippet: 'Navigating institutional wire transfers, foreign direct investment permits, and sovereign registry clearances for non-resident buyers.',
      content: 'International acquisitions require rigorous anti-money laundering (AML) protocols and bonded escrow frameworks. Elysian’s partnership with tier-1 international depository banks ensures that client capital is never exposed to counterparty risk prior to physical title deed registration.'
    }
  ];

  // --------------------------------------------------------------------------
  // 04. SENIOR AGENTS DIRECTORY
  // --------------------------------------------------------------------------
  const SEED_AGENTS = [
    {
      id: 'agent-1',
      name: 'Sophia Reynolds',
      role: 'Private Client Advisor',
      region: 'Islamabad & Lahore',
      experience: '16 Years',
      deals: '$240M+',
      rating: 4.98,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70',
      phone: '+92 300 855 4910',
      email: 'sophia.reynolds@elysian-estates.com'
    },
    {
      id: 'agent-2',
      name: 'Tariq Al-Mansoor',
      role: 'Senior Partner',
      region: 'Dubai & London',
      experience: '22 Years',
      deals: '$650M+',
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70',
      phone: '+971 50 491 8820',
      email: 'tariq.mansoor@elysian-estates.com'
    },
    {
      id: 'agent-3',
      name: 'Farhan Zaidi',
      role: 'Director of Prime Holdings',
      region: 'Karachi Coastline',
      experience: '14 Years',
      deals: '$310M+',
      rating: 4.96,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=70',
      phone: '+92 321 445 9012',
      email: 'farhan.zaidi@elysian-estates.com'
    },
    {
      id: 'agent-4',
      name: 'Elena Rostova',
      role: 'International Trophy Specialist',
      region: 'London & New York',
      experience: '18 Years',
      deals: '$520M+',
      rating: 4.99,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=70',
      phone: '+44 20 7946 0912',
      email: 'elena.rostova@elysian-estates.com'
    }
  ];

  // --------------------------------------------------------------------------
  // 05. SPATIAL MAP HOTSPOTS SEED
  // --------------------------------------------------------------------------
  const MAP_HOTSPOTS = [
    { id: 'poi-1', x: 28, y: 35, type: 'estate', title: 'The Margalla Ridge Sanctuary', propId: 'prop-isl-01' },
    { id: 'poi-2', x: 42, y: 48, type: 'dining', title: 'Monal Diplomatic Fine Dining' },
    { id: 'poi-3', x: 65, y: 32, type: 'schools', title: 'International School of Islamabad (ISOI)' },
    { id: 'poi-4', x: 74, y: 62, type: 'aviation', title: 'Islamabad VIP Helipad Terminal' },
    { id: 'poi-5', x: 50, y: 72, type: 'wellness', title: 'Diplomatic Enclave Medical Center' },
    { id: 'poi-6', x: 35, y: 60, type: 'shopping', title: 'Centaurus Luxury Boutique Pavilion' },
    { id: 'poi-7', x: 82, y: 25, type: 'estate', title: 'Palm Jumeirah Water Palace', propId: 'prop-dub-01' },
    { id: 'poi-8', x: 18, y: 75, type: 'estate', title: 'Clifton Oceanfront Sky Duplex', propId: 'prop-kar-01' }
  ];

  // --------------------------------------------------------------------------
  // 06. APPLICATION STATE
  // --------------------------------------------------------------------------
  const state = {
    properties: [],
    filteredProperties: [],
    favorites: [],
    myListings: [],
    scheduledViewings: [],
    currency: 'USD',
    theme: 'dark',
    viewMode: 'grid',
    activePurpose: 'All',
    activeCategory: 'All',
    activeCity: 'All',
    activeSort: 'featured',
    searchKeyword: '',
    selectedPriceTier: 'All',
    selectedBeds: 'All',
    selectedType: 'All',
    filters: {
      maxPrice: 25000000,
      minArea: 1000,
      beds: 'All',
      baths: 'All',
      furnishing: 'All',
      amenities: []
    },
    addPropertyModal: {
      editId: null,
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=75'
      ]
    },
    deleteTargetId: null,
    wizard: {
      step: 1,
      uploadedImages: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=75'
      ],
      data: {}
    },
    lightbox: {
      images: [],
      currentIndex: 0,
      caption: ''
    },
    chat: {
      activePropertyId: 'prop-isl-01',
      activeAgentId: 'agent-2'
    },
    testimonialIndex: 0
  };

  // --------------------------------------------------------------------------
  // 07. LOCAL STORAGE INITIALIZATION & SYNC
  // --------------------------------------------------------------------------
  function loadPersistedState() {
    // Theme
    const savedTheme = localStorage.getItem('elysian_theme');
    if (savedTheme) {
      state.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeButtonUI();
    }

    // Currency
    const savedCurr = localStorage.getItem('elysian_currency');
    if (savedCurr && CURRENCY_RATES[savedCurr]) {
      state.currency = savedCurr;
      const select = document.getElementById('currency-select');
      if (select) select.value = savedCurr;
    }

    // Favorites
    try {
      const savedFavs = JSON.parse(localStorage.getItem('elysian_favorites') || '[]');
      state.favorites = Array.isArray(savedFavs) ? savedFavs : [];
    } catch (e) {
      state.favorites = [];
    }

    // Custom Listings from User
    try {
      const savedListings = JSON.parse(localStorage.getItem('elysian_my_listings') || '[]');
      state.myListings = Array.isArray(savedListings) ? savedListings : [];
    } catch (e) {
      state.myListings = [];
    }

    // Scheduled Viewings
    try {
      const savedViewings = JSON.parse(localStorage.getItem('elysian_viewings') || '[]');
      if (Array.isArray(savedViewings) && savedViewings.length > 0) {
        state.scheduledViewings = savedViewings;
      } else {
        // Default demo confirmed viewing
        state.scheduledViewings = [
          {
            id: 'viewing-default-1',
            propertyTitle: 'The Margalla Ridge Sanctuary',
            location: 'Sector F-6/3, Islamabad',
            date: '2026-10-14',
            time: 'Sunset Golden Hour (05:30 PM)',
            tourType: 'In-Person VIP',
            agentName: 'Sophia Reynolds',
            status: 'Confirmed'
          }
        ];
      }
    } catch (e) {
      state.scheduledViewings = [];
    }

    // Combine User Created Listings (at top) + Seed Properties
    state.properties = [...state.myListings, ...SEED_PROPERTIES];
    state.filteredProperties = [...state.properties];

    updateFavoritesCountUI();
    updateDashboardKpis();
  }

  function saveFavorites() {
    localStorage.setItem('elysian_favorites', JSON.stringify(state.favorites));
    updateFavoritesCountUI();
    renderFavoritesDrawer();
    updateDashboardKpis();
  }

  function saveMyListings() {
    localStorage.setItem('elysian_my_listings', JSON.stringify(state.myListings));
    state.properties = [...state.myListings, ...SEED_PROPERTIES];
    applyAllFilters();
    updateDashboardKpis();
  }

  function saveScheduledViewings() {
    localStorage.setItem('elysian_viewings', JSON.stringify(state.scheduledViewings));
    renderDashboardViewings();
    updateDashboardKpis();
  }

  // --------------------------------------------------------------------------
  // 08. PROPERTY CATALOG RENDERING
  // --------------------------------------------------------------------------
  function renderProperties() {
    const container = document.getElementById('property-grid-container');
    const emptyCard = document.getElementById('empty-state-card');
    const countBadge = document.getElementById('results-count-number');
    const paginationWrap = document.getElementById('catalog-pagination-wrap');

    if (!container) return;

    const list = state.filteredProperties;
    if (countBadge) countBadge.textContent = list.length;

    if (list.length === 0) {
      container.innerHTML = '';
      if (emptyCard) emptyCard.style.display = 'block';
      if (paginationWrap) paginationWrap.style.display = 'none';
      return;
    }

    if (emptyCard) emptyCard.style.display = 'none';
    if (paginationWrap) paginationWrap.style.display = 'flex';

    container.innerHTML = list.map(prop => {
      const isSaved = state.favorites.includes(prop.id);
      const isRent = prop.purpose === 'Rent';
      const formattedPrice = formatPrice(prop.priceUSD, isRent);
      const isUserListing = !!prop.isUserCreated;

      return `
        <article class="property-card" data-id="${prop.id}">
          <div class="card-media-wrap" onclick="window.openPropertyDetails('${prop.id}')">
            <img src="${prop.images[0]}" alt="${prop.title}" class="card-img" loading="lazy" decoding="async" onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=70'">
            <div class="card-gradient-vignette"></div>

            <div class="card-badges-top">
              <span class="badge-featured" style="background: rgba(20, 184, 166, 0.85);">${prop.type.toUpperCase()}</span>
              <span class="badge-purpose">${prop.purpose === 'Sale' ? 'FOR SALE' : 'FOR RENT'}</span>
              ${prop.verified ? '<span class="badge-verified">✓ VERIFIED</span>' : ''}
            </div>

            ${isUserListing ? `
              <div class="card-owner-actions">
                <button class="card-owner-btn edit" onclick="event.stopPropagation(); window.editProperty('${prop.id}')" title="Edit Property">✏️ Edit</button>
                <button class="card-owner-btn del" onclick="event.stopPropagation(); window.confirmDeleteProperty('${prop.id}')" title="Delete Property">🗑️ Delete</button>
              </div>
            ` : ''}

            <button class="btn-card-favorite ${isSaved ? 'saved' : ''}" onclick="window.toggleFavorite('${prop.id}', event)" aria-label="Bookmark Property" title="Save to favorites">
              <svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>

            <div class="card-price-overlay">
              <div class="card-price">${formattedPrice}</div>
            </div>
          </div>

          <div class="card-body">
            <div class="card-location-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${prop.city} &bull; ${prop.location || prop.address.split(',')[0]}</span>
            </div>

            <h3 class="card-title" onclick="window.openPropertyDetails('${prop.id}')">${prop.title}</h3>

            <p class="card-short-desc">${prop.description ? (prop.description.length > 130 ? prop.description.slice(0, 130) + '...' : prop.description) : 'Curated premium architectural holding available for immediate acquisition.'}</p>

            <div class="card-specs-row">
              <div class="spec-item" title="Bedrooms">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spec-icon"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
                <span>${prop.beds > 0 ? `${prop.beds} Beds` : `${prop.type}`}</span>
              </div>
              <div class="spec-item" title="Bathrooms">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spec-icon"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M2 12h20"></path></svg>
                <span>${prop.baths > 0 ? `${prop.baths} Baths` : 'N/A'}</span>
              </div>
              <div class="spec-item" title="Living Area">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spec-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 3v18"></path><path d="M15 3v18"></path></svg>
                <span>${(prop.areaSqFt || 0).toLocaleString()} sq ft</span>
              </div>
            </div>

            <div class="card-footer-row">
              <div class="agent-mini-chip">
                <div class="agent-mini-avatar" style="background-image: url('${prop.agent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}');"></div>
                <div>
                  <span class="agent-mini-name">${prop.agent.name}</span>
                  <span class="agent-mini-title">${prop.agent.role ? prop.agent.role.split(',')[0] : 'Owner / Agent'}</span>
                </div>
              </div>

              <button class="card-cta-btn" onclick="window.openPropertyDetails('${prop.id}')">
                <span>View Details</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render The Luxury Collection (Trophy Assets)
  function renderVipShowcase() {
    const container = document.getElementById('luxury-showcase-grid');
    if (!container) return;

    const vips = state.properties.filter(p => p.exclusive || p.priceUSD >= 4000000).slice(0, 4);
    container.innerHTML = vips.map(p => `
      <div class="vip-showcase-card" onclick="window.openPropertyDetails('${p.id}')">
        <div class="vip-card-bg" style="background-image: url('${p.images[0]}');"></div>
        <div class="vip-card-gradient"></div>
        <div class="vip-card-content">
          <div class="vip-tag">⚜ PRIVATE TROPHY ASSET &bull; ${p.city.toUpperCase()}</div>
          <h3 class="vip-title">${p.title}</h3>
          <p class="vip-loc">${p.address} &bull; ${p.areaSqFt.toLocaleString()} Sq Ft Ultra-Luxury</p>
          <div class="vip-footer">
            <div class="vip-price">${formatPrice(p.priceUSD, p.purpose === 'Rent')}</div>
            <button class="vip-inquire-btn" onclick="event.stopPropagation(); window.openMessagesDrawer('${p.agent.id}', '${p.id}')">Private Inquire</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // 09. FILTERING & SEARCH LOGIC
  // --------------------------------------------------------------------------
  function applyAllFilters() {
    let result = [...state.properties];

    // Purpose Filter (Buy, Rent, Exclusive)
    if (state.activePurpose !== 'All') {
      if (state.activePurpose === 'Exclusive') {
        result = result.filter(p => p.exclusive === true);
      } else {
        result = result.filter(p => p.purpose === state.activePurpose);
      }
    }

    // Category / Asset Type Filter
    if (state.activeCategory !== 'All') {
      if (state.activeCategory === 'Rent') {
        result = result.filter(p => p.purpose === 'Rent');
      } else {
        result = result.filter(p => (p.type || '').toLowerCase() === state.activeCategory.toLowerCase());
      }
    }

    // City Filter
    if (state.activeCity !== 'All') {
      result = result.filter(p => (p.city || '').toLowerCase() === state.activeCity.toLowerCase());
    }

    // Search Keyword
    if (state.searchKeyword.trim() !== '') {
      const q = state.searchKeyword.toLowerCase().trim();
      result = result.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.city || '').toLowerCase().includes(q) ||
        (p.location || '').toLowerCase().includes(q) ||
        (p.address || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.type || '').toLowerCase().includes(q) ||
        (p.agent && p.agent.name ? p.agent.name.toLowerCase().includes(q) : false)
      );
    }

    // Hero Price Tier
    if (state.selectedPriceTier !== 'All') {
      if (state.selectedPriceTier === 'under1m') result = result.filter(p => p.priceUSD < 1000000);
      else if (state.selectedPriceTier === '1m-3m') result = result.filter(p => p.priceUSD >= 1000000 && p.priceUSD <= 3000000);
      else if (state.selectedPriceTier === '3m-6m') result = result.filter(p => p.priceUSD >= 3000000 && p.priceUSD <= 6000000);
      else if (state.selectedPriceTier === '6m-plus') result = result.filter(p => p.priceUSD > 6000000);
    }

    // Bedrooms Filter
    if (state.selectedBeds !== 'All') {
      const minBeds = parseInt(state.selectedBeds, 10);
      result = result.filter(p => p.beds >= minBeds);
    }

    // Advanced Drawer Slider Max Price
    if (state.filters.maxPrice < 25000000) {
      result = result.filter(p => p.priceUSD <= state.filters.maxPrice);
    }

    // Advanced Drawer Min Area
    if (state.filters.minArea > 1000) {
      result = result.filter(p => p.areaSqFt >= state.filters.minArea);
    }

    // Advanced Drawer Bathrooms
    if (state.filters.baths !== 'All') {
      const minBaths = parseInt(state.filters.baths, 10);
      result = result.filter(p => p.baths >= minBaths);
    }

    // Advanced Drawer Furnishing
    if (state.filters.furnishing !== 'All') {
      result = result.filter(p => p.furnishing === state.filters.furnishing);
    }

    // Advanced Drawer Amenities Checklist
    if (state.filters.amenities.length > 0) {
      result = result.filter(p =>
        state.filters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    // Apply Sorting
    sortPropertyList(result);

    state.filteredProperties = result;
    renderProperties();
    renderActiveFilterChips();
  }

  function sortPropertyList(list) {
    if (state.activeSort === 'price-asc') {
      list.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (state.activeSort === 'price-desc') {
      list.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (state.activeSort === 'newest') {
      list.sort((a, b) => b.yearBuilt - a.yearBuilt);
    } else if (state.activeSort === 'area-desc') {
      list.sort((a, b) => b.areaSqFt - a.areaSqFt);
    } else if (state.activeSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // featured default
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }

  function renderActiveFilterChips() {
    const wrap = document.getElementById('active-filter-chips-wrap');
    const list = document.getElementById('active-chips-list');
    if (!wrap || !list) return;

    const chips = [];

    if (state.activeCity !== 'All') {
      chips.push({ label: `City: ${state.activeCity}`, action: () => { state.activeCity = 'All'; const s = document.getElementById('hero-city-select'); if (s) s.value = 'All'; } });
    }
    if (state.activePurpose !== 'All') {
      chips.push({ label: `Purpose: ${state.activePurpose}`, action: () => { state.activePurpose = 'All'; document.querySelectorAll('.search-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-purpose') === 'All')); } });
    }
    if (state.activeCategory !== 'All') {
      chips.push({ label: `Type: ${state.activeCategory}`, action: () => { state.activeCategory = 'All'; document.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-val') === 'All')); } });
    }
    if (state.searchKeyword) {
      chips.push({ label: `Search: "${state.searchKeyword}"`, action: () => { state.searchKeyword = ''; const k = document.getElementById('hero-keyword-input'); if (k) k.value = ''; } });
    }
    if (state.selectedBeds !== 'All') {
      chips.push({ label: `${state.selectedBeds}+ Beds`, action: () => { state.selectedBeds = 'All'; const b = document.getElementById('hero-bed-select'); if (b) b.value = 'All'; } });
    }
    if (state.filters.maxPrice < 25000000) {
      chips.push({ label: `Max: $${(state.filters.maxPrice / 1000000).toFixed(1)}M`, action: () => { state.filters.maxPrice = 25000000; const sl = document.getElementById('drawer-max-price-slider'); if (sl) sl.value = 25000000; } });
    }
    state.filters.amenities.forEach(a => {
      chips.push({ label: a, action: () => { state.filters.amenities = state.filters.amenities.filter(item => item !== a); } });
    });

    if (chips.length === 0) {
      wrap.style.display = 'none';
      list.innerHTML = '';
      return;
    }

    wrap.style.display = 'flex';
    list.innerHTML = chips.map((c, idx) => `
      <span class="active-chip">
        <span>${c.label}</span>
        <button class="chip-remove-btn" onclick="window.removeFilterChip(${idx})">&times;</button>
      </span>
    `).join('');

    window._activeChipActions = chips.map(c => c.action);
  }

  window.removeFilterChip = function (index) {
    if (window._activeChipActions && window._activeChipActions[index]) {
      window._activeChipActions[index]();
      applyAllFilters();
    }
  };

  // --------------------------------------------------------------------------
  // 10. HERO CONTROLS & EVENT HANDLERS
  // --------------------------------------------------------------------------
  window.setSearchPurpose = function (purpose, el) {
    state.activePurpose = purpose;
    document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    applyAllFilters();
  };

  window.executeHeroSearch = function () {
    const kw = document.getElementById('hero-keyword-input');
    const city = document.getElementById('hero-city-select');
    const type = document.getElementById('hero-type-select');
    const price = document.getElementById('hero-price-select');
    const beds = document.getElementById('hero-bed-select');

    if (kw) state.searchKeyword = kw.value;
    if (city) state.activeCity = city.value;
    if (type) state.activeCategory = type.value;
    if (price) state.selectedPriceTier = price.value;
    if (beds) state.selectedBeds = beds.value;

    applyAllFilters();

    const propSec = document.getElementById('properties-section');
    if (propSec) {
      propSec.scrollIntoView({ behavior: 'smooth' });
    }
    triggerToast(`Refined to ${state.filteredProperties.length} luxury holdings.`);
  };

  window.applyQuickTag = function (tag) {
    const kw = document.getElementById('hero-keyword-input');
    if (kw) kw.value = tag;
    state.searchKeyword = tag;
    applyAllFilters();
    const propSec = document.getElementById('properties-section');
    if (propSec) propSec.scrollIntoView({ behavior: 'smooth' });
  };

  window.setQuickCategory = function (cat, el) {
    state.activeCategory = cat;
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    if (el) el.classList.add('active');
    applyAllFilters();
  };

  window.quickFilterPurpose = function (purpose) {
    state.activePurpose = purpose;
    document.querySelectorAll('.search-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-purpose') === purpose);
    });
    applyAllFilters();
    const propSec = document.getElementById('properties-section');
    if (propSec) propSec.scrollIntoView({ behavior: 'smooth' });
  };

  window.filterByCity = function (cityName) {
    state.activeCity = cityName;
    const citySelect = document.getElementById('hero-city-select');
    if (citySelect) citySelect.value = cityName;
    applyAllFilters();
    const propSec = document.getElementById('properties-section');
    if (propSec) propSec.scrollIntoView({ behavior: 'smooth' });
    triggerToast(`Viewing exclusive estates in ${cityName}.`);
  };

  window.handleSortChange = function (sortValue) {
    state.activeSort = sortValue;
    applyAllFilters();
  };

  window.setViewMode = function (mode) {
    state.viewMode = mode;
    const container = document.getElementById('property-grid-container');
    const gridBtn = document.getElementById('view-grid-btn');
    const listBtn = document.getElementById('view-list-btn');

    if (container) {
      container.classList.toggle('grid-view', mode === 'grid');
      container.classList.toggle('list-view', mode === 'list');
    }
    if (gridBtn) gridBtn.classList.toggle('active', mode === 'grid');
    if (listBtn) listBtn.classList.toggle('active', mode === 'list');
  };

  window.clearAllFilters = function () {
    state.activePurpose = 'All';
    state.activeCategory = 'All';
    state.activeCity = 'All';
    state.searchKeyword = '';
    state.selectedPriceTier = 'All';
    state.selectedBeds = 'All';
    state.filters = {
      maxPrice: 25000000,
      minArea: 1000,
      beds: 'All',
      baths: 'All',
      furnishing: 'All',
      amenities: []
    };

    // Reset UI fields
    const kw = document.getElementById('hero-keyword-input'); if (kw) kw.value = '';
    const city = document.getElementById('hero-city-select'); if (city) city.value = 'All';
    const type = document.getElementById('hero-type-select'); if (type) type.value = 'All';
    const price = document.getElementById('hero-price-select'); if (price) price.value = 'All';
    const beds = document.getElementById('hero-bed-select'); if (beds) beds.value = 'All';

    document.querySelectorAll('.search-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-purpose') === 'All'));
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-val') === 'All'));

    applyAllFilters();
    triggerToast('All search filters have been cleared.');
  };

  window.resetFiltersAndScrollTop = function (e) {
    if (e) e.preventDefault();
    window.clearAllFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.loadMoreProperties = function () {
    triggerToast('All available private holdings for this portfolio tier are currently loaded.');
  };

  window.focusSearchInput = function () {
    const kw = document.getElementById('hero-keyword-input');
    if (kw) {
      kw.focus();
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  // --------------------------------------------------------------------------
  // 11. FAVORITES & WISHLIST MANAGEMENT
  // --------------------------------------------------------------------------
  window.toggleFavorite = function (propId, e) {
    if (e) e.stopPropagation();

    const idx = state.favorites.indexOf(propId);
    if (idx > -1) {
      state.favorites.splice(idx, 1);
      triggerToast('Removed holding from your private watchlist.');
    } else {
      state.favorites.push(propId);
      triggerToast('Added estate to your private watchlist.', 'gold');
    }

    saveFavorites();
    renderProperties();
  };

  function updateFavoritesCountUI() {
    const badge = document.getElementById('favorites-count-badge');
    const mobCount = document.getElementById('mobile-fav-count');
    const drawerCount = document.getElementById('fav-drawer-count');
    const dashCount = document.getElementById('dash-fav-count');

    const count = state.favorites.length;
    if (badge) badge.textContent = count;
    if (mobCount) mobCount.textContent = count;
    if (drawerCount) drawerCount.textContent = `${count} Properties`;
    if (dashCount) dashCount.textContent = count;
  }

  function renderFavoritesDrawer() {
    const container = document.getElementById('favorites-drawer-body');
    if (!container) return;

    if (state.favorites.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card" style="padding: 2rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">❤️</div>
          <h4 style="font-family: var(--font-serif); font-size: 1.25rem;">Your Watchlist is Empty</h4>
          <p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 0.75rem 0 1.25rem;">Bookmark architectural holdings across our international portfolios to receive discreet price updates.</p>
          <button class="btn-premium-cta" onclick="window.closeFavoritesDrawer(); document.getElementById('properties-section').scrollIntoView({behavior:'smooth'})">Browse Portfolios</button>
        </div>
      `;
      return;
    }

    const favProps = state.properties.filter(p => state.favorites.includes(p.id));
    container.innerHTML = favProps.map(p => `
      <div class="fav-mini-card" onclick="window.closeFavoritesDrawer(); window.openPropertyDetails('${p.id}')">
        <div class="fav-mini-thumb" style="background-image: url('${p.images[0]}');"></div>
        <div class="fav-mini-info">
          <h5>${p.title}</h5>
          <p>${p.city} &bull; ${p.beds} Beds &bull; ${p.areaSqFt.toLocaleString()} sq ft</p>
          <strong>${formatPrice(p.priceUSD, p.purpose === 'Rent')}</strong>
        </div>
        <button class="fav-remove-btn" onclick="window.toggleFavorite('${p.id}', event)" title="Remove">&times;</button>
      </div>
    `).join('');
  }

  window.openFavoritesDrawer = function () {
    renderFavoritesDrawer();
    const drawer = document.getElementById('favorites-drawer');
    const backdrop = document.getElementById('favorites-backdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeFavoritesDrawer = function () {
    const drawer = document.getElementById('favorites-drawer');
    const backdrop = document.getElementById('favorites-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.quickInquireAllFavorites = function () {
    if (state.favorites.length === 0) {
      triggerToast('Please bookmark at least one estate first.');
      return;
    }
    openMessagesDrawer();
    sendQuickMessage(`I would like an aggregated investment dossier for my ${state.favorites.length} bookmarked properties.`);
  };

  // --------------------------------------------------------------------------
  // 12. INTERACTIVE PROPERTY DETAILS MODAL
  // --------------------------------------------------------------------------
  window.openPropertyDetails = function (propId) {
    const prop = state.properties.find(p => p.id === propId);
    if (!prop) return;

    const modal = document.getElementById('property-details-modal');
    const backdrop = document.getElementById('property-modal-backdrop');
    const content = document.getElementById('modal-prop-content');

    if (!modal || !content) return;

    const isRent = prop.purpose === 'Rent';
    const formattedPrice = formatPrice(prop.priceUSD, isRent);
    const sqftPrice = (prop.areaSqFt && prop.areaSqFt > 0) ? Math.round(prop.priceUSD / prop.areaSqFt) : 0;
    const isUserListing = !!prop.isUserCreated;

    const propImages = (prop.images && prop.images.length > 0) ? prop.images : [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=75'
    ];
    state.lightbox.images = propImages;
    state.lightbox.currentIndex = 0;
    state.lightbox.caption = `${prop.title} — ${prop.city}`;

    // Estimated monthly mortgage (20% down, 30 years @ 6.5%)
    const principal = prop.priceUSD * 0.8;
    const monthlyRate = 0.065 / 12;
    const numPayments = 360;
    const estMortgage = Math.round(principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1));

    const agentObj = prop.agent || {
      name: 'Elysian Private Advisor',
      role: 'Sovereign Real Estate Broker',
      phone: '+92 300 1234567',
      whatsapp: '+92 300 1234567',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };

    const phoneStr = agentObj.phone || '+92 300 1234567';
    const rawWa = agentObj.whatsapp || phoneStr;
    const cleanWa = rawWa.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(`Hello ${agentObj.name}, I am inquiring regarding the property "${prop.title}" (${prop.city}) listed on Elysian Luxury Estates.`);

    const floorPlans = (prop.floorPlans && prop.floorPlans.length > 0) ? prop.floorPlans : [
      { level: 'Master Architecture Plan', area: `${(prop.areaSqFt || 0).toLocaleString()} sq ft`, label: 'Comprehensive Structural Layout & Spatial Dimension' }
    ];
    const amenities = (prop.amenities && prop.amenities.length > 0) ? prop.amenities : ['Security & CCTV', 'VRF Air Conditioning', 'Modern Finishing', 'Car Parking'];

    content.innerHTML = `
      <div class="prop-details-grid">
        <!-- Left Main Dossier -->
        <div class="prop-main-column">
          <!-- Gallery with Lightbox -->
          <div class="modal-gallery-wrap">
            <div class="modal-main-image-wrap">
              <img src="${propImages[0]}" alt="${prop.title}" class="modal-main-img" id="details-featured-img" onclick="window.openLightbox(0)">
              <button class="btn-open-lightbox" onclick="window.openLightbox(0)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
                <span>View Fullscreen Gallery (${propImages.length})</span>
              </button>
            </div>
            <div class="modal-thumbnails-strip">
              ${propImages.map((img, i) => `
                <img src="${img}" alt="Thumbnail ${i + 1}" class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="window.switchModalImage('${img}', this, ${i})">
              `).join('')}
            </div>
          </div>

          <!-- Metadata & Title -->
          <div class="details-meta-header">
            <div class="details-badges-row">
              <span class="gold-crest-badge">⚜ ${prop.type.toUpperCase()}</span>
              <span class="badge-purpose" style="background: rgba(20, 184, 166, 0.2); color: var(--accent-teal); border: 1px solid var(--border-teal); padding: 2px 8px; border-radius: 4px; font-weight: 600;">${prop.purpose === 'Sale' ? 'FOR SALE' : 'FOR RENT'}</span>
              ${prop.verified ? '<span class="badge-verified">✓ CD/RERA VERIFIED</span>' : ''}
              ${isUserListing ? '<span class="owner-detail-badge">★ YOUR LISTING</span>' : ''}
            </div>
            <h1 class="details-title" id="modal-prop-title">${prop.title}</h1>
            <div class="details-loc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${prop.city} &bull; ${prop.location ? `${prop.location}, ` : ''}${prop.address}</span>
            </div>
          </div>

          <!-- Key Metrics Grid -->
          <div class="key-specs-cards-grid">
            <div class="key-spec-box">
              <span>Bedrooms</span>
              <strong>${prop.beds > 0 ? `${prop.beds} Suites` : `${prop.type}`}</strong>
            </div>
            <div class="key-spec-box">
              <span>Bathrooms</span>
              <strong>${prop.baths > 0 ? `${prop.baths} Bathrooms` : 'N/A'}</strong>
            </div>
            <div class="key-spec-box">
              <span>Interior Space</span>
              <strong>${(prop.areaSqFt || 0).toLocaleString()} sq ft</strong>
            </div>
            <div class="key-spec-box">
              <span>Property Class</span>
              <strong>${prop.type}</strong>
            </div>
          </div>

          <!-- Narrative Section -->
          <div class="details-section-block">
            <h3 class="details-block-heading">Architectural Overview</h3>
            <p class="prop-narrative-text">${prop.description || 'Commanding a premier location, this bespoke residence features meticulous design, expansive spaces, and world-class craftsmanship.'}</p>
          </div>

          <!-- Floor Plans Viewer -->
          <div class="details-section-block">
            <h3 class="details-block-heading">Architectural Floor Plans</h3>
            <div class="floor-plan-card">
              <div class="floor-plan-tabs">
                ${floorPlans.map((fp, idx) => `
                  <button class="floor-tab-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchFloorPlan(${idx}, this)">${fp.level}</button>
                `).join('')}
              </div>
              <div class="floor-plan-schematic" id="floor-plan-display">
                <svg class="floor-plan-svg" viewBox="0 0 500 280">
                  <rect x="20" y="20" width="460" height="240" fill="none" stroke="rgba(20, 184, 166, 0.4)" stroke-width="2"></rect>
                  <rect x="30" y="30" width="220" height="140" fill="rgba(20, 184, 166, 0.05)" stroke="rgba(255,255,255,0.1)"></rect>
                  <text x="140" y="105" fill="#14B8A6" font-size="12" font-family="monospace" text-anchor="middle">PRIMARY SUITE</text>
                  <rect x="260" y="30" width="210" height="140" fill="rgba(212, 175, 55, 0.05)" stroke="rgba(255,255,255,0.1)"></rect>
                  <text x="365" y="105" fill="#D4AF37" font-size="12" font-family="monospace" text-anchor="middle">GRAND SALON</text>
                  <rect x="30" y="180" width="440" height="70" fill="none" stroke="rgba(255,255,255,0.1)" stroke-dasharray="4,4"></rect>
                  <text x="250" y="220" fill="#94A3B8" font-size="12" font-family="monospace" text-anchor="middle">CANTILEVERED TERRACE & LIVING WATER</text>
                </svg>
              </div>
              <p id="floor-plan-desc" style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.75rem;">
                ${floorPlans[0].label} (${floorPlans[0].area})
              </p>
            </div>
          </div>

          <!-- Amenities Grid -->
          <div class="details-section-block">
            <h3 class="details-block-heading">Features & Rare Amenities</h3>
            <div class="amenities-pill-grid">
              ${amenities.map(a => `
                <div class="amenity-chip">
                  <span style="color: var(--accent-teal);">✓</span>
                  <span>${a}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Sticky Action Column -->
        <aside class="prop-sidebar-sticky">
          <!-- Pricing & Direct Action Card -->
          <div class="details-pricing-card">
            <div class="details-price-badge">VALUATION & ASSET STATUS</div>
            <div class="details-price-val">${formattedPrice}</div>
            <div class="details-sqft-price">≈ $${sqftPrice.toLocaleString()} / sq ft &bull; Verified Title</div>

            <div class="details-actions-stack">
              <!-- Direct WhatsApp Button -->
              <a href="https://wa.me/${cleanWa}?text=${waText}" target="_blank" class="btn-whatsapp full-width">
                <span>💬 Contact on WhatsApp</span>
              </a>

              <!-- Direct Call Button -->
              <a href="tel:${phoneStr}" class="btn-glass full-width btn-owner-call" style="text-decoration:none;">
                <span>📞 Direct Call: ${phoneStr}</span>
              </a>

              <!-- Schedule Private Viewing -->
              <button class="btn-premium-cta full-width" onclick="window.openViewingModal('${prop.id}')">
                <span>Schedule Private Viewing</span>
              </button>

              <button class="btn-glass full-width" onclick="window.openShareModal('${prop.id}')">
                <span>Share Private Dossier</span>
              </button>

              <!-- Owner / Admin Edit & Delete Actions -->
              ${isUserListing ? `
                <div class="owner-mgmt-box">
                  <button class="btn-glass full-width" onclick="window.closePropertyModal(); window.editProperty('${prop.id}')">
                    <span>✏️ Edit Property Listing</span>
                  </button>
                  <button class="btn-glass full-width" style="color: var(--accent-red); border-color: rgba(239, 68, 68, 0.35);" onclick="window.closePropertyModal(); window.confirmDeleteProperty('${prop.id}')">
                    <span>🗑️ Delete Property</span>
                  </button>
                </div>
              ` : ''}
            </div>

            <!-- Agent / Owner Profile Card -->
            <div class="agent-profile-mini-box">
              <div class="agent-box-avatar" style="background-image: url('${agentObj.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}');"></div>
              <div class="agent-box-info">
                <h5>${agentObj.name}</h5>
                <p>${agentObj.role}</p>
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem;">${phoneStr}</div>
              </div>
            </div>
          </div>

          <!-- Interactive Mortgage Calculator -->
          <div class="mortgage-calc-box">
            <h4 class="calc-title">Estimated Financing Breakdown</h4>
            <div class="calc-row">
              <div class="calc-label-split">
                <span>Down Payment (20%)</span>
                <strong>${formatPrice(prop.priceUSD * 0.2)}</strong>
              </div>
            </div>
            <div class="calc-row">
              <div class="calc-label-split">
                <span>Loan Term</span>
                <strong>30 Years Fixed</strong>
              </div>
            </div>
            <div class="calc-row">
              <div class="calc-label-split">
                <span>Benchmark Interest</span>
                <strong>6.5% APR</strong>
              </div>
            </div>

            <div class="calc-result-box">
              <span>Estimated Monthly Repayment</span>
              <strong>${formatPrice(estMortgage)} / mo</strong>
            </div>
          </div>
        </aside>
      </div>
    `;

    modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closePropertyModal = function () {
    const modal = document.getElementById('property-details-modal');
    const backdrop = document.getElementById('property-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.switchModalImage = function (url, thumbEl, index) {
    const mainImg = document.getElementById('details-featured-img');
    if (mainImg) mainImg.src = url;
    document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
    state.lightbox.currentIndex = index;
  };

  window.switchFloorPlan = function (idx, el) {
    document.querySelectorAll('.floor-tab-btn').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');
    // Simple visual highlight
    const desc = document.getElementById('floor-plan-desc');
    if (desc) desc.textContent = `Level ${idx + 1} Schematic Blueprint Verified. Custom high-res structural CAD drawing available upon NDA execution.`;
  };

  // --------------------------------------------------------------------------
  // 13. FULLSCREEN LIGHTBOX GALLERY
  // --------------------------------------------------------------------------
  window.openLightbox = function (index = 0) {
    state.lightbox.currentIndex = index;
    const overlay = document.getElementById('lightbox-overlay');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    const count = document.getElementById('lightbox-counter');

    if (!overlay || !img) return;

    img.src = state.lightbox.images[index];
    if (cap) cap.textContent = state.lightbox.caption;
    if (count) count.textContent = `${index + 1} / ${state.lightbox.images.length}`;

    overlay.classList.add('open');
  };

  window.closeLightbox = function () {
    const overlay = document.getElementById('lightbox-overlay');
    if (overlay) overlay.classList.remove('open');
  };

  window.navigateLightbox = function (direction) {
    let nextIndex = state.lightbox.currentIndex + direction;
    const total = state.lightbox.images.length;
    if (nextIndex < 0) nextIndex = total - 1;
    if (nextIndex >= total) nextIndex = 0;

    state.lightbox.currentIndex = nextIndex;
    const img = document.getElementById('lightbox-img');
    const count = document.getElementById('lightbox-counter');

    if (img) img.src = state.lightbox.images[nextIndex];
    if (count) count.textContent = `${nextIndex + 1} / ${total}`;
  };

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('lightbox-overlay');
    if (overlay && overlay.classList.contains('open')) {
      if (e.key === 'Escape') window.closeLightbox();
      if (e.key === 'ArrowLeft') window.navigateLightbox(-1);
      if (e.key === 'ArrowRight') window.navigateLightbox(1);
    }
  });

  // --------------------------------------------------------------------------
  // 14. ADVANCED FILTER DRAWER LOGIC
  // --------------------------------------------------------------------------
  window.openAdvancedFilterDrawer = function () {
    const drawer = document.getElementById('advanced-filter-drawer');
    const backdrop = document.getElementById('filter-drawer-backdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeAdvancedFilterDrawer = function () {
    const drawer = document.getElementById('advanced-filter-drawer');
    const backdrop = document.getElementById('filter-drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.setDrawerFilter = function (key, val, el) {
    if (key === 'purpose') state.activePurpose = val;
    if (key === 'type') state.activeCategory = val;
    if (key === 'city') state.activeCity = val;
    if (key === 'beds') state.selectedBeds = val;
    if (key === 'baths') state.filters.baths = val;
    if (key === 'furnishing') state.filters.furnishing = val;

    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.drawer-pill-opt').forEach(p => p.classList.remove('active'));
      el.classList.add('active');
    }
  };

  window.handlePriceSlider = function (val) {
    state.filters.maxPrice = parseInt(val, 10);
    const disp = document.getElementById('drawer-price-display');
    if (disp) {
      if (state.filters.maxPrice >= 25000000) {
        disp.textContent = '$25,000,000+';
      } else {
        disp.textContent = `$${(state.filters.maxPrice / 1000000).toFixed(2)}M`;
      }
    }
  };

  window.handleAreaSlider = function (val) {
    state.filters.minArea = parseInt(val, 10);
    const disp = document.getElementById('drawer-area-display');
    if (disp) {
      disp.textContent = `${state.filters.minArea.toLocaleString()} sq ft`;
    }
  };

  window.toggleAmenityFilter = function (amenityName) {
    const idx = state.filters.amenities.indexOf(amenityName);
    if (idx > -1) {
      state.filters.amenities.splice(idx, 1);
    } else {
      state.filters.amenities.push(amenityName);
    }
  };

  window.applyAdvancedFilters = function () {
    applyAllFilters();
    closeAdvancedFilterDrawer();
    const propSec = document.getElementById('properties-section');
    if (propSec) propSec.scrollIntoView({ behavior: 'smooth' });
    triggerToast(`Filters calibrated: ${state.filteredProperties.length} holdings matched.`);
  };

  window.resetAdvancedFilters = function () {
    state.filters = {
      maxPrice: 25000000,
      minArea: 1000,
      beds: 'All',
      baths: 'All',
      furnishing: 'All',
      amenities: []
    };
    const priceSlider = document.getElementById('drawer-max-price-slider'); if (priceSlider) priceSlider.value = 25000000;
    const priceDisp = document.getElementById('drawer-price-display'); if (priceDisp) priceDisp.textContent = '$25,000,000+';
    const areaSlider = document.getElementById('drawer-area-slider'); if (areaSlider) areaSlider.value = 1000;
    const areaDisp = document.getElementById('drawer-area-display'); if (areaDisp) areaDisp.textContent = 'Any Area';

    document.querySelectorAll('#advanced-filter-drawer .drawer-pill-opt').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-val') === 'All');
    });

    document.querySelectorAll('#amenities-checkboxes input').forEach(cb => cb.checked = false);
    applyAllFilters();
    triggerToast('Advanced filter criteria reset.');
  };

  // --------------------------------------------------------------------------
  // 15. SCHEDULE A VIEWING MODAL LOGIC
  // --------------------------------------------------------------------------
  let selectedViewingProperty = null;

  window.openViewingModal = function (propId) {
    const prop = state.properties.find(p => p.id === propId) || state.properties[0];
    selectedViewingProperty = prop;

    const banner = document.getElementById('viewing-property-banner');
    if (banner) {
      banner.innerHTML = `<strong>${prop.title}</strong> &bull; ${prop.city} &bull; ${formatPrice(prop.priceUSD, prop.purpose === 'Rent')}`;
    }

    // Default tomorrow's date
    const dateInput = document.getElementById('viewing-date');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    const modal = document.getElementById('viewing-modal');
    const backdrop = document.getElementById('viewing-modal-backdrop');
    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeViewingModal = function () {
    const modal = document.getElementById('viewing-modal');
    const backdrop = document.getElementById('viewing-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.setTourType = function (tourType, el) {
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.drawer-pill-opt').forEach(p => p.classList.remove('active'));
      el.classList.add('active');
      el.setAttribute('data-selected-tour', tourType);
    }
  };

  window.handleViewingSubmit = function (e) {
    e.preventDefault();
    const date = document.getElementById('viewing-date').value;
    const time = document.getElementById('viewing-time').value;
    const name = document.getElementById('viewing-name').value;
    const phone = document.getElementById('viewing-phone').value;
    const email = document.getElementById('viewing-email').value;

    const activeTypeBtn = document.querySelector('[data-tour-type].active');
    const tourType = activeTypeBtn ? activeTypeBtn.getAttribute('data-tour-type') : 'In-Person';

    const prop = selectedViewingProperty || state.properties[0];

    const newViewing = {
      id: `viewing-${Date.now()}`,
      propertyTitle: prop.title,
      location: prop.address,
      date: date,
      time: time,
      tourType: tourType,
      agentName: prop.agent.name,
      status: 'Confirmed'
    };

    state.scheduledViewings.unshift(newViewing);
    saveScheduledViewings();

    closeViewingModal();
    triggerToast(`Private tour reserved for ${date} with ${prop.agent.name}.`, 'gold');
  };

  // --------------------------------------------------------------------------
  // 16. COMPLETE ADD / EDIT / DELETE PROPERTY SYSTEM
  // --------------------------------------------------------------------------

  // Helper: Canvas Image Compression into DataURL (scale to max 1280px, quality 0.78)
  function compressAndLoadImage(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Invalid image file'));
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const maxDim = 1280;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to parse image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  // Handle Multi-file Selection from Device
  window.handlePropertyImageFiles = async function (e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const loader = document.getElementById('image-upload-loading');
    if (loader) loader.style.display = 'flex';

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const compressedDataUrl = await compressAndLoadImage(file);
          state.addPropertyModal.images.push(compressedDataUrl);
        }
      }
      renderPropertyFormThumbnails();
      triggerToast(`${files.length} photo(s) optimized and ready.`);
    } catch (err) {
      console.error('Image compression error:', err);
      triggerToast('Error loading some images. Please try JPG/PNG formats.');
    } finally {
      if (loader) loader.style.display = 'none';
      e.target.value = '';
    }
  };

  // Add Custom Image URL
  window.addPropertyImageUrl = function () {
    const input = document.getElementById('prop-image-url-input');
    if (!input) return;
    const url = input.value.trim();
    if (!url) {
      triggerToast('Please paste a valid web image URL (https://...)');
      return;
    }
    state.addPropertyModal.images.push(url);
    input.value = '';
    renderPropertyFormThumbnails();
    triggerToast('Custom photography URL linked.');
  };

  // Add Preset Luxury Image
  window.addPropertyPresetImage = function (url) {
    state.addPropertyModal.images.push(url);
    renderPropertyFormThumbnails();
    triggerToast('Preset image added to gallery.');
  };

  // Remove Image by Index
  window.removePropertyFormImage = function (index) {
    state.addPropertyModal.images.splice(index, 1);
    renderPropertyFormThumbnails();
  };

  // Render Thumbnails with Badges and Delete button
  function renderPropertyFormThumbnails() {
    const container = document.getElementById('prop-image-previews-container');
    const countEl = document.getElementById('previews-count-text');
    if (!container) return;

    const count = state.addPropertyModal.images.length;
    if (countEl) {
      countEl.textContent = `${count} Image${count === 1 ? '' : 's'} Uploaded`;
      countEl.style.color = count > 0 ? 'var(--accent-teal)' : 'var(--accent-red)';
    }

    if (count === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--text-tertiary); font-size: 0.8125rem; border: 1px dashed var(--border-subtle); border-radius: var(--radius-sm);">
          No property photos uploaded yet. At least 1 image is required.
        </div>
      `;
      return;
    }

    container.innerHTML = state.addPropertyModal.images.map((img, idx) => `
      <div class="preview-thumb-box">
        <img src="${img}" alt="Property Preview ${idx + 1}" onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'">
        ${idx === 0 ? '<span class="preview-primary-badge">★ Main Cover</span>' : ''}
        <button type="button" class="preview-thumb-del" onclick="window.removePropertyFormImage(${idx})" title="Remove photo">&times;</button>
      </div>
    `).join('');
  }

  // Open Modal (Add Mode or Edit Mode)
  window.openAddPropertyModal = function (editId = null) {
    const modal = document.getElementById('add-property-modal');
    const backdrop = document.getElementById('add-property-modal-backdrop');
    const titleEl = document.getElementById('add-prop-modal-title');
    const badgeEl = document.getElementById('add-prop-header-badge');
    const submitText = document.getElementById('add-prop-submit-text');
    const errBanner = document.getElementById('prop-form-error-banner');
    const form = document.getElementById('add-property-form');

    if (errBanner) errBanner.style.display = 'none';

    if (editId) {
      // EDIT MODE
      const existing = state.properties.find(p => p.id === editId);
      if (!existing) {
        triggerToast('Property could not be located.');
        return;
      }
      state.addPropertyModal.editId = editId;
      state.addPropertyModal.images = existing.images && existing.images.length > 0 ? [...existing.images] : [];

      if (titleEl) titleEl.textContent = 'Edit Property Listing';
      if (badgeEl) badgeEl.textContent = '⚜ UPDATE REGISTERED HOLDING ⚜';
      if (submitText) submitText.textContent = 'Update Property / Save Changes';

      document.getElementById('prop-edit-id').value = existing.id;
      document.getElementById('prop-title').value = existing.title || '';
      document.getElementById('prop-type').value = existing.type || 'House';
      document.getElementById('prop-purpose').value = existing.purpose || 'Sale';
      document.getElementById('prop-price').value = existing.priceUSD || '';
      document.getElementById('prop-city').value = existing.city || 'Islamabad';
      document.getElementById('prop-location').value = existing.location || (existing.address ? existing.address.split(',')[0] : '');
      document.getElementById('prop-address').value = existing.address || '';
      document.getElementById('prop-beds').value = existing.beds !== undefined ? existing.beds : 4;
      document.getElementById('prop-baths').value = existing.baths !== undefined ? existing.baths : 4;
      document.getElementById('prop-size').value = existing.areaSqFt || '';
      document.getElementById('prop-desc').value = existing.description || '';

      const agent = existing.agent || {};
      document.getElementById('prop-owner-name').value = agent.name || 'Malik Asfandyar';
      document.getElementById('prop-contact-phone').value = agent.phone || '+92 300 1234567';
      document.getElementById('prop-whatsapp-number').value = agent.whatsapp || agent.phone || '+92 300 1234567';
    } else {
      // ADD MODE
      state.addPropertyModal.editId = null;
      state.addPropertyModal.images = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=75'
      ];

      if (titleEl) titleEl.textContent = 'Add Property / Add Home';
      if (badgeEl) badgeEl.textContent = '⚜ PRIVATE PROPERTY REGISTRATION ⚜';
      if (submitText) submitText.textContent = 'Add Property / Publish Property';

      if (form) form.reset();
      document.getElementById('prop-edit-id').value = '';
      document.getElementById('prop-purpose').value = 'Sale';
      document.getElementById('prop-type').value = 'House';
      document.getElementById('prop-city').value = 'Islamabad';
      document.getElementById('prop-beds').value = 4;
      document.getElementById('prop-baths').value = 4;
      document.getElementById('prop-owner-name').value = 'Malik Asfandyar';
      document.getElementById('prop-contact-phone').value = '+92 300 1234567';
      document.getElementById('prop-whatsapp-number').value = '+92 300 1234567';
    }

    renderPropertyFormThumbnails();

    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeAddPropertyModal = function () {
    const modal = document.getElementById('add-property-modal');
    const backdrop = document.getElementById('add-property-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Backward-compatibility aliases
  window.openListPropertyWizard = function () {
    window.openAddPropertyModal();
  };
  window.closeListPropertyWizard = function () {
    window.closeAddPropertyModal();
  };

  // Save / Submit Form
  window.savePropertyForm = function (e) {
    if (e && e.preventDefault) e.preventDefault();

    const errBanner = document.getElementById('prop-form-error-banner');
    const errText = document.getElementById('prop-form-error-text');
    const submitBtn = document.getElementById('add-prop-submit-btn');

    function showError(msg) {
      if (errBanner && errText) {
        errText.textContent = msg;
        errBanner.style.display = 'flex';
        errBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      triggerToast(msg);
    }

    if (errBanner) errBanner.style.display = 'none';

    // 1. Validate Form Fields
    const title = document.getElementById('prop-title').value.trim();
    const type = document.getElementById('prop-type').value;
    const purpose = document.getElementById('prop-purpose').value;
    const priceVal = document.getElementById('prop-price').value.trim();
    const price = parseInt(priceVal, 10);
    const city = document.getElementById('prop-city').value;
    const location = document.getElementById('prop-location').value.trim();
    const address = document.getElementById('prop-address').value.trim();
    const beds = parseInt(document.getElementById('prop-beds').value || '0', 10);
    const baths = parseInt(document.getElementById('prop-baths').value || '0', 10);
    const sizeVal = document.getElementById('prop-size').value.trim();
    const size = parseInt(sizeVal, 10);
    const desc = document.getElementById('prop-desc').value.trim();
    const ownerName = document.getElementById('prop-owner-name').value.trim();
    const contactPhone = document.getElementById('prop-contact-phone').value.trim();
    const whatsappNum = document.getElementById('prop-whatsapp-number').value.trim();

    if (!title) return showError('Please provide a descriptive Property Title.');
    if (!priceVal || isNaN(price) || price <= 0) return showError('Please enter a valid positive Asking Price.');
    if (!location) return showError('Please specify the Location / Area (e.g. Sector F-7, DHA Phase 6).');
    if (!address) return showError('Please specify the Full Street / Plot Address.');
    if (!sizeVal || isNaN(size) || size <= 0) return showError('Please enter a valid Property Size in square feet.');
    if (!desc) return showError('Please provide a short Property Description.');
    if (!ownerName) return showError('Please specify Owner / Agent Name.');
    if (!contactPhone) return showError('Please provide Contact Phone Number.');
    if (!whatsappNum) return showError('Please provide WhatsApp Number.');

    // 2. Validate Images (at least 1 required)
    if (!state.addPropertyModal.images || state.addPropertyModal.images.length === 0) {
      return showError('At least 1 Property Image is required. Please upload or choose a photo.');
    }

    // Set Loading state on submit button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
    }

    const editId = document.getElementById('prop-edit-id').value;
    const isEdit = !!editId;

    try {
      const propertyData = {
        id: isEdit ? editId : `prop-user-${Date.now()}`,
        title,
        priceUSD: price,
        purpose,
        city,
        location,
        address,
        type,
        beds,
        baths,
        areaSqFt: size,
        parking: Math.max(1, Math.round(beds / 2)),
        yearBuilt: new Date().getFullYear(),
        furnishing: 'Fully Furnished',
        featured: true,
        exclusive: false,
        verified: true,
        rating: 5.0,
        isUserCreated: true,
        agent: {
          id: `agent-user-${Date.now()}`,
          name: ownerName,
          role: 'Property Owner / Verified Seller',
          phone: contactPhone,
          whatsapp: whatsappNum,
          email: 'client@elysian-estates.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=70',
          deals: 'Direct Owner Listing'
        },
        images: [...state.addPropertyModal.images],
        description: desc,
        amenities: ['Security & CCTV', 'VRF Air Conditioning', 'Modern Finishing', 'Dedicated Parking'],
        floorPlans: [
          { level: 'Master Architecture Plan', area: `${size.toLocaleString()} sq ft`, label: 'Full Structural & Interior Layout' }
        ]
      };

      if (isEdit) {
        // Update in state.myListings
        const idx = state.myListings.findIndex(p => p.id === editId);
        if (idx !== -1) {
          state.myListings[idx] = propertyData;
        } else {
          state.myListings.unshift(propertyData);
        }
        triggerToast(`Listing "${title}" updated successfully.`, 'gold');
      } else {
        // Add new listing at front of list
        state.myListings.unshift(propertyData);
        triggerToast(`Property "${title}" published and added to marketplace!`, 'gold');
      }

      // Persist to localStorage and re-sync
      saveMyListings();

      // Close form modal immediately
      closeAddPropertyModal();

      // Scroll to property catalog and highlight newly added property
      const catalogSec = document.getElementById('properties-section');
      if (catalogSec) {
        catalogSec.scrollIntoView({ behavior: 'smooth' });
      }

      requestAnimationFrame(() => {
        const card = document.querySelector(`.property-card[data-id="${propertyData.id}"]`);
        if (card) {
          card.classList.add('card-new-pulse');
        }
      });

    } catch (err) {
      console.error('Error saving property:', err);
      showError('Could not save property: Storage quota may be exceeded or invalid input.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    }
  };

  // Edit Property Trigger
  window.editProperty = function (propId) {
    window.openAddPropertyModal(propId);
  };

  // Delete Confirmation Workflow
  window.confirmDeleteProperty = function (propId) {
    const prop = state.properties.find(p => p.id === propId);
    if (!prop) {
      triggerToast('Property not found.');
      return;
    }
    state.deleteTargetId = propId;

    const modal = document.getElementById('delete-confirm-modal');
    const backdrop = document.getElementById('delete-confirm-backdrop');
    const previewContainer = document.getElementById('delete-target-preview');

    if (previewContainer) {
      previewContainer.innerHTML = `
        <div class="delete-thumb-mini" style="background-image: url('${prop.images[0]}');"></div>
        <div class="delete-info-mini">
          <h5>${prop.title}</h5>
          <p>${prop.city} &bull; ${prop.type} &bull; ${formatPrice(prop.priceUSD, prop.purpose === 'Rent')}</p>
        </div>
      `;
    }

    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeDeleteConfirmModal = function () {
    const modal = document.getElementById('delete-confirm-modal');
    const backdrop = document.getElementById('delete-confirm-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    state.deleteTargetId = null;
  };

  window.executeDeleteProperty = function () {
    const id = state.deleteTargetId;
    if (!id) return;

    // Filter out from myListings
    state.myListings = state.myListings.filter(p => p.id !== id);

    // Also remove from favorites if saved
    state.favorites = state.favorites.filter(favId => favId !== id);
    localStorage.setItem('elysian_favorites', JSON.stringify(state.favorites));

    // Save and re-render
    saveMyListings();
    renderFavoritesDrawer();
    renderDashboardListings();
    updateFavoritesCountUI();

    closeDeleteConfirmModal();
    window.closePropertyModal();
    triggerToast('Property deleted successfully.', 'gold');
  };

  window.deleteUserListing = function (id) {
    window.confirmDeleteProperty(id);
  };

  // --------------------------------------------------------------------------
  // 17. USER DASHBOARD PORTAL
  // --------------------------------------------------------------------------
  window.openDashboardModal = function (tab = 'overview') {
    renderDashboard();
    switchDashTab(tab);
    const modal = document.getElementById('dashboard-modal');
    const backdrop = document.getElementById('dashboard-modal-backdrop');
    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeDashboardModal = function () {
    const modal = document.getElementById('dashboard-modal');
    const backdrop = document.getElementById('dashboard-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.switchDashTab = function (tabName, el) {
    document.querySelectorAll('.dash-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabName);
    });

    document.querySelectorAll('.dash-pane').forEach(p => {
      p.classList.toggle('active', p.id === `dash-pane-${tabName}`);
    });
  };

  function updateDashboardKpis() {
    const kpiSaved = document.getElementById('dash-kpi-saved');
    const kpiListings = document.getElementById('dash-kpi-listings');
    const kpiViewings = document.getElementById('dash-kpi-viewings');
    const listCount = document.getElementById('dash-listings-count');
    const viewCount = document.getElementById('dash-viewings-count');

    if (kpiSaved) kpiSaved.textContent = state.favorites.length;
    if (kpiListings) kpiListings.textContent = state.myListings.length;
    if (kpiViewings) kpiViewings.textContent = state.scheduledViewings.length;
    if (listCount) listCount.textContent = state.myListings.length;
    if (viewCount) viewCount.textContent = state.scheduledViewings.length;
  }

  function renderDashboard() {
    updateDashboardKpis();
    renderDashboardFavorites();
    renderDashboardListings();
    renderDashboardViewings();
    renderDashboardInquiries();
  }

  function renderDashboardFavorites() {
    const container = document.getElementById('dash-favorites-grid');
    if (!container) return;

    const favProps = state.properties.filter(p => state.favorites.includes(p.id));
    if (favProps.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <p>No saved properties in your watchlist yet.</p>
          <button class="btn-premium-cta" onclick="window.closeDashboardModal(); document.getElementById('properties-section').scrollIntoView({behavior:'smooth'})">Explore Portfolios</button>
        </div>
      `;
      return;
    }

    container.innerHTML = favProps.map(p => `
      <div class="fav-mini-card" style="margin-bottom: 0.75rem;">
        <div class="fav-mini-thumb" style="background-image: url('${p.images[0]}');"></div>
        <div class="fav-mini-info">
          <h5>${p.title}</h5>
          <p>${p.city} &bull; ${p.beds} Beds &bull; ${p.areaSqFt.toLocaleString()} sq ft</p>
          <strong>${formatPrice(p.priceUSD, p.purpose === 'Rent')}</strong>
        </div>
        <div style="margin-left: auto; display: flex; gap: 0.5rem;">
          <button class="btn-glass-small" onclick="window.closeDashboardModal(); window.openPropertyDetails('${p.id}')">View</button>
          <button class="btn-glass-small" onclick="window.toggleFavorite('${p.id}', event)">Remove</button>
        </div>
      </div>
    `).join('');
  }

  function renderDashboardListings() {
    const container = document.getElementById('dash-listings-grid');
    if (!container) return;

    if (state.myListings.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏛️</div>
          <h4>You Have No Active Property Listings</h4>
          <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1.25rem;">Present your property to verified local and international buyers using our comprehensive listing portal.</p>
          <button class="btn-premium-cta" onclick="window.closeDashboardModal(); window.openAddPropertyModal();">+ Add Property</button>
        </div>
      `;
      return;
    }

    container.innerHTML = state.myListings.map(p => `
      <div class="fav-mini-card" style="margin-bottom: 0.75rem;">
        <div class="fav-mini-thumb" style="background-image: url('${p.images[0]}');"></div>
        <div class="fav-mini-info">
          <h5>${p.title}</h5>
          <p>${p.city} &bull; ${p.type} &bull; ${(p.areaSqFt || 0).toLocaleString()} sq ft</p>
          <strong>${formatPrice(p.priceUSD, p.purpose === 'Rent')}</strong>
        </div>
        <div style="margin-left: auto; display: flex; gap: 0.5rem;">
          <button class="btn-glass-small" onclick="window.closeDashboardModal(); window.openPropertyDetails('${p.id}')">View</button>
          <button class="btn-glass-small" onclick="window.closeDashboardModal(); window.editProperty('${p.id}')">Edit</button>
          <button class="btn-glass-small" style="color: var(--accent-red);" onclick="window.confirmDeleteProperty('${p.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }

  function renderDashboardViewings() {
    const container = document.getElementById('dash-viewings-list');
    if (!container) return;

    if (state.scheduledViewings.length === 0) {
      container.innerHTML = '<p class="text-secondary">No upcoming private viewings scheduled.</p>';
      return;
    }

    container.innerHTML = state.scheduledViewings.map(v => `
      <div class="viewing-ticket" style="margin-bottom: 0.75rem;">
        <div class="ticket-status-badge confirmed">${v.status.toUpperCase()}</div>
        <div class="ticket-info" style="flex-grow: 1;">
          <h5>${v.propertyTitle} &bull; ${v.location}</h5>
          <p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 0.2rem 0;">Date: <strong>${v.date}</strong> at <strong>${v.time}</strong> &bull; Format: <strong>${v.tourType}</strong></p>
          <p style="font-size: 0.75rem; color: var(--accent-teal);">Assigned Senior Broker: ${v.agentName}</p>
        </div>
        <button class="btn-glass-small" style="color: var(--accent-red);" onclick="window.cancelViewing('${v.id}')">Cancel</button>
      </div>
    `).join('');
  }

  window.cancelViewing = function (id) {
    state.scheduledViewings = state.scheduledViewings.filter(v => v.id !== id);
    saveScheduledViewings();
    renderDashboardViewings();
    triggerToast('Viewing appointment cancelled.');
  };

  function renderDashboardInquiries() {
    const container = document.getElementById('dash-inquiries-list');
    if (!container) return;

    container.innerHTML = `
      <div class="fav-mini-card" style="margin-bottom: 0.75rem; cursor: pointer;" onclick="window.closeDashboardModal(); window.openMessagesDrawer('agent-2', 'prop-isl-01');">
        <div class="fav-mini-thumb" style="background-image: url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80');"></div>
        <div class="fav-mini-info">
          <h5>Tariq Al-Mansoor (Senior Partner)</h5>
          <p>Regarding: The Margalla Ridge Sanctuary &bull; <em>"The deed audit has been confirmed with CDA registries."</em></p>
        </div>
        <span class="ticket-status-badge confirmed">ACTIVE</span>
      </div>
      <div class="fav-mini-card" style="margin-bottom: 0.75rem; cursor: pointer;" onclick="window.closeDashboardModal(); window.openMessagesDrawer('agent-1', 'prop-dub-01');">
        <div class="fav-mini-thumb" style="background-image: url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80');"></div>
        <div class="fav-mini-info">
          <h5>Sophia Reynolds (Private Advisor)</h5>
          <p>Regarding: Palm Jumeirah Water Palace &bull; <em>"Awaiting your preferred time slot for the 4K tour."</em></p>
        </div>
        <span class="ticket-status-badge confirmed">ACTIVE</span>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 18. LIVE MESSAGING & BROKER CHAT DRAWER
  // --------------------------------------------------------------------------
  window.openMessagesDrawer = function (agentId, propId) {
    const drawer = document.getElementById('messages-drawer');
    const backdrop = document.getElementById('messages-backdrop');

    if (agentId) state.chat.activeAgentId = agentId;
    if (propId) state.chat.activePropertyId = propId;

    const agent = SEED_AGENTS.find(a => a.id === state.chat.activeAgentId) || SEED_AGENTS[1];
    const prop = state.properties.find(p => p.id === state.chat.activePropertyId) || state.properties[0];

    // Update Chat Header
    const avatar = document.getElementById('chat-agent-avatar');
    const name = document.getElementById('chat-agent-name');
    const chipTitle = document.getElementById('chat-chip-title');

    if (avatar) avatar.style.backgroundImage = `url('${agent.avatar}')`;
    if (name) name.textContent = agent.name;
    if (chipTitle) chipTitle.textContent = `${prop.title} (${formatPrice(prop.priceUSD, prop.purpose === 'Rent')})`;

    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeMessagesDrawer = function () {
    const drawer = document.getElementById('messages-drawer');
    const backdrop = document.getElementById('messages-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.handleChatMessageSubmit = function (e) {
    e.preventDefault();
    const input = document.getElementById('chat-text-input');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    appendChatMessage(userText, 'sent');

    // Simulated Smart Agent Reply after 1s
    setTimeout(() => {
      const responses = [
        "Thank you for your confidential inquiry. I have accessed the legal dossier and sent an encrypted copy to your registered email.",
        "Understood. Our private office can arrange a discreet private viewing this Saturday at sunset hour.",
        "The seller's family office is open to structured acquisition milestones subject to institutional escrow.",
        "The title deed has undergone triple-verification with zero encumbrances or pending disputes."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      appendChatMessage(randomResponse, 'received');
    }, 1000);
  };

  window.sendQuickMessage = function (text) {
    appendChatMessage(text, 'sent');
    setTimeout(() => {
      appendChatMessage("I am actively reviewing this request with our capital advisory committee. Allow me 5 minutes to verify details.", 'received');
    }, 1000);
  };

  function appendChatMessage(text, type) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    bubble.innerHTML = `
      <p>${text}</p>
      <span class="chat-time">Just now</span>
    `;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }

  // --------------------------------------------------------------------------
  // 19. INTERACTIVE SPATIAL MAP HOTSPOTS & POI
  // --------------------------------------------------------------------------
  function renderMapPins(filter = 'all') {
    const container = document.getElementById('map-pins-container');
    if (!container) return;

    const pins = filter === 'all' ? MAP_HOTSPOTS : MAP_HOTSPOTS.filter(p => p.type === filter || p.type === 'estate');

    container.innerHTML = pins.map(p => `
      <div class="map-marker" style="top: ${p.y}%; left: ${p.x}%;" onclick="window.handleMapMarkerClick('${p.id}')">
        <div class="marker-pulse-dot ${p.type === 'estate' ? 'gold' : 'teal'}"></div>
        <div class="marker-tooltip">${p.title}</div>
      </div>
    `).join('');
  }

  window.handleMapMarkerClick = function (markerId) {
    const marker = MAP_HOTSPOTS.find(m => m.id === markerId);
    if (!marker) return;

    if (marker.propId) {
      const prop = state.properties.find(p => p.id === marker.propId);
      if (prop) {
        const thumb = document.getElementById('map-preview-img');
        const title = document.getElementById('map-preview-title');
        const loc = document.getElementById('map-preview-loc');
        const price = document.getElementById('map-preview-price');

        if (thumb) thumb.style.backgroundImage = `url('${prop.images[0]}')`;
        if (title) title.textContent = prop.title;
        if (loc) loc.textContent = prop.address;
        if (price) price.textContent = formatPrice(prop.priceUSD, prop.purpose === 'Rent');

        triggerToast(`Focused on ${prop.title}`);
      }
    } else {
      triggerToast(`Lifestyle Point of Interest: ${marker.title}`);
    }
  };

  window.filterMapPoi = function (poiCategory, el) {
    document.querySelectorAll('.poi-category-btn').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');

    renderMapPins(poiCategory);

    const indicator = document.getElementById('poi-count-indicator');
    if (indicator) {
      const count = poiCategory === 'all' ? 12 : 4;
      indicator.textContent = `${count} Places Nearby`;
    }
  };

  window.zoomMap = function (delta) {
    triggerToast(`Map perspective scaled ${delta > 0 ? '+15%' : '-15%'}`);
  };

  window.resetMapCenter = function () {
    triggerToast('Map centered to flagship diplomatic quadrant.');
  };

  // --------------------------------------------------------------------------
  // 20. AGENTS DIRECTORY RENDERING
  // --------------------------------------------------------------------------
  function renderAgentsGrid() {
    const container = document.getElementById('agents-grid');
    if (!container) return;

    container.innerHTML = SEED_AGENTS.map(agent => `
      <div class="agent-card">
        <div class="agent-photo-wrap">
          <img src="${agent.avatar}" alt="${agent.name}" class="agent-photo" loading="lazy" decoding="async">
          <div class="agent-vignette"></div>
          <div class="agent-rating-badge">★ ${agent.rating} Verified</div>
        </div>
        <div class="agent-card-body">
          <h3 class="agent-name">${agent.name}</h3>
          <div class="agent-role">${agent.role}</div>
          <div class="agent-stats-grid">
            <div class="agent-stat-item">
              <strong>${agent.experience}</strong>
              <span>Experience</span>
            </div>
            <div class="agent-stat-item">
              <strong>${agent.deals}</strong>
              <span>Transactions</span>
            </div>
          </div>
          <div class="agent-contact-actions">
            <button class="btn-glass-small" onclick="window.openMessagesDrawer('${agent.id}')">Inquire</button>
            <button class="btn-glass-small" onclick="window.openViewingModal()">Schedule Tour</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // 21. INSIGHTS ARTICLES RENDERING & MODAL
  // --------------------------------------------------------------------------
  function renderInsights() {
    const container = document.getElementById('insights-grid');
    if (!container) return;

    container.innerHTML = SEED_INSIGHTS.map(item => `
      <article class="insight-card" onclick="window.openArticleModal('${item.id}')">
        <div class="insight-photo-wrap">
          <img src="${item.photo}" alt="${item.title}" class="insight-photo" loading="lazy" decoding="async">
          <span class="insight-category-badge">${item.category}</span>
        </div>
        <div class="insight-body">
          <div class="insight-date">${item.date} &bull; ${item.readTime}</div>
          <h3 class="insight-title">${item.title}</h3>
          <p class="insight-snippet">${item.snippet}</p>
          <div class="insight-read-link">
            <span>Read Full Dossier</span>
            <span>&rarr;</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  window.openArticleModal = function (articleId) {
    const article = SEED_INSIGHTS.find(a => a.id === articleId) || SEED_INSIGHTS[0];
    const modal = document.getElementById('article-modal');
    const backdrop = document.getElementById('article-modal-backdrop');
    const body = document.getElementById('article-modal-body');

    if (!modal || !body) return;

    body.innerHTML = `
      <div class="gold-crest-badge">${article.category}</div>
      <h2 style="font-family: var(--font-serif); font-size: 2.25rem; margin-bottom: 0.5rem; line-height: 1.2;">${article.title}</h2>
      <div style="font-size: 0.8125rem; color: var(--text-tertiary); margin-bottom: 1.5rem;">${article.date} &bull; ${article.readTime} &bull; Elysian Global Intelligence</div>
      <img src="${article.photo}" alt="${article.title}" style="width: 100%; height: 320px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">${article.snippet}</p>
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.8;">${article.content}</p>
      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
        <button class="btn-premium-cta" onclick="window.closeArticleModal()">Close Report</button>
      </div>
    `;

    modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeArticleModal = function () {
    const modal = document.getElementById('article-modal');
    const backdrop = document.getElementById('article-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.openArticlesFilter = function () {
    triggerToast('Displaying full archive of Elysian quarterly briefings.');
  };

  // --------------------------------------------------------------------------
  // 22. TESTIMONIALS CAROUSEL
  // --------------------------------------------------------------------------
  window.navigateTestimonial = function (delta) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.test-dot');
    if (!slides.length) return;

    let nextIndex = state.testimonialIndex + delta;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    if (nextIndex >= slides.length) nextIndex = 0;

    window.setTestimonialSlide(nextIndex);
  };

  window.setTestimonialSlide = function (index) {
    state.testimonialIndex = index;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.test-dot');

    slides.forEach((s, idx) => s.classList.toggle('active', idx === index));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
  };

  // --------------------------------------------------------------------------
  // 23. SHARE MODAL & CHANNELS
  // --------------------------------------------------------------------------
  window.openShareModal = function (propId) {
    const prop = state.properties.find(p => p.id === propId) || state.properties[0];
    const input = document.getElementById('share-link-input');
    if (input) {
      input.value = `${window.location.origin}${window.location.pathname}?holding=${prop.id}`;
    }

    const modal = document.getElementById('share-modal');
    const backdrop = document.getElementById('share-modal-backdrop');
    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeShareModal = function () {
    const modal = document.getElementById('share-modal');
    const backdrop = document.getElementById('share-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.copyShareLink = function () {
    const input = document.getElementById('share-link-input');
    const btnText = document.getElementById('share-btn-text');
    if (input) {
      input.select();
      navigator.clipboard.writeText(input.value);
      if (btnText) btnText.textContent = '✓ Copied!';
      setTimeout(() => {
        if (btnText) btnText.textContent = 'Copy Link';
        closeShareModal();
      }, 1400);
      triggerToast('Confidential holding URL copied to clipboard.');
    }
  };

  window.shareViaChannel = function (channel) {
    const input = document.getElementById('share-link-input');
    const url = input ? encodeURIComponent(input.value) : '';
    const text = encodeURIComponent('Confidential Property Dossier from Elysian Luxury Estates:');

    if (channel === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    } else if (channel === 'email') {
      window.location.href = `mailto:?subject=Private%20Holding%20Dossier&body=${text}%20${url}`;
    } else if (channel === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
  };

  // --------------------------------------------------------------------------
  // 24. AUTH & NOTICE MODALS
  // --------------------------------------------------------------------------
  window.openAuthModal = function (mode = 'signin') {
    const modal = document.getElementById('auth-modal');
    const backdrop = document.getElementById('auth-modal-backdrop');
    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeAuthModal = function () {
    const modal = document.getElementById('auth-modal');
    const backdrop = document.getElementById('auth-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.handleAuthSubmit = function (e) {
    e.preventDefault();
    closeAuthModal();
    triggerToast('Authenticated as Accredited Private Client.', 'gold');
    openDashboardModal('overview');
  };

  window.openNoticeModal = function (title, text) {
    const modal = document.getElementById('notice-modal');
    const backdrop = document.getElementById('notice-modal-backdrop');
    const titleEl = document.getElementById('notice-modal-title');
    const textEl = document.getElementById('notice-modal-text');

    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;

    if (modal) modal.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeNoticeModal = function () {
    const modal = document.getElementById('notice-modal');
    const backdrop = document.getElementById('notice-modal-backdrop');
    if (modal) modal.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.openMortgageQuickCalc = function () {
    if (state.properties.length > 0) {
      openPropertyDetails(state.properties[0].id);
    }
  };

  window.handleNewsletterSubmit = function (e) {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    if (input && input.value) {
      input.value = '';
      triggerToast('Your email has been added to our private weekly investor dispatch.', 'gold');
    }
  };

  // --------------------------------------------------------------------------
  // 25. THEME & CURRENCY TOGGLES
  // --------------------------------------------------------------------------
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('elysian_theme', state.theme);
      updateThemeButtonUI();
      triggerToast(`Switched to ${state.theme === 'dark' ? 'Midnight Luxury' : 'Pristine Ivory'} theme.`);
    });
  }

  function updateThemeButtonUI() {
    const label = document.getElementById('theme-label-text');
    if (label) {
      label.textContent = state.theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
  }

  function initCurrencySelector() {
    const select = document.getElementById('currency-select');
    if (!select) return;

    select.addEventListener('change', (e) => {
      window.setCurrency(e.target.value);
    });
  }

  window.setCurrency = function (code) {
    if (CURRENCY_RATES[code]) {
      state.currency = code;
      localStorage.setItem('elysian_currency', code);
      const sel = document.getElementById('currency-select');
      if (sel) sel.value = code;
      renderProperties();
      renderVipShowcase();
      renderFavoritesDrawer();
      triggerToast(`Valuations converted to ${code}.`);
    }
  };

  // --------------------------------------------------------------------------
  // 26. MOBILE MENU DRAWER
  // --------------------------------------------------------------------------
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');

    if (toggle && drawer && backdrop) {
      toggle.addEventListener('click', () => {
        drawer.classList.add('open');
        backdrop.classList.add('open');
      });
    }
  }

  window.closeMobileNav = function () {
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  };

  // --------------------------------------------------------------------------
  // 27. SCROLL ANIMATIONS & INTERSECTION OBSERVER
  // --------------------------------------------------------------------------
  function initScrollNavbar() {
    const navbar = document.getElementById('luxury-navbar');
    window.addEventListener('scroll', () => {
      if (!navbar) return;
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  function initAnimatedCounters() {
    const counterElements = document.querySelectorAll('.stat-counter');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          animateCounter(el, target);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));
  }

  function animateCounter(el, target) {
    let current = 0;
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
        clearInterval(timer);
      } else {
        el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
      }
    }, stepTime);
  }

  // --------------------------------------------------------------------------
  // 28. GLOBAL TOAST NOTIFICATION ENGINE
  // --------------------------------------------------------------------------
  window.triggerToast = function (message, type = 'teal') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `luxury-toast ${type === 'gold' ? 'gold' : ''}`;
    toast.innerHTML = `
      <span style="font-size: 1.25rem;">${type === 'gold' ? '⚜️' : '✦'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3600);
  };

  // --------------------------------------------------------------------------
  // 29. INITIALIZATION ENTRY POINT
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    loadPersistedState();
    renderProperties();
    renderVipShowcase();
    renderAgentsGrid();
    renderInsights();
    renderMapPins('all');

    initThemeToggle();
    initCurrencySelector();
    initMobileMenu();
    initScrollNavbar();
    initAnimatedCounters();

    // Fast live search debouncing on keyword input
    const heroKwInput = document.getElementById('hero-keyword-input');
    if (heroKwInput) {
      let kwDebounceTimer = null;
      heroKwInput.addEventListener('input', (e) => {
        clearTimeout(kwDebounceTimer);
        kwDebounceTimer = setTimeout(() => {
          state.searchKeyword = e.target.value;
          applyAllFilters();
        }, 120);
      });
      heroKwInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          clearTimeout(kwDebounceTimer);
          window.executeHeroSearch();
        }
      });
    }

    // Auto-advance testimonials every 7s
    setInterval(() => {
      window.navigateTestimonial(1);
    }, 7000);

    // Deep link detection (e.g., ?holding=prop-isl-01)
    const urlParams = new URLSearchParams(window.location.search);
    const holdingId = urlParams.get('holding');
    if (holdingId) {
      setTimeout(() => window.openPropertyDetails(holdingId), 600);
    }
  });

})();
