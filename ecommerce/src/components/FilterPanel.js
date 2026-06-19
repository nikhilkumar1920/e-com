// ============================================================
// FilterPanel — sidebar with all filter & sort controls
// ============================================================

import React from "react";
import "../styles/FilterPanel.css";

const SIZES = ["S", "M", "L", "XL"];
const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const FilterPanel = ({ filters, categories, onChange, onReset }) => {
  const {
    search,
    category,
    sizes,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  } = filters;

  // Toggle a size in the sizes array
  const handleSizeToggle = (size) => {
    const updated = sizes.includes(size)
      ? sizes.filter((s) => s !== size)
      : [...sizes, size];
    onChange("sizes", updated);
  };

  return (
    <aside className="filter-panel" aria-label="Filter and sort products">
      {/* ── Search ── */}
      <div className="filter-panel__section">
        <label htmlFor="search" className="filter-panel__label">
          Search
        </label>
        <div className="filter-panel__search-wrapper">
          <span className="filter-panel__search-icon" aria-hidden="true">🔍</span>
          <input
            id="search"
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => onChange("search", e.target.value)}
            className="filter-panel__input filter-panel__input--search"
            aria-label="Search products by name"
          />
        </div>
      </div>

      {/* ── Category ── */}
      <div className="filter-panel__section">
        <label htmlFor="category" className="filter-panel__label">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onChange("category", e.target.value)}
          className="filter-panel__select"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* ── Size ── */}
      <div className="filter-panel__section">
        <span className="filter-panel__label">Size</span>
        <div className="filter-panel__sizes" role="group" aria-label="Filter by size">
          {SIZES.map((size) => (
            <button
              key={size}
              className={`filter-panel__size-btn ${sizes.includes(size) ? "filter-panel__size-btn--active" : ""}`}
              onClick={() => handleSizeToggle(size)}
              aria-pressed={sizes.includes(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ── Price Range ── */}
      <div className="filter-panel__section">
        <span className="filter-panel__label">
          Price Range &nbsp;
          <small className="filter-panel__range-info">
            ${minPrice} – ${maxPrice}
          </small>
        </span>
        <div className="filter-panel__price-inputs">
          <div className="filter-panel__price-field">
            <label htmlFor="minPrice" className="filter-panel__sublabel">Min</label>
            <input
              id="minPrice"
              type="number"
              min="0"
              max={maxPrice}
              value={minPrice}
              onChange={(e) => onChange("minPrice", Number(e.target.value))}
              className="filter-panel__input filter-panel__input--price"
              aria-label="Minimum price"
            />
          </div>
          <span className="filter-panel__price-sep">–</span>
          <div className="filter-panel__price-field">
            <label htmlFor="maxPrice" className="filter-panel__sublabel">Max</label>
            <input
              id="maxPrice"
              type="number"
              min={minPrice}
              value={maxPrice}
              onChange={(e) => onChange("maxPrice", Number(e.target.value))}
              className="filter-panel__input filter-panel__input--price"
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      {/* ── Min Rating ── */}
      <div className="filter-panel__section">
        <label htmlFor="minRating" className="filter-panel__label">
          Min Rating &nbsp;
          <small className="filter-panel__range-info">
            {minRating > 0 ? `${minRating}★ & up` : "Any"}
          </small>
        </label>
        <input
          id="minRating"
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={minRating}
          onChange={(e) => onChange("minRating", Number(e.target.value))}
          className="filter-panel__range"
          aria-label={`Minimum rating: ${minRating}`}
        />
        <div className="filter-panel__range-labels" aria-hidden="true">
          <span>0</span>
          <span>5</span>
        </div>
      </div>

      {/* ── Sort ── */}
      <div className="filter-panel__section">
        <label htmlFor="sortBy" className="filter-panel__label">
          Sort By
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onChange("sortBy", e.target.value)}
          className="filter-panel__select"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Reset ── */}
      <button className="filter-panel__reset-btn" onClick={onReset} aria-label="Reset all filters">
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterPanel;
