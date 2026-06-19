// ============================================================
// App.js — root component: routing + layout shell
// ============================================================

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

import "./styles/global.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        {/* Skip to main content (accessibility) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="app-layout">
          {/* Persistent navbar */}
          <Navbar />

          {/* Page content */}
          <main id="main-content" className="app-layout__main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div style={{ textAlign: "center", padding: "80px 20px" }}>
                    <h1 style={{ fontSize: "4rem", color: "#6c63ff" }}>404</h1>
                    <p style={{ color: "#64748b", marginTop: "12px" }}>
                      Page not found.
                    </p>
                    <a
                      href="/"
                      style={{
                        display: "inline-block",
                        marginTop: "24px",
                        padding: "10px 24px",
                        background: "#6c63ff",
                        color: "#fff",
                        borderRadius: "9999px",
                        fontWeight: 600,
                      }}
                    >
                      Go Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="app-footer">
            <p>
              © {new Date().getFullYear()} ShopLane. Built with React.js &amp;
              plain CSS.
            </p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
