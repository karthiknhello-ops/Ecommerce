"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/componenets/navBar/page";
import { useRouter } from "next/navigation";
import InvalidUser from "@/app/lib/invalidUser/page";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:   #0d0f14;
    --card:  #141720;
    --rim:   #1e2230;
    --rim2:  #262d3e;
    --amber: #f0a500;
    --fog:   #8892a4;
    --snow:  #eef1f7;
    --red:   #ff4d4d;
  }

  .cp-root {
    min-height: 100vh;
    background: var(--ink);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--snow);
  }

  /* noise */
  .cp-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  .cp-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }

  /* ── Page header ── */
  .cp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 36px;
  }

  .cp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1;
  }
  .cp-title em { font-style: italic; color: var(--amber); }

  .cp-count {
    font-size: 13px;
    color: var(--fog);
    margin-top: 6px;
  }

  .cp-clear-btn {
    background: none;
    border: 1px solid var(--rim2);
    color: var(--fog);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .cp-clear-btn:hover { color: var(--red); border-color: var(--red); }

  /* ── Layout ── */
  .cp-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 768px) {
    .cp-layout { grid-template-columns: 1fr 340px; align-items: start; }
  }

  /* ── Cart item card ── */
  .cp-item {
    display: flex;
    gap: 16px;
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 18px;
    padding: 18px;
    margin-bottom: 14px;
    transition: border-color 0.2s, transform 0.2s;
    animation: itemIn 0.35s ease both;
  }

  @keyframes itemIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cp-item:hover { border-color: var(--rim2); }

  /* Image */
  .cp-img-wrap {
    width: 90px; height: 90px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--ink);
    border: 1px solid var(--rim);
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }

  .cp-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  .cp-item:hover .cp-img { transform: scale(1.06); }

  /* Info */
  .cp-info { flex: 1; min-width: 0; }

  .cp-cat {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--fog);
    margin-bottom: 4px;
  }

  .cp-name {
    font-size: 15px;
    font-weight: 500;
    color: var(--snow);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 6px;
  }

  .cp-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--amber);
    line-height: 1;
    margin-bottom: 12px;
  }

  /* Qty controls */
  .cp-qty {
    display: inline-flex;
    align-items: center;
    gap: 0;
    background: var(--ink);
    border: 1px solid var(--rim2);
    border-radius: 10px;
    overflow: hidden;
  }

  .cp-qty-btn {
    width: 34px; height: 34px;
    background: none;
    border: none;
    color: var(--fog);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
    font-size: 16px;
  }
  .cp-qty-btn:hover { background: var(--rim); color: var(--snow); }
  .cp-qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  .cp-qty-val {
    min-width: 32px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--snow);
    border-left: 1px solid var(--rim2);
    border-right: 1px solid var(--rim2);
    height: 34px;
    line-height: 34px;
  }

  /* Remove */
  .cp-remove {
    background: none;
    border: none;
    color: var(--fog);
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.2s, background 0.2s;
    align-self: flex-start;
    flex-shrink: 0;
  }
  .cp-remove:hover { color: var(--red); background: rgba(255,77,77,0.08); }

  /* Item subtotal */
  .cp-subtotal {
    font-size: 12px;
    color: var(--fog);
    margin-top: 8px;
  }

  /* ── Summary panel ── */
  .cp-summary {
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 20px;
    padding: 28px 24px;
    position: sticky;
    top: 24px;
  }

  .cp-summary-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--snow);
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--rim);
  }

  .cp-summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13.5px;
    color: var(--fog);
    margin-bottom: 12px;
  }

  .cp-summary-row span:last-child { color: var(--snow); }

  .cp-divider-line {
    height: 1px;
    background: var(--rim);
    margin: 16px 0;
  }

  .cp-summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .cp-summary-total-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--snow);
  }

  .cp-summary-total-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--amber);
    line-height: 1;
  }

  .cp-savings {
    font-size: 11.5px;
    color: #4ade80;
    text-align: right;
    margin-bottom: 20px;
  }

  /* Promo */
  .cp-promo {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }

  .cp-promo-input {
    flex: 1;
    padding: 11px 14px;
    background: var(--ink);
    border: 1px solid var(--rim2);
    border-radius: 10px;
    color: var(--snow);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s;
  }
  .cp-promo-input::placeholder { color: #4a5168; }
  .cp-promo-input:focus { border-color: var(--amber); }

  .cp-promo-btn {
    padding: 11px 16px;
    border-radius: 10px;
    border: 1px solid var(--rim2);
    background: var(--rim);
    color: var(--fog);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }
  .cp-promo-btn:hover { color: var(--amber); border-color: var(--amber); }

  /* Checkout */
  .cp-checkout-btn {
    width: 100%;
    padding: 15px;
    border-radius: 12px;
    border: none;
    background: var(--amber);
    color: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .cp-checkout-btn:hover {
    background: #ffb820;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240,165,0,0.3);
  }
  .cp-checkout-btn:active { transform: scale(0.98); }

  .cp-continue {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 12.5px;
    color: var(--fog);
    cursor: pointer;
    transition: color 0.2s;
  }
  .cp-continue:hover { color: var(--snow); }

  /* Trust badges */
  .cp-badges {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--rim);
  }

  .cp-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .cp-badge-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: rgba(240,165,0,0.1);
    border: 1px solid rgba(240,165,0,0.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--amber);
  }

  .cp-badge-label { font-size: 10px; color: var(--fog); text-align: center; }

  /* ── Empty state ── */
  .cp-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    text-align: center;
  }

  .cp-empty-icon {
    width: 72px; height: 72px;
    border-radius: 20px;
    background: var(--card);
    border: 1px solid var(--rim);
    display: flex; align-items: center; justify-content: center;
    color: var(--fog);
    margin-bottom: 20px;
  }

  .cp-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--snow);
    margin-bottom: 8px;
  }

  .cp-empty-sub {
    font-size: 14px;
    color: var(--fog);
    margin-bottom: 28px;
  }

  .cp-shop-btn {
    padding: 13px 32px;
    border-radius: 12px;
    border: none;
    background: var(--amber);
    color: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: background 0.2s, transform 0.15s;
  }
  .cp-shop-btn:hover { background: #ffb820; transform: translateY(-2px); }
`;

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [promo, setPromo]   = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const res  = await fetch("/api/cart/get", { credentials: "include" });
      const data = await res.json();
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQty = async (productId, quantity) => {
    await fetch("/api/cart/put", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await fetch("/api/cart/delete", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
  };

  const total     = cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  const itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const shipping  = total > 999 ? 0 : 99;
  const grandTotal = total + shipping;

  return (
    <>
      <style>{styles}</style>
      <div className="cp-root">
        <InvalidUser />
        <Navbar />

        <div className="cp-inner">

          {/* Header */}
          <div className="cp-header">
            <div>
              <h1 className="cp-title">Your <em>Cart</em></h1>
              <p className="cp-count">{itemCount} item{itemCount !== 1 ? "s" : ""} in your bag</p>
            </div>
            {cart.items.length > 0 && (
              <button className="cp-clear-btn">Clear all</button>
            )}
          </div>

          {cart.items.length === 0 ? (

            /* ── Empty state ── */
            <div className="cp-empty">
              <div className="cp-empty-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <h2 className="cp-empty-title">Your cart is <em>empty</em></h2>
              <p className="cp-empty-sub">Looks like you haven't added anything yet.</p>
              <button className="cp-shop-btn" onClick={() => router.push("/")}>
                Start Shopping
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

          ) : (

            <div className="cp-layout">

              {/* ── Items list ── */}
              <div>
                {cart.items.map((item, idx) => (
                  <div
                    key={item.productId._id}
                    className="cp-item"
                    style={{ animationDelay: `${idx * 0.06}s` }}
                  >
                    {/* Image */}
                    <div className="cp-img-wrap">
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="cp-img"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/90x90/141720/8892a4?text=${encodeURIComponent(item.productId.category || "Item")}`;
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="cp-info">
                      <div className="cp-cat">{item.productId.category}</div>
                      <div className="cp-name">{item.productId.title}</div>
                      <div className="cp-price">₹{item.productId.price.toLocaleString("en-IN")}</div>

                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {/* Qty */}
                        <div className="cp-qty">
                          <button
                            className="cp-qty-btn"
                            onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                          <span className="cp-qty-val">{item.quantity}</span>
                          <button
                            className="cp-qty-btn"
                            onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                        </div>

                        <div className="cp-subtotal">
                          Subtotal: ₹{(item.productId.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <button className="cp-remove" onClick={() => removeItem(item.productId._id)} title="Remove">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* ── Summary ── */}
              <div className="cp-summary">
                <h2 className="cp-summary-title">Order Summary</h2>

                <div className="cp-summary-row">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="cp-summary-row">
                  <span>Shipping</span>
                  <span style={{ color: shipping === 0 ? "#4ade80" : "var(--snow)" }}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ fontSize: "11px", color: "var(--fog)", marginBottom: "12px" }}>
                    Add ₹{(999 - total + 1).toLocaleString("en-IN")} more for free shipping
                  </div>
                )}

                <div className="cp-divider-line" />

                <div className="cp-summary-total">
                  <span className="cp-summary-total-label">Total</span>
                  <span className="cp-summary-total-val">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
                {shipping === 0 && (
                  <div className="cp-savings">🎉 You saved ₹99 on shipping!</div>
                )}

                {/* Promo */}
                <div className="cp-promo">
                  <input
                    className="cp-promo-input"
                    placeholder="Promo code"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  />
                  <button className="cp-promo-btn">Apply</button>
                </div>

                {/* Checkout */}
                <button className="cp-checkout-btn" onClick={() => router.push("/checkout")}>
                  Proceed to Checkout
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                <div className="cp-continue" onClick={() => router.push("/")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Continue Shopping
                </div>

                {/* Trust badges */}
                <div className="cp-badges">
                  {[
                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "Secure\nCheckout" },
                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, label: "Fast\nDelivery" },
                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="1 4 1 11 8 11"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>, label: "Easy\nReturns" },
                  ].map((b, i) => (
                    <div key={i} className="cp-badge">
                      <div className="cp-badge-icon">{b.icon}</div>
                      <div className="cp-badge-label" style={{ whiteSpace: "pre-line" }}>{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}