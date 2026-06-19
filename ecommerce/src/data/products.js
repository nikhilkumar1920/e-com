// ============================================================
// Mock product data — replace with real API data via productService.js
// ============================================================

const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    category: "Men",
    price: 29.99,
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description:
      "A timeless classic white t-shirt made from 100% organic cotton. Perfect for everyday wear with a relaxed fit and durable stitching.",
    reviews: 128,
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    category: "Men",
    price: 59.99,
    rating: 4.2,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    description:
      "Modern slim fit jeans crafted from premium stretch denim. Comfortable all day with a contemporary silhouette.",
    reviews: 95,
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    category: "Women",
    price: 49.99,
    rating: 4.8,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    description:
      "A beautiful floral-print summer dress with a flowing silhouette. Light and breathable fabric, perfect for warm days.",
    reviews: 214,
  },
  {
    id: 4,
    name: "Leather Handbag",
    category: "Accessories",
    price: 89.99,
    rating: 4.6,
    sizes: ["M"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    description:
      "Premium genuine leather handbag with multiple compartments. A sophisticated everyday carry for work or weekend.",
    reviews: 67,
  },
  {
    id: 5,
    name: "Running Sneakers",
    category: "Footwear",
    price: 79.99,
    rating: 4.3,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description:
      "Lightweight running sneakers with responsive cushioning and breathable mesh upper. Great for gym or casual wear.",
    reviews: 183,
  },
  {
    id: 6,
    name: "Oversized Hoodie",
    category: "Women",
    price: 44.99,
    rating: 4.7,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
    description:
      "Super cozy oversized hoodie in a soft fleece blend. Kangaroo pocket and adjustable drawstring hood.",
    reviews: 301,
  },
  {
    id: 7,
    name: "Formal Blazer",
    category: "Men",
    price: 119.99,
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
    description:
      "A sharp single-breasted formal blazer in a classic navy cut. Perfect for business meetings or evening events.",
    reviews: 52,
  },
  {
    id: 8,
    name: "Yoga Leggings",
    category: "Women",
    price: 34.99,
    rating: 4.9,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop",
    description:
      "High-waist yoga leggings with four-way stretch fabric. Moisture-wicking and squat-proof design.",
    reviews: 412,
  },
  {
    id: 9,
    name: "Sunglasses Classic",
    category: "Accessories",
    price: 24.99,
    rating: 4.1,
    sizes: ["M"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    description:
      "UV400-protected classic wayfarers with a lightweight acetate frame. A must-have summer accessory.",
    reviews: 88,
  },
  {
    id: 10,
    name: "Ankle Boots",
    category: "Footwear",
    price: 99.99,
    rating: 4.5,
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    description:
      "Stylish genuine leather ankle boots with a block heel. Versatile enough for both casual and smart-casual outfits.",
    reviews: 139,
  },
  {
    id: 11,
    name: "Polo Shirt",
    category: "Men",
    price: 39.99,
    rating: 4.0,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
    description:
      "Classic piqué polo shirt in a variety of solid colours. Ribbed collar and cuffs for a refined casual look.",
    reviews: 76,
  },
  {
    id: 12,
    name: "Silk Scarf",
    category: "Accessories",
    price: 19.99,
    rating: 4.3,
    sizes: ["M"],
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
    description:
      "Luxurious 100% silk scarf with a vibrant floral print. Wear it around your neck, as a headband, or on your bag.",
    reviews: 45,
  },
];

export default products;
