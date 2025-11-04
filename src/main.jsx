// src/main.jsx
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence } from "framer-motion";
import App from "./App";
import "./index.css";
import { createPortal } from "react-dom";

/* -------------------------
   Inject Google Inter font
   ------------------------- */
function injectFont() {
  const id = "google-font-inter";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap";
  document.head.appendChild(link);
}

/* -------------------------
   Tiny custom cursor component
   ------------------------- */
function Cursor() {
  useEffect(() => {
    // Don't show on touch devices
    if ("ontouchstart" in window) return;

    // Create cursor element
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    Object.assign(cursor.style, {
      position: "fixed",
      pointerEvents: "none",
      width: "14px",
      height: "14px",
      borderRadius: "999px",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.09s linear, background-color 0.15s linear, opacity 0.15s linear",
      background: "rgba(255,255,255,0.85)",
      mixBlendMode: "screen",
      zIndex: 9999,
      willChange: "transform",
      boxShadow: "0 4px 18px rgba(0,0,0,0.35)",
      opacity: "0.95",
    });

    document.body.appendChild(cursor);

    function move(e) {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1)`;
    }

    function down() {
      cursor.style.transform += " scale(0.9)";
      cursor.style.opacity = "0.8";
    }
    function up() {
      cursor.style.opacity = "0.95";
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    // Hide the default cursor for the body so our cursor is visible
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.body.style.cursor = prev;
      cursor.remove();
    };
  }, []);

  // This React component does not render into the React root — we used a direct DOM node.
  return null;
}

/* -------------------------
   Root component
   ------------------------- */
function Root() {
  useEffect(() => {
    injectFont();

    // small accessibility focus outline improvement for keyboard users
    function handleFirstTab(e) {
      if (e.key === "Tab") {
        document.documentElement.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    }
    window.addEventListener("keydown", handleFirstTab);
    return () => window.removeEventListener("keydown", handleFirstTab);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <App />
      </AnimatePresence>
      <Cursor />
      {/* optional: small accessibility helper for skip link (can be styled in CSS) */}
      {createPortal(
        <a
          href="#main"
          className="sr-only focus:not-sr-only"
          style={{
            position: "absolute",
            left: 8,
            top: 8,
            padding: "6px 10px",
            background: "white",
            color: "black",
            borderRadius: 6,
            zIndex: 9999,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Skip to content
        </a>,
        document.body
      )}
    </>
  );
}

/* -------------------------
   Mount to DOM
   ------------------------- */
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
