// ============================================================
// Loader — animated spinner shown during data fetching
// ============================================================

import React from "react";
import "../styles/Loader.css";

const Loader = ({ message = "Loading products…" }) => (
  <div className="loader" role="status" aria-live="polite" aria-label={message}>
    <div className="loader__spinner" aria-hidden="true" />
    <p className="loader__text">{message}</p>
  </div>
);

export default Loader;
