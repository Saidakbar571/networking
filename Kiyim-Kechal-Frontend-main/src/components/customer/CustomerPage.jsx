import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductApi from "../../api/ProductApi.jsx";
import CategoryApi from "../../api/CategoryApi.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import CategoryList from "./CategoryList.jsx";
import ProductGrid from "./ProductGrid.jsx";
import ProductModal from "./ProductModal.jsx";
import { IconSearch, IconArrowRight } from "../Icons.jsx";

const SORTS = {
  featured: { label: "Tavsiya etilgan", fn: (a, b) => a.id - b.id },
  "price-asc": { label: "Narx: arzondan qimmatga", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Narx: qimmatdan arzonga", fn: (a, b) => b.price - a.price },
  name: { label: "Alifbo bo'yicha", fn: (a, b) => a.name.localeCompare(b.name) },
};

function CustomerPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [active, setActive] = useState(null);

  const { add, openCart } = useCart();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          ProductApi.fetchAllProducts(),
          CategoryApi.fetchCategory(),
        ]);
        if (!alive) return;
        setProducts(prodRes.data || []);
        setCategories(catRes.data || []);
      } catch {
        if (alive) toast.error("Kolleksiyani yuklab bo'lmadi.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [toast]);

  const visible = useMemo(() => {
    let list = products;
    if (selectedCat != null) list = list.filter((p) => p.category?.id === selectedCat);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q)
      );
    }
    return [...list].sort(SORTS[sort].fn);
  }, [products, selectedCat, query, sort]);

  const handleAdd = (product, qty = 1) => {
    if (!isAuthenticated) {
      toast.show("Xarid qilish uchun avval tizimga kiring");
      navigate("/login", { state: { from: location } });
      return;
    }
    add(product, qty);
    toast.success(`${product.name} savatchaga qo'shildi`);
  };

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero" id="new">
        <div className="hero-art" />
        <div className="hero-inner">
          <span className="eyebrow">Yangi mavsum / 2026</span>
          <h1>Sodda. Sifatli. Sizniki.</h1>
          <p>
            Tanlangan kiyimlar to'plami — tabiiy matolar, halol tikuv, va yillar
            davomida siz bilan qoladigan asoslar.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#collection">
              Kolleksiyani ko'rish <IconArrowRight width={18} height={18} />
            </a>
            <button className="btn btn-ghost btn-lg" onClick={openCart}>
              Savatcha
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="n">{products.length || "—"}</div><div className="l">Buyumlar</div></div>
            <div className="hero-stat"><div className="n">{categories.length || "—"}</div><div className="l">Kategoriyalar</div></div>
            <div className="hero-stat"><div className="n">100%</div><div className="l">Sifat</div></div>
          </div>
        </div>
      </section>

      {/* Collection header */}
      <div id="collection" style={{ marginBottom: 24 }}>
        <span className="eyebrow">Kolleksiya</span>
        <h2 className="section-title" style={{ marginTop: 10 }}>
          {selectedCat
            ? categories.find((c) => c.id === selectedCat)?.name
            : "Barcha buyumlar"}
        </h2>
      </div>

      {/* Category chips */}
      <CategoryList categories={categories} selected={selectedCat} onSelect={setSelectedCat} />

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search">
          <IconSearch width={18} height={18} />
          <input
            placeholder="Buyum, mato, kategoriya bo'yicha qidirish…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          {Object.entries(SORTS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {!loading && (
        <p className="section-sub" style={{ marginBottom: 24 }}>
          {visible.length} ta buyum
        </p>
      )}

      <ProductGrid products={visible} loading={loading} onOpen={setActive} onAdd={handleAdd} />

      <ProductModal product={active} onClose={() => setActive(null)} onAdd={handleAdd} />
    </div>
  );
}

export default CustomerPage;
