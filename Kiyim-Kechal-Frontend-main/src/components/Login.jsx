import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(username.trim(), password);
      toast.success(`Xush kelibsiz, ${user.username}`);
      const dest = user.role === "admin" ? "/admin" : (location.state?.from?.pathname || "/");
      navigate(dest, { replace: true });
    } catch (err) {
      const detail = err?.response?.status === 401
        ? "Foydalanuvchi nomi yoki parol noto'g'ri."
        : "Tizimga kirib bo'lmadi. Server bilan ulanishni tekshiring.";
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  const fill = (u, p) => { setUsername(u); setPassword(p); };

  return (
    <div className="auth">
      <aside className="auth-aside">
        <div className="auth-aside-inner">
          <span className="eyebrow">LIBOSLAR</span>
          <h2>Soddalik — eng yuqori did.</h2>
          <p>
            Tanlangan kiyimlar to'plamiga kiring — sifatli matolardan tikilgan,
            har kun va har mavsumga mos liboslar.
          </p>
          <div className="auth-quote">"Uslub — bu o'zini bilish."</div>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <h1>Xush kelibsiz</h1>
          <p className="sub">Hisobingizga kiring va xaridni davom ettiring.</p>

          {location.state?.signupSuccess && (
            <div className="form-note">Hisob yaratildi. Endi tizimga kiring.</div>
          )}
          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="lg-user">Foydalanuvchi nomi</label>
              <input
                id="lg-user" className="input" type="text" autoComplete="username"
                placeholder="Foydalanuvchi nomingizni kiriting" value={username}
                onChange={(e) => setUsername(e.target.value)} required
              />
            </div>
            <div className="field">
              <label htmlFor="lg-pass">Parol</label>
              <div className="input-wrap">
                <input
                  id="lg-pass" className="input" type={showPw ? "text" : "password"}
                  autoComplete="current-password" placeholder="Parolingizni kiriting"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />
                <button type="button" className="toggle-eye" onClick={() => setShowPw((s) => !s)}>
                  {showPw ? "YASHIR" : "KO'RSAT"}
                </button>
              </div>
            </div>
            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : "Kirish"}
            </button>
          </form>

          <div className="demo-creds">
            <b>Demo hisoblar</b> — bosib to'ldiring:<br />
            <a onClick={() => fill("user", "user12345")} style={{ cursor: "pointer" }}>
              Mijoz: <code>user / user12345</code>
            </a><br />
            <a onClick={() => fill("admin", "admin12345")} style={{ cursor: "pointer" }}>
              Admin: <code>admin / admin12345</code>
            </a>
          </div>

          <p className="auth-alt">
            LIBOSLAR'da yangimisiz? <Link to="/signup">Hisob yaratish</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
