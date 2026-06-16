import React from "react";
import ProductCard from "./ProductCard.jsx";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="sk sk-media" />
      <div className="sk sk-line" style={{ width: "40%" }} />
      <div className="sk sk-line" style={{ width: "75%" }} />
      <div className="sk sk-line" style={{ width: "55%", marginBottom: 20 }} />
    </div>
  );
}

function ProductGrid({ products, loading, onOpen, onAdd }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="state">
        <div className="state-ic">⌀</div>
        <h3>No pieces found</h3>
        <p>Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default ProductGrid;
