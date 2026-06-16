import React from "react";
import { IconStar } from "../Icons.jsx";

// Renders 5 stars filled up to `value`. `count` shows the number of reviews.
function Stars({ value = 0, count }) {
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} filled={i <= Math.round(value)} width={13} height={13} />
      ))}
      {count != null && <span className="count">({count})</span>}
    </span>
  );
}

export default Stars;
