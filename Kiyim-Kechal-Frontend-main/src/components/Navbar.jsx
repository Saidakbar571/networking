import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { initials } from "../utils/catalog.js";
import { IconBag, IconLogout } from "./Icons.jsx";

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { count, openCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand" aria-label="LIBOSLAR home">
          <span className="brand-mark">LIBOSLAR</span>
        </NavLink>

        <div className="nav-links">
          {isAdmin ? (
            <>
              <NavLink to="/admin" className="nav-link">Boshqaruv</NavLink>
              <NavLink to="/" className="nav-link">Do'kon</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" end className="nav-link">Do'kon</NavLink>
              <a className="nav-link" href="#new">Yangiliklar</a>
              <a className="nav-link" href="#about">Biz haqimizda</a>
            </>
          )}
        </div>

        <div className="nav-right">
          {isAuthenticated ? (
            <>
              {!isAdmin && (
                <button className="icon-btn" onClick={openCart} aria-label="Open cart">
                  <IconBag />
                  {count > 0 && <span className="cart-count">{count}</span>}
                </button>
              )}
              <div className="user-chip">
                <span className="role-tag">{user.role}</span>
                <span className="uname">{user.username}</span>
                <span className="avatar">{initials(user.username)}</span>
              </div>
              <button className="icon-btn" onClick={handleLogout} aria-label="Log out" title="Log out">
                <IconLogout />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-ghost">Sign in</NavLink>
              <NavLink to="/signup" className="btn btn-primary">Create account</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
