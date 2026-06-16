import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/customer/CartDrawer.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import CustomerPage from "./components/customer/CustomerPage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./App.css";

function FullLoader() {
  return (
    <div className="page-loader">
      <span className="spinner dark" />
    </div>
  );
}

// Admin guard: requires an authenticated admin. Everyone else is redirected.
function AdminRoute({ children }) {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  if (loading) return <FullLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

// Keep authenticated users away from the auth pages.
function GuestOnly({ children }) {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  if (loading) return <FullLoader />;
  if (isAuthenticated) return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  return children;
}

function NotFound() {
  return (
    <div className="container">
      <div className="state">
        <div className="state-ic">✕</div>
        <h3>Sahifa topilmadi</h3>
        <p>Siz qidirayotgan sahifa mavjud emas.</p>
      </div>
    </div>
  );
}

function Shell() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          {/* Public storefront — anyone can browse without signing in */}
          <Route path="/" element={<CustomerPage />} />
          <Route path="/customer" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
          <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />
          {/* Admin console — requires an admin login */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <Shell />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
