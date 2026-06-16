import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserApi from "../api/UserApi.jsx";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (username.trim().length < 3) return "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lsin.";
    if (password.length < 6) return "Parol kamida 6 ta belgidan iborat bo'lsin.";
    if (password !== confirm) return "Parollar mos kelmadi.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError("");
    setLoading(true);
    try {
      await UserApi.signup(username.trim(), password);
      navigate("/login", { state: { signupSuccess: true } });
    } catch (err) {
      const detail = err?.response?.status === 409
        ? "Bu foydalanuvchi nomi band. Boshqasini tanlang."
        : err?.response?.data?.detail || "Ro'yxatdan o'tib bo'lmadi. Qaytadan urinib ko'ring.";
      setError(typeof detail === "string" ? detail : "Ro'yxatdan o'tib bo'lmadi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <aside className="auth-aside">
        <div className="auth-aside-inner">
          <span className="eyebrow">LIBOSLAR'ga qo'shiling</span>
          <h2>O'z uslubingizni shu yerdan boshlang.</h2>
          <p>
            Hisob yarating — sevimli buyumlaringizni saqlang, yangi mavsum
            kelganda birinchilardan bo'lib bilib oling.
          </p>
          <div className="auth-quote">"Kamroq sotib oling, yaxshi tanlang, uzoq kiying."</div>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <h1>Hisob yaratish</h1>
          <p className="sub">Bir daqiqadan kamroq vaqt oladi.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="su-user">Foydalanuvchi nomi</label>
              <input
                id="su-user" className="input" type="text" autoComplete="username"
                placeholder="Foydalanuvchi nomini tanlang" value={username}
                onChange={(e) => setUsername(e.target.value)} required
              />
            </div>
            <div className="field">
              <label htmlFor="su-pass">Parol</label>
              <div className="input-wrap">
                <input
                  id="su-pass" className="input" type={showPw ? "text" : "password"}
                  autoComplete="new-password" placeholder="Kamida 6 ta belgi"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />
                <button type="button" className="toggle-eye" onClick={() => setShowPw((s) => !s)}>
                  {showPw ? "YASHIR" : "KO'RSAT"}
                </button>
              </div>
            </div>
            <div className="field">
              <label htmlFor="su-conf">Parolni tasdiqlang</label>
              <input
                id="su-conf" className="input" type={showPw ? "text" : "password"}
                autoComplete="new-password" placeholder="Parolni qaytadan kiriting"
                value={confirm} onChange={(e) => setConfirm(e.target.value)} required
              />
            </div>
            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : "Hisob yaratish"}
            </button>
          </form>

          <p className="auth-alt">
            Hisobingiz bormi? <Link to="/login">Kirish</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;
