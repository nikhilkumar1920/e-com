// ============================================================
// Navbar — responsive top navigation with cart badge
// ============================================================

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Brand */}
      <Link to="/" className="navbar__brand" aria-label="ShopLane home">
        <span className="navbar__brand-icon">🛍️</span>
        <span className="navbar__brand-name">ShopLane</span>
      </Link>

      {/* Desktop links */}
      <ul className="navbar__links">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? "navbar__link--active" : ""}`}
            >
              {link.label === "Cart" ? (
                <span className="navbar__cart-wrapper">
                  Cart
                  {cartCount > 0 && (
                    <span className="navbar__badge" aria-label={`${cartCount} items in cart`}>
                      {cartCount}
                    </span>
                  )}
                </span>
              ) : (
                link.label
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile menu */}
      <ul
        id="mobile-menu"
        className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}
      >
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? "navbar__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label === "Cart" ? `Cart (${cartCount})` : link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
