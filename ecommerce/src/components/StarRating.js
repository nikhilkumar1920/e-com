// ============================================================
// StarRating — renders filled / half / empty stars
// ============================================================

import React from "react";
import "../styles/StarRating.css";

const StarRating = ({ rating, size = "sm" }) => {
  // Build array of 5 star states: 'full', 'half', 'empty'
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    if (rating >= value) return "full";
    if (rating >= value - 0.5) return "half";
    return "empty";
  });

  return (
    <div
      className={`star-rating star-rating--${size}`}
      aria-label={`Rating: ${rating} out of 5`}
      role="img"
    >
      {stars.map((type, i) => (
        <span key={i} className={`star star--${type}`}>
          {type === "full" ? "★" : type === "half" ? "⯨" : "☆"}
        </span>
      ))}
      <span className="star-rating__value">{rating}</span>
    </div>
  );
};

export default StarRating;
