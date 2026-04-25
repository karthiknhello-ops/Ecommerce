"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const cardStyles = `
  .pc-wrap {
    position: relative;
    border-radius: 16px;
    background: #141720;
    border: 1px solid #1e2230;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
    font-family: 'DM Sans', sans-serif;
  }

  .pc-wrap:hover {
    transform: translateY(-5px);
    border-color: #f0a500;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,165,0,0.15);
  }

  /* Image container */
  .pc-img-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background: #0d0f14;
    overflow: hidden;
  }

  .pc-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .pc-wrap:hover .pc-img {
    transform: scale(1.06);
  }

  /* Badge */
  .pc-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(240,165,0,0.15);
    border: 1px solid rgba(240,165,0,0.3);
    color: #f0a500;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    backdrop-filter: blur(8px);
  }

  /* Wishlist */
  .pc-wish {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(13,15,20,0.7);
    border: 1px solid #1e2230;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
    opacity: 0;
    transform: scale(0.85);
  }

  .pc-wrap:hover .pc-wish {
    opacity: 1;
    transform: scale(1);
  }

  .pc-wish:hover {
    background: rgba(240,165,0,0.2);
    border-color: #f0a500;
  }

  .pc-wish svg { transition: fill 0.2s; }
  .pc-wish.liked svg { fill: #f0a500; stroke: #f0a500; }

  /* Body */
  .pc-body {
    padding: 14px 14px 16px;
  }

  .pc-category {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #8892a4;
    margin-bottom: 5px;
  }

  .pc-title {
    font-size: 14px;
    font-weight: 500;
    color: #eef1f7;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .pc-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .pc-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 700;
    color: #f0a500;
    line-height: 1;
  }

  .pc-price span {
    font-size: 12px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #8892a4;
    margin-left: 2px;
  }

  .pc-add {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #f0a500;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.15s;
    flex-shrink: 0;
  }

  .pc-add:hover {
    background: #ffb820;
    transform: scale(1.08);
  }

  .pc-add:active { transform: scale(0.95); }

  /* Stock indicator */
  .pc-stock {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pc-stock-bar {
    flex: 1;
    height: 3px;
    background: #1e2230;
    border-radius: 999px;
    overflow: hidden;
  }

  .pc-stock-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #f0a500, #ff6b35);
    transition: width 0.4s ease;
  }

  .pc-stock-text {
    font-size: 10px;
    color: #8892a4;
    white-space: nowrap;
  }
`;

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
if (!product) return null;

const {
  title,
  description,
  price,
  image,
  category,
  stock
} = product;
  
  const stockPct = Math.min(100, Math.round((stock / 100) * 100));
  const isLowStock = stock < 20;

const handleAdd = async (e) => {
  e.stopPropagation();

  try {
    setAdded(true);

    const res = await fetch("/api/cart/post", {
      method: "POST",
      credentials: "include", // 🔥 VERY IMPORTANT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      alert(data.message || "Failed to add to cart");
      return;
    }

  } catch (err) {
    console.error(err);
    alert("Error adding to cart");
  }

  setTimeout(() => setAdded(false), 1400);
};

  return (
    <>
      <style>{cardStyles}</style>
      
      <ProductCard product={product} />
      <div className="pc-wrap">
        {/* Image */}
        <div className="pc-img-wrap">
          <img
            src={image}
            alt={title}
            className="pc-img"
            onError={(e) => {
              e.currentTarget.src =
                `https://placehold.co/400x400/141720/8892a4?text=${encodeURIComponent(category)}`;
            }}
          />
          <div className="pc-badge">{category}</div>
          <button
            className={`pc-wish ${liked ? "liked" : ""}`}
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="#eef1f7" strokeWidth="2" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="pc-body">
          <div className="pc-category">{category}</div>
          <div className="pc-title">{title}</div>

          <div className="pc-footer">
            <div className="pc-price">
              ₹{price.toLocaleString("en-IN")}
              <span>INR</span>
            </div>
            <button className="pc-add" onClick={handleAdd} title="Add to cart">
              {added ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </button>
          </div>

          {/* Stock bar */}
          <div className="pc-stock">
            <div className="pc-stock-bar">
              <div className="pc-stock-fill" style={{ width: `${stockPct}%` }} />
            </div>
            <div className="pc-stock-text">
              {isLowStock ? `Only ${stock} left!` : `${stock} in stock`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}