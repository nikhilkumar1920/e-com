// ============================================================
// CartPage — full shopping cart with quantity controls
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <span className="cart__empty-icon" aria-hidden="true">🛒</span>
        <h1 className="cart__empty-title">Your cart is empty</h1>
        <p className="cart__empty-subtitle">
          Looks like you haven't added anything yet.
        </p>
        <Link to="/products" className="cart__shop-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h1 className="cart__title">
          Shopping Cart <span>({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
        </h1>
        <button
          className="cart__clear-btn"
          onClick={clearCart}
          aria-label="Clear all items from cart"
        >
          Clear Cart
        </button>
      </div>

      <div className="cart__layout">
        {/* ── Item list ── */}
        <ul className="cart__items" aria-label="Cart items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart__item">
              {/* Image */}
              <Link to={`/products/${item.id}`} className="cart__item-img-link">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart__item-img"
                />
              </Link>

              {/* Details */}
              <div className="cart__item-details">
                <Link to={`/products/${item.id}`} className="cart__item-name-link">
                  <h3 className="cart__item-name">{item.name}</h3>
                </Link>
                <p className="cart__item-category">{item.category}</p>
                {item.selectedSize && (
                  <p className="cart__item-size">Size: {item.selectedSize}</p>
                )}
                <p className="cart__item-unit-price">${item.price.toFixed(2)} each</p>
              </div>

              {/* Quantity */}
              <div className="cart__item-qty" role="group" aria-label={`Quantity for ${item.name}`}>
                <button
                  className="cart__qty-btn"
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity(item.id, item.quantity - 1)
                      : removeFromCart(item.id)
                  }
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="cart__qty-value" aria-label={`Quantity: ${item.quantity}`}>
                  {item.quantity}
                </span>
                <button
                  className="cart__qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Sub-total */}
              <p className="cart__item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Remove */}
              <button
                className="cart__remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* ── Order summary ── */}
        <aside className="cart__summary" aria-label="Order summary">
          <h2 className="cart__summary-title">Order Summary</h2>

          <div className="cart__summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="cart__summary-row">
            <span>Shipping</span>
            <span className="cart__summary-free">
              {cartTotal >= 50 ? "Free" : "$5.99"}
            </span>
          </div>
          <div className="cart__summary-row cart__summary-row--tax">
            <span>Estimated Tax</span>
            <span>${(cartTotal * 0.08).toFixed(2)}</span>
          </div>

          <div className="cart__summary-divider" role="separator" />

          <div className="cart__summary-row cart__summary-row--total">
            <span>Total</span>
            <span>
              $
              {(
                cartTotal +
                (cartTotal >= 50 ? 0 : 5.99) +
                cartTotal * 0.08
              ).toFixed(2)}
            </span>
          </div>

          {cartTotal < 50 && (
            <p className="cart__shipping-notice">
              Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
            </p>
          )}

          <button className="cart__checkout-btn" aria-label="Proceed to checkout">
            Proceed to Checkout
          </button>

          <Link to="/products" className="cart__continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
