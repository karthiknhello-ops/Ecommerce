"use client";
import Navbar from "./componenets/navBar/page";
import ProductCard from "./componenets/productCard/page";
import { useEffect, useState } from "react";

/* ─── Google Fonts injected once ─── */
if (typeof document !== "undefined") {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

const styles = `
  :root {
    --ink:   #0d0f14;
    --card:  #141720;
    --rim:   #1e2230;
    --amber: #f0a500;
    --amber-dim: #c48200;
    --fog:   #8892a4;
    --snow:  #eef1f7;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--ink);
    color: var(--snow);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* ── PAGE WRAPPER ── */
  .hp-root {
    min-height: 100vh;
    background: var(--ink);
    overflow-x: hidden;
  }

  /* ── NOISE OVERLAY ── */
  .hp-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  .hp-inner {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    margin: 32px 0 64px;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--rim);
    background: var(--card);
    min-height: 340px;
    display: flex;
    align-items: stretch;
  }

  .hero-left {
    flex: 1;
    padding: 56px 56px 56px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--amber);
    margin-bottom: 20px;
  }

  .hero-eyebrow span.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--amber);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 600;
    line-height: 1.08;
    color: var(--snow);
    margin-bottom: 16px;
    letter-spacing: -0.01em;
  }

  .hero-title em {
    font-style: italic;
    color: var(--amber);
  }

  .hero-sub {
    font-size: 15px;
    color: var(--fog);
    line-height: 1.65;
    max-width: 360px;
    margin-bottom: 36px;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--amber);
    color: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.04em;
    padding: 14px 28px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    width: fit-content;
  }

  .hero-cta:hover {
    background: #ffb820;
    transform: translateY(-2px);
  }

  .hero-cta svg { transition: transform 0.2s; }
  .hero-cta:hover svg { transform: translateX(4px); }

  .hero-right {
    width: 320px;
    flex-shrink: 0;
    position: relative;
    display: none;
  }

  @media (min-width: 768px) { .hero-right { display: block; } }

  .hero-right-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1a1f30 0%, #0d1020 100%);
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.5;
  }

  .orb1 {
    width: 220px; height: 220px;
    background: var(--amber);
    top: -40px; right: -40px;
    opacity: 0.18;
  }

  .orb2 {
    width: 160px; height: 160px;
    background: #5060f0;
    bottom: -20px; left: -20px;
    opacity: 0.2;
  }

  .hero-badge-grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 28px;
    align-content: center;
  }

  .hero-stat {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 18px 16px;
    backdrop-filter: blur(10px);
  }

  .hero-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--amber);
    line-height: 1;
    margin-bottom: 4px;
  }

  .hero-stat-label {
    font-size: 11px;
    color: var(--fog);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* ── SECTION HEADER ── */
  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--snow);
    letter-spacing: -0.01em;
  }

  .section-title span {
    color: var(--amber);
  }

  .section-line {
    display: block;
    width: 36px;
    height: 2px;
    background: var(--amber);
    margin-top: 8px;
  }

  .view-all-btn {
    font-size: 13px;
    color: var(--fog);
    background: none;
    border: 1px solid var(--rim);
    border-radius: 8px;
    padding: 8px 18px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.05em;
  }

  .view-all-btn:hover {
    color: var(--snow);
    border-color: var(--fog);
  }

  /* ── CATEGORY PILLS ── */
  .cat-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .cat-pill {
    padding: 7px 18px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.18s;
    border: 1px solid var(--rim);
    color: var(--fog);
    background: transparent;
    font-family: 'DM Sans', sans-serif;
  }

  .cat-pill.active, .cat-pill:hover {
    background: var(--amber);
    border-color: var(--amber);
    color: #0a0c10;
    font-weight: 500;
  }

  /* ── PRODUCT GRID ── */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding-bottom: 80px;
  }

  @media (min-width: 560px)  { .product-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 768px)  { .product-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (min-width: 1024px) { .product-grid { grid-template-columns: repeat(5, 1fr); } }

  /* ── SKELETON ── */
  .skeleton-card {
    border-radius: 16px;
    background: var(--card);
    border: 1px solid var(--rim);
    overflow: hidden;
    height: 280px;
  }

  .skeleton-img {
    width: 100%;
    height: 60%;
    background: linear-gradient(90deg, var(--rim) 25%, #262d3e 50%, var(--rim) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  .skeleton-body { padding: 14px; }

  .skeleton-line {
    height: 10px;
    border-radius: 6px;
    background: linear-gradient(90deg, var(--rim) 25%, #262d3e 50%, var(--rim) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    margin-bottom: 10px;
  }

  .skeleton-line.short { width: 55%; }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── PRODUCT CARD OVERRIDE ── */
  /* These styles target the ProductCard wrapper.
     Adjust selectors if your ProductCard uses specific class names. */
  .product-grid > * {
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .product-grid > *:nth-child(1)  { animation-delay: 0.04s; }
  .product-grid > *:nth-child(2)  { animation-delay: 0.08s; }
  .product-grid > *:nth-child(3)  { animation-delay: 0.12s; }
  .product-grid > *:nth-child(4)  { animation-delay: 0.16s; }
  .product-grid > *:nth-child(5)  { animation-delay: 0.20s; }
  .product-grid > *:nth-child(6)  { animation-delay: 0.24s; }
  .product-grid > *:nth-child(7)  { animation-delay: 0.28s; }
  .product-grid > *:nth-child(8)  { animation-delay: 0.32s; }
  .product-grid > *:nth-child(9)  { animation-delay: 0.36s; }
  .product-grid > *:nth-child(10) { animation-delay: 0.40s; }
`;

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Books", "Sports"];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/get");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <style>{styles}</style>
      <div className="hp-root">
        <Navbar />

        <div className="hp-inner">

          {/* ── HERO ── */}
          <div className="hero">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <span className="dot" />
                New arrivals · Spring 2026
              </div>
              <h1 className="hero-title">
                Curated for<br />
                <em>those who know.</em>
              </h1>
              <p className="hero-sub">
                Trending products, editor-picked deals, and best-sellers
                — assembled so you don't have to look twice.
              </p>
              <button className="hero-cta">
                Explore Collection
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="hero-right">
              <div className="hero-right-bg" />
              <div className="hero-orb orb1" />
              <div className="hero-orb orb2" />
              <div className="hero-badge-grid">
                {[
                  { num: "12K+", label: "Products" },
                  { num: "4.9★", label: "Avg. Rating" },
                  { num: "Free", label: "Shipping" },
                  { num: "24h", label: "Support" },
                ].map((s) => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-num">{s.num}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SECTION HEADER ── */}
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Trending <span>Now</span>
              </h2>
              <span className="section-line" />
            </div>
            <button className="view-all-btn">View all →</button>
          </div>

          {/* ── CATEGORY FILTER ── */}
          <div className="cat-bar">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`cat-pill ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* ── PRODUCT GRID ── */}
          {loading ? (
            <div className="product-grid">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-img" />
                  <div className="skeleton-body">
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}