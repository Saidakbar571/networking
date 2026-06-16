import React, { useState } from "react";
import { productImage, handleImageError, formatPrice, ratingFor } from "../../utils/catalog.js";
import { IconHeart, IconBag } from "../Icons.jsx";
import Stars from "./Stars.jsx";

function ProductCard({ product, onOpen, onAdd }) {
  const [fav, setFav] = useState(false);
  const rating = ratingFor(product);
  const img = productImage(product);

  return (
    <article className="product-card" onClick={() => onOpen(product)}>
      <div className="pc-media">
        <span className="pc-badge">{product.category?.name || "Yangi"}</span>
        <button
          className={`pc-fav ${fav ? "on" : ""}`}
          aria-label="Sevimlilarga qo'shish"
          onClick={(e) => { e.stopPropagation(); setFav((f) => !f); }}
        >
          <IconHeart width={17} height={17} fill={fav ? "currentColor" : "none"} />
        </button>
        <img src={img} alt={product.name} loading="lazy" onError={handleImageError(product)} />
        <div className="pc-add">
          <button
            className="btn btn-primary btn-block"
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          >
            <IconBag width={17} height={17} /> Savatchaga
          </button>
        </div>
      </div>

      <div className="pc-body">
        <span className="pc-cat">{product.category?.name}</span>
        <h3 className="pc-name">{product.name}</h3>
        <p className="pc-desc">{product.description}</p>
        <div className="pc-foot">
          <span className="pc-price">{formatPrice(product.price)}</span>
          {rating ? (
            <Stars value={rating.avg} count={rating.count} />
          ) : (
            <span className="pc-cat">Yangi</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
