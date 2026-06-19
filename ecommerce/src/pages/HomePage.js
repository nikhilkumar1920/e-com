// ============================================================
// HomePage — hero banner + featured products preview
// ============================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import "../styles/HomePage.css";

const CATEGORIES = [
  { label: "Men", icon: "👔" },
  { label: "Women", icon: "👗" },
  { label: "Footwear", icon: "👟" },
  { label: "Accessories", icon: "👜" },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((products) => {
        // Show top-rated products as featured (top 4)
        const sorted = [...products].sort((a, b) => b.rating - a.rating);
        setFeatured(sorted.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="home">
      {/* ── Hero ── */}
      <section className="home__hero" aria-label="Hero banner">
        <div className="home__hero-content">
          <p className="home__hero-tag">New Season Arrivals</p>
          <h1 className="home__hero-title">
            Style That <span>Speaks</span> For You
          </h1>
          <p className="home__hero-subtitle">
            Discover curated fashion for every occasion. Quality pieces, modern
            design.
          </p>
          <div className="home__hero-cta">
            <Link to="/products" className="home__btn home__btn--primary">
              Shop Now
            </Link>
            <Link to="/products" className="home__btn home__btn--outline">
              Explore Collections
            </Link>
          </div>
        </div>
        <div className="home__hero-image" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=500&fit=crop"
            alt="Fashion hero"
          />
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="home__categories" aria-label="Shop by category">
        <div className="home__section-header">
          <h2 className="home__section-title">Shop by Category</h2>
        </div>
        <div className="home__category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={`/products?category=${cat.label}`}
              className="home__category-card"
              aria-label={`Shop ${cat.label}`}
            >
              <span className="home__category-icon" aria-hidden="true">
                {cat.icon}
              </span>
              <span className="home__category-label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured ── */}
      <section className="home__featured" aria-label="Featured products">
        <div className="home__section-header">
          <h2 className="home__section-title">Top Rated Products</h2>
          <Link to="/products" className="home__view-all">
            View All →
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="home__product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ── Banner strip ── */}
      <section className="home__banner" aria-label="Promotions">
        <div className="home__banner-item">
          <span aria-hidden="true">🚚</span>
          <div>
            <strong>Free Shipping</strong>
            <p>On orders over $50</p>
          </div>
        </div>
        <div className="home__banner-item">
          <span aria-hidden="true">↩️</span>
          <div>
            <strong>Easy Returns</strong>
            <p>30-day return policy</p>
          </div>
        </div>
        <div className="home__banner-item">
          <span aria-hidden="true">🔒</span>
          <div>
            <strong>Secure Payment</strong>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="home__banner-item">
          <span aria-hidden="true">🎁</span>
          <div>
            <strong>Gift Cards</strong>
            <p>Give the perfect gift</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
