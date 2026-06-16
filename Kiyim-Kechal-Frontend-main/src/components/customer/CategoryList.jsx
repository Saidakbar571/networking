import React from "react";
import { categoryIconPath } from "../../utils/catalog.js";

function ChipIcon({ name }) {
  return (
    <svg className="chip-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={categoryIconPath(name)} />
    </svg>
  );
}

function CategoryList({ categories, selected, onSelect }) {
  return (
    <div className="chips">
      <button
        className={`chip ${selected == null ? "active" : ""}`}
        onClick={() => onSelect(null)}
      >
        All Pieces
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`chip ${selected === cat.id ? "active" : ""}`}
          onClick={() => onSelect(cat.id)}
        >
          <ChipIcon name={cat.name} />
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
