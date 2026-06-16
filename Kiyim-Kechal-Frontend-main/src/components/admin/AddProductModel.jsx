import React, { useState, useEffect } from "react";
import ProductApi from "../../api/ProductApi.jsx";
import CategoryApi from "../../api/CategoryApi.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { formatPrice } from "../../utils/catalog.js";
import { IconClose } from "../Icons.jsx";

const EMPTY = { name: "", description: "", price: "", image_url: "", category_id: "" };

function AddProductModal({ isOpen, onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!isOpen) return;
    setData(EMPTY);
    CategoryApi.fetchCategory()
      .then((res) => {
        setCategories(res.data || []);
        if (res.data?.length) {
          setData((d) => ({ ...d, category_id: res.data[0].id }));
        }
      })
      .catch(() => toast.error("Kategoriyalarni yuklab bo'lmadi."));
  }, [isOpen, toast]);

  if (!isOpen) return null;

  const change = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.category_id) { toast.error("Avval kategoriya tanlang."); return; }
    setLoading(true);
    try {
      await ProductApi.createProduct({
        name: data.name.trim(),
        description: data.description.trim(),
        price: parseFloat(data.price),
        image_url: data.image_url.trim() || null,
        category_id: parseInt(data.category_id, 10),
      });
      toast.success("Mahsulot yaratildi");
      onSuccess?.();
      onClose();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d) => d.msg).join(", ")
        : detail || "Mahsulotni yaratib bo'lmadi.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Yangi mahsulot</h2>
          <button className="modal-x" onClick={onClose}><IconClose width={18} height={18} /></button>
        </div>
        <div className="modal-body">
          {categories.length === 0 ? (
            <div className="form-note">
              Avval kategoriya yarating — har bir mahsulot kategoriyaga tegishli bo'lishi kerak.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="p-cat">Kategoriya</label>
                <select id="p-cat" className="select" name="category_id" value={data.category_id} onChange={change} required>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="p-name">Mahsulot nomi</label>
                <input id="p-name" className="input" name="name" value={data.name} onChange={change} placeholder="masalan, Paxta futbolka" required />
              </div>
              <div className="field">
                <label htmlFor="p-desc">Tavsif</label>
                <textarea id="p-desc" className="textarea" name="description" value={data.description} onChange={change} placeholder="Mato, bichim, sifat…" required />
              </div>
              <div className="field">
                <label htmlFor="p-img">Rasm URL <span style={{ textTransform: "none", color: "var(--muted)", fontWeight: 400 }}>(ixtiyoriy)</span></label>
                <input id="p-img" className="input" name="image_url" value={data.image_url} onChange={change} placeholder="https://… (bo'sh qoldiring — avtomatik rasm)" />
              </div>
              <div className="field">
                <label htmlFor="p-price">Narx (USD)</label>
                <input id="p-price" className="input" type="number" min="0" step="0.01" name="price" value={data.price} onChange={change} placeholder="89.00" required />
                {data.price && (
                  <p className="section-sub" style={{ marginTop: 6 }}>
                    Ko'rinishi: {formatPrice(parseFloat(data.price) || 0)}
                  </p>
                )}
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? <span className="spinner" /> : "Yaratish"}
                </button>
                <button className="btn btn-ghost" type="button" onClick={onClose}>Bekor qilish</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
