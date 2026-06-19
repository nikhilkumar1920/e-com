// ============================================================
// ProductDetailsPage — full product view with size selector
// ============================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";
import Loader from "../components/Loader";
import "../styles/ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [addedMsg, setAddedMsg] = useState(false);

  const inCart = cartItems.some((item) => item.id === product?.id);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((p) => {
        setProduct(p);
        // Pre-select first size
        if (p.sizes.length === 1) setSelectedSize(p.sizes[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({ ...product, selectedSize });
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  if (loading) return <Loader message="Loading product…" />;

  if (error)
    return (
      <div className="pdp__error" role="alert">
        <p>😕 {error}</p>
        <button onClick={() => navigate("/products")} className="pdp__back-btn">
          ← Back to Products
        </button>
      </div>
    );

  return (
    <div className="pdp">
      {/* Breadcrumb */}
      <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/products">Products</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp__layout">
        {/* ── Image ── */}
        <div className="pdp__image-section">
          <img
            src={product.image}
            alt={product.name}
            className="pdp__image"
          />
          <span className="pdp__category-tag">{product.category}</span>
        </div>

        {/* ── Info ── */}
        <div className="pdp__info">
          <h1 className="pdp__name">{product.name}</h1>

          {/* Rating */}
          <div className="pdp__rating">
            <StarRating rating={product.rating} size="lg" />
            <span className="pdp__reviews">{product.reviews} reviews</span>
          </div>

          {/* Price */}
          <p className="pdp__price">${product.price.toFixed(2)}</p>

          {/* Description */}
          <p className="pdp__description">{product.description}</p>

          {/* Size selector */}
          <div className="pdp__sizes">
            <span className="pdp__sizes-label">
              Select Size {sizeError && <span className="pdp__size-error">(required)</span>}
            </span>
            <div className="pdp__sizes-grid" role="group" aria-label="Size selection">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`pdp__size-btn ${selectedSize === size ? "pdp__size-btn--active" : ""}`}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  aria-pressed={selectedSize === size}
                  aria-label={`Size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pdp__actions">
            <button
              className={`pdp__add-btn ${inCart ? "pdp__add-btn--added" : ""}`}
              onClick={handleAddToCart}
              aria-label={inCart ? "Already in cart" : "Add to cart"}
            >
              {addedMsg ? "✓ Added to Cart!" : inCart ? "✓ In Cart" : "Add to Cart"}
            </button>
            <Link to="/cart" className="pdp__cart-link">
              View Cart →
            </Link>
          </div>

          {/* Meta */}
          <ul className="pdp__meta" aria-label="Product details">
            <li>
              <span>Category:</span> {product.category}
            </li>
            <li>
              <span>Available Sizes:</span> {product.sizes.join(", ")}
            </li>
            <li>
              <span>Rating:</span> {product.rating} / 5
            </li>
          </ul>
        </div>
      </div>

      {/* Back button */}
      <button className="pdp__back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default ProductDetailsPage;
