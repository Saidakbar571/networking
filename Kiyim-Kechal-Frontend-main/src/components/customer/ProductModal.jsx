import React, { useState, useEffect } from "react";
import { productImage, handleImageError, formatPrice, ratingFor } from "../../utils/catalog.js";
import { IconClose, IconBag } from "../Icons.jsx";
import Stars from "./Stars.jsx";

function ProductModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;
  const rating = ratingFor(product);

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <div className="pd-grid">
          <div className="pd-media">
            <img src={productImage(product)} alt={product.name} onError={handleImageError(product)} />
          </div>
          <div className="pd-info">
            <button className="modal-x" onClick={onClose} style={{ alignSelf: "flex-end" }}>
              <IconClose width={18} height={18} />
            </button>
            <span className="eyebrow">{product.category?.name}</span>
            <h2>{product.name}</h2>
            {rating ? (
              <Stars value={rating.avg} count={rating.count} />
            ) : (
              <span className="pc-cat">Yangi keldi</span>
            )}
            <div className="pd-price">{formatPrice(product.price)}</div>
            <p className="pd-desc">{product.description}</p>

            <div className="pd-meta">
              <div>
                <div className="k">Kategoriya</div>
                <div className="v">{product.category?.name}</div>
              </div>
              <div>
                <div className="k">Kod</div>
                <div className="v">LBS-{String(product.id).padStart(4, "0")}</div>
              </div>
              <div>
                <div className="k">Mavjudligi</div>
                <div className="v">Sotuvda bor</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: "auto", alignItems: "center" }}>
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ flex: 1 }}
                onClick={() => { onAdd(product, qty); onClose(); }}
              >
                <IconBag width={18} height={18} /> Savatchaga · {formatPrice(product.price * qty)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
