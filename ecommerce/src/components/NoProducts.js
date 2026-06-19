// ============================================================
// NoProducts — empty-state message when filters yield no results
// ============================================================

import React from "react";
import "../styles/NoProducts.css";

const NoProducts = ({ onReset }) => (
  <div className="no-products" role="status" aria-live="polite">
    <span className="no-products__icon" aria-hidden="true">🔍</span>
    <h2 className="no-products__title">No Products Found</h2>
    <p className="no-products__subtitle">
      Try adjusting your filters or search term.
    </p>
    {onReset && (
      <button className="no-products__btn" onClick={onReset}>
        Clear All Filters
      </button>
    )}
  </div>
);

export default NoProducts;
