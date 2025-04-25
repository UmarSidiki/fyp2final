export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  featuredImage: string;
  date: string;
  author: string;
  category: string;
};

// Mock data for tour guide posts
const blogPosts: Post[] = [
  {
    id: 1,
    title: 'Exploring Bali: A Complete Travel Guide',
    slug: 'exploring-bali-travel-guide',
    excerpt: 'Discover the best places to visit in Bali, from stunning beaches to cultural landmarks.',
    content: [
      'Bali, known as the Island of the Gods, offers a perfect blend of natural beauty and rich culture.',
      'Start your journey in Ubud, the cultural heart of Bali, where you can visit sacred temples and lush rice terraces.',
      'Don\'t miss the stunning beaches of Seminyak and Nusa Dua, perfect for surfing and relaxation.',
      'For adventure seekers, hiking Mount Batur at sunrise is an unforgettable experience.',
      'End your trip with a traditional Balinese massage and cuisine for the complete experience.',
    ],
    featuredImage: '',
    date: 'May 15, 2024',
    author: 'Sarah Johnson',
    category: 'Asia',
  },
  {
    id: 2,
    title: 'Italian Cuisine Tour: From Rome to Florence',
    slug: 'italian-cuisine-tour',
    excerpt: 'A culinary journey through Italy\'s most famous food destinations.',
    content: [
      'Italy is a paradise for food lovers, with each region offering unique flavors and traditions.',
      'In Rome, try authentic carbonara and cacio e pepe in local trattorias.',
      'Florence is famous for its bistecca alla fiorentina, a must-try for meat lovers.',
      'Don\'t miss the pizza in Naples, where this world-famous dish originated.',
      'Finish your tour with gelato tasting in Florence - try lesser-known flavors like ricotta and fig.',
    ],
    featuredImage: '',
    date: 'May 10, 2024',
    author: 'Marco Rossi',
    category: 'Europe',
  },
  {
    id: 3,
    title: 'African Safari Adventure: Kenya & Tanzania',
    slug: 'african-safari-adventure',
    excerpt: 'Experience the wildlife and landscapes of East Africa\'s most famous parks.',
    content: [
      'A safari in East Africa offers unparalleled wildlife viewing opportunities.',
      'Visit the Masai Mara in Kenya during the Great Migration (July-October) for spectacular scenes.',
      'Tanzania\'s Serengeti National Park is home to the Big Five all year round.',
      'Stay in luxury tented camps for an authentic yet comfortable safari experience.',
      'Combine your safari with a visit to Zanzibar for beautiful beaches and cultural experiences.',
    ],
    featuredImage: '',
    date: 'May 5, 2024',
    author: 'David Wilson',
    category: 'Africa',
  },
  {
    id: 4,
    title: 'New York City: Ultimate Urban Guide',
    slug: 'new-york-city-guide',
    excerpt: 'How to experience the best of NYC in just 5 days.',
    content: [
      'New York City offers endless possibilities for visitors.',
      'Start with classic landmarks: Statue of Liberty, Empire State Building, and Times Square.',
      'Explore diverse neighborhoods like Chinatown, Little Italy, and Williamsburg.',
      'Visit world-class museums like the MET and MoMA on their free admission days.',
      'End your days with Broadway shows and rooftop bar hopping for the full NYC experience.',
    ],
    featuredImage: '',
    date: 'April 28, 2024',
    author: 'Jessica Chen',
    category: 'North America',
  },
  {
    id: 5,
    title: 'Japanese Cultural Immersion: Beyond Tokyo',
    slug: 'japanese-cultural-immersion',
    excerpt: 'Discover traditional Japan through these lesser-known destinations.',
    content: [
      'While Tokyo is amazing, Japan\'s true cultural treasures lie beyond the capital.',
      'Visit Kyoto for ancient temples, tea ceremonies, and geisha culture.',
      'Explore the thatched-roof villages of Shirakawa-go, a UNESCO World Heritage site.',
      'Try a ryokan (traditional inn) stay with kaiseki meals and onsen baths.',
      'Time your visit for cherry blossom season (late March-early April) for unforgettable views.',
    ],
    featuredImage: '',
    date: 'April 20, 2024',
    author: 'Kenji Tanaka',
    category: 'Asia',
  },
  {
    id: 6,
    title: 'Australian Road Trip: East Coast Highlights',
    slug: 'australian-road-trip',
    excerpt: 'The ultimate itinerary for driving Australia\'s stunning east coast.',
    content: [
      'Australia\'s east coast offers some of the world\'s best road trip routes.',
      'Start in Sydney, exploring the Opera House and Bondi Beach before heading north.',
      'Don\'t miss the Great Barrier Reef - go snorkeling or take a scenic flight.',
      'Fraser Island, the world\'s largest sand island, offers unique 4WD adventures.',
      'End your trip in tropical Cairns, gateway to the Daintree Rainforest.',
    ],
    featuredImage: '',
    date: 'April 15, 2024',
    author: 'Olivia Smith',
    category: 'Oceania',
  },
  {
    id: 7,
    title: 'Peruvian Adventure: Machu Picchu & Beyond',
    slug: 'peruvian-adventure',
    excerpt: 'How to plan the perfect trip to Peru\'s ancient wonders.',
    content: [
      'Peru offers incredible historical sites and natural beauty.',
      'Machu Picchu is the highlight, but visit early to avoid crowds.',
      'The Sacred Valley offers charming towns and lesser-known Inca sites.',
      'Don\'t miss the Amazon rainforest portion - stay in a jungle lodge.',
      'Lima\'s food scene is world-class - try ceviche and pisco sour.',
    ],
    featuredImage: '',
    date: 'April 10, 2024',
    author: 'Carlos Mendez',
    category: 'South America',
  },
  {
    id: 8,
    title: 'Northern Lights Hunting in Scandinavia',
    slug: 'northern-lights-scandinavia',
    excerpt: 'Best places and times to see the aurora borealis.',
    content: [
      'Seeing the Northern Lights is a bucket-list experience for many travelers.',
      'Tromsø, Norway offers excellent viewing chances from September to March.',
      'Swedish Lapland provides unique glass igloo accommodations for aurora viewing.',
      'Iceland\'s remote locations away from light pollution increase your chances.',
      'Book a guided tour for expert knowledge on the best viewing spots each night.',
    ],
    featuredImage: '',
    date: 'April 5, 2024',
    author: 'Erik Johansson',
    category: 'Europe',
  },
  {
    id: 9,
    title: 'Egyptian Wonders: Pyramids to the Red Sea',
    slug: 'egyptian-wonders',
    excerpt: 'A historical journey through ancient and modern Egypt.',
    content: [
      'Egypt offers one of the world\'s most fascinating historical journeys.',
      'The Pyramids of Giza and Sphinx are must-sees, but go early to beat the heat.',
      'Cruise the Nile River to visit Luxor and Valley of the Kings temples.',
      'The Red Sea resorts offer world-class diving and relaxation after historical touring.',
      'Visit Abu Simbel - the massive temple complex relocated to save it from flooding.',
    ],
    featuredImage: '',
    date: 'March 28, 2024',
    author: 'Amina Farouk',
    category: 'Africa',
  },
];

// Function to get all posts with pagination, search, and filtering
export function getAllPosts({
  page = 1,
  search = '',
  category = '',
}: {
  page?: number;
  search?: string;
  category?: string;
}) {
  const postsPerPage = 6;

  // Filter posts based on search and category
  let filteredPosts = [...blogPosts];

  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      post => post.title.toLowerCase().includes(searchLower) || post.excerpt.toLowerCase().includes(searchLower),
    );
  }

  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  }

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);

  // Get posts for current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
    totalPosts,
  };
}

// Function to get a single post by slug
export function getPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

// Function to get related posts (same category, excluding current post)
export function getRelatedPosts(currentSlug: string, category: string, limit = 3) {
  return blogPosts.filter(post => post.slug !== currentSlug && post.category === category).slice(0, limit);
}

// Function to get all unique categories
export function getAllCategories() {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
}
