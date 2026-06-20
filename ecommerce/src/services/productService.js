// ============================================================
// productService.js — API-ready service layer
//
// Currently uses local mock data. To switch to a real API,
// set REACT_APP_API_URL in your .env file and replace the
// mock functions below with the fetch calls shown in comments.
// The rest of the app stays unchanged.
// ============================================================

const API_URL = process.env.REACT_APP_API_URL;

import products from "../data/products";

// Simulates async network delay (remove when using a real API)
const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all products.
 * Replace body with: return await fetch('/api/products').then(r => r.json())
 */
export const getProducts = async () => {
  await simulateDelay();
  return products;
};

/**
 * Fetch a single product by ID.
 * Replace body with: return await fetch(`/api/products/${id}`).then(r => r.json())
 * @param {number} id - product ID
 */
export const getProductById = async (id) => {
  await simulateDelay();
  const product = products.find((p) => p.id === Number(id));
  if (!product) throw new Error(`Product with id ${id} not found`);
  return product;
};

/**
 * Fetch all available categories.
 * Replace body with: return await fetch('/api/categories').then(r => r.json())
 */
export const getCategories = async () => {
  await simulateDelay(100);
  const cats = [...new Set(products.map((p) => p.category))];
  return cats;
};
