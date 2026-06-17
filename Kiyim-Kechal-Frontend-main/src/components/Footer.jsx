import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="brand-mark">ghcfgfjvjh</span>
        <span>Sifatli liboslar — har kuni uchun, har bir mavsumda.</span>
        <span>© {new Date().getFullYear()} LIBOSLAR</span>
      </div>
    </footer>
  );
}

export default Footer;
