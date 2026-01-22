import { Product, Category } from './types';

// Helper to generate consistent images based on ID
const getImg = (id: string) => `https://picsum.photos/seed/${id}/600/800`;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Merino Wool Structured Coat',
    description: 'A timeless classic tailored from premium Italian merino wool. Perfect for crisp autumn evenings.',
    price: 249.00,
    category: Category.WOMEN,
    image: getImg('coat1'),
    tags: ['formal', 'winter', 'wool', 'elegant', 'beige']
  },
  {
    id: 'p2',
    name: 'Urban Tech-Fleece Hoodie',
    description: 'Engineered for the city. Moisture-wicking fabric with a sleek, modern silhouette.',
    price: 89.00,
    category: Category.MEN,
    image: getImg('hoodie1'),
    tags: ['casual', 'sport', 'streetwear', 'black', 'comfortable']
  },
  {
    id: 'p3',
    name: 'Silk Chiffon Evening Dress',
    description: 'Flowing elegance with a delicate floral print. The perfect statement piece for summer weddings.',
    price: 320.00,
    category: Category.WOMEN,
    image: getImg('dress1'),
    tags: ['party', 'summer', 'wedding', 'floral', 'luxury']
  },
  {
    id: 'p4',
    name: 'Heritage Leather Weekender',
    description: 'Full-grain leather travel bag that ages beautifully. Spacious enough for a 3-day getaway.',
    price: 450.00,
    category: Category.ACCESSORIES,
    image: getImg('bag1'),
    tags: ['travel', 'leather', 'brown', 'vintage', 'durable']
  },
  {
    id: 'p5',
    name: 'Minimalist Linen Shirt',
    description: 'Breathable linen shirt in a relaxed fit. Essential for coastal vacations.',
    price: 65.00,
    category: Category.MEN,
    image: getImg('shirt1'),
    tags: ['summer', 'beach', 'casual', 'white', 'linen']
  },
  {
    id: 'p6',
    name: 'Chunky Knit Cardigan',
    description: 'Oversized comfort in a soft cotton blend. Cozy styling for home or office.',
    price: 95.00,
    category: Category.WOMEN,
    image: getImg('knit1'),
    tags: ['winter', 'cozy', 'casual', 'grey', 'cotton']
  },
  {
    id: 'p7',
    name: 'Aviator Gold Sunglasses',
    description: 'Classic aviator frames with polarized lenses. 100% UV protection.',
    price: 150.00,
    category: Category.ACCESSORIES,
    image: getImg('glasses1'),
    tags: ['summer', 'gold', 'accessories', 'classic']
  },
  {
    id: 'p8',
    name: 'Junior Denim Jacket',
    description: 'Durable denim with a soft shearling collar. Stylish warmth for the little ones.',
    price: 45.00,
    category: Category.KIDS,
    image: getImg('kids1'),
    tags: ['kids', 'denim', 'blue', 'winter', 'casual']
  },
  {
    id: 'p9',
    name: 'Performance Running Trainers',
    description: 'High-response foam cushioning for marathon-level comfort.',
    price: 130.00,
    category: Category.MEN,
    image: getImg('shoes1'),
    tags: ['sport', 'running', 'shoes', 'neon']
  },
  {
    id: 'p10',
    name: 'Velvet Evening Blazer',
    description: 'Deep midnight blue velvet. Sharp tailoring for black-tie events.',
    price: 280.00,
    category: Category.MEN,
    image: getImg('blazer1'),
    tags: ['formal', 'party', 'blue', 'velvet', 'luxury']
  },
  {
    id: 'p11',
    name: 'Cashmere Scarf',
    description: 'Ultra-soft Mongolian cashmere. The ultimate winter accessory.',
    price: 110.00,
    category: Category.ACCESSORIES,
    image: getImg('scarf1'),
    tags: ['winter', 'accessory', 'red', 'soft', 'luxury']
  },
  {
    id: 'p12',
    name: 'Summer Floral Romper',
    description: 'Playful and light. 100% organic cotton for hot days.',
    price: 35.00,
    category: Category.KIDS,
    image: getImg('kids2'),
    tags: ['kids', 'summer', 'floral', 'pink', 'cute']
  }
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
