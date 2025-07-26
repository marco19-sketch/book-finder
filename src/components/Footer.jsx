// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

export default function Footer({ creditText }) {
  return (
    <footer className="site-footer">
      <div className="image-credit">
       {creditText}
      </div>
    </footer>
  );
}
