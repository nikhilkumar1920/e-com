// ============================================================
// ProductCard — individual product tile shown in the grid
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  const inCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigating when clicking the button
    addToCart(product);
  };

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Image */}
      <Link to={`/products/${product.id}`} className="product-card__img-link" tabIndex={-1}>
        <div className="product-card__img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__img"
            loading="lazy"
          />
          <span className="product-card__category">{product.category}</span>
        </div>
      </Link>

      {/* Info */}
      <div className="product-card__body">
        <Link to={`/products/${product.id}`} className="product-card__name-link">
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          <StarRating rating={product.rating} />
          <span className="product-card__reviews">({product.reviews})</span>
        </div>

        {/* Sizes */}
        <div className="product-card__sizes" aria-label="Available sizes">
          {product.sizes.map((size) => (
            <span key={size} className="product-card__size-badge">
              {size}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button
            className={`product-card__btn ${inCart ? "product-card__btn--added" : ""}`}
            onClick={handleAddToCart}
            aria-label={inCart ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          >
            {inCart ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
