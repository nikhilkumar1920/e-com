// ============================================================
// ProductListingPage — grid of products with filters & sorting
// ============================================================

import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getProducts, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import Loader from "../components/Loader";
import NoProducts from "../components/NoProducts";
import "../styles/ProductListingPage.css";

// Default filter state
const DEFAULT_FILTERS = {
  search: "",
  category: "",
  sizes: [],
  minPrice: 0,
  maxPrice: 500,
  minRating: 0,
  sortBy: "",
};

const ProductListingPage = () => {
  const location = useLocation();

  // ── State ───────────────────────────────────────────────────
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Load data on mount ──────────────────────────────────────
  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([products, cats]) => {
        setAllProducts(products);
        setCategories(cats);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Pre-fill category from query string (from Home page links) ──
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setFilters((prev) => ({ ...prev, category: cat }));
  }, [location.search]);

  // ── Filter change handler ───────────────────────────────────
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  // ── Derived: filtered + sorted list ────────────────────────
  const filteredProducts = allProducts
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category ? p.category === filters.category : true;
      const matchSizes =
        filters.sizes.length > 0
          ? filters.sizes.some((s) => p.sizes.includes(s))
          : true;
      const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const matchRating = p.rating >= filters.minRating;
      return matchSearch && matchCategory && matchSizes && matchPrice && matchRating;
    })
    .sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.price - b.price;
      if (filters.sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  // ── Active filter count (for mobile button badge) ──────────
  const activeFilterCount = [
    filters.search,
    filters.category,
    filters.sizes.length > 0,
    filters.minPrice > 0,
    filters.maxPrice < 500,
    filters.minRating > 0,
    filters.sortBy,
  ].filter(Boolean).length;

  return (
    <div className="plp">
      {/* ── Page header ── */}
      <div className="plp__header">
        <h1 className="plp__title">All Products</h1>
        <p className="plp__count" aria-live="polite">
          {loading ? "Loading…" : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Mobile: toggle filter panel */}
        <button
          className="plp__filter-toggle"
          onClick={() => setSidebarOpen((p) => !p)}
          aria-label={`${sidebarOpen ? "Close" : "Open"} filters`}
          aria-expanded={sidebarOpen}
        >
          🔧 Filters
          {activeFilterCount > 0 && (
            <span className="plp__filter-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>

      <div className="plp__body">
        {/* ── Sidebar ── */}
        <div className={`plp__sidebar ${sidebarOpen ? "plp__sidebar--open" : ""}`}>
          <FilterPanel
            filters={filters}
            categories={categories}
            onChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* ── Product grid ── */}
        <section className="plp__grid-area" aria-label="Product listing">
          {loading ? (
            <Loader />
          ) : filteredProducts.length === 0 ? (
            <NoProducts onReset={handleReset} />
          ) : (
            <div className="plp__grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductListingPage;
