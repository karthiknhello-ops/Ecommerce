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
    --green: #4ade80;
  }

  .ck-root {
    min-height: 100vh;
    background: var(--ink);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--snow);
    position: relative;
  }

  .ck-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03; pointer-events: none; z-index: 0;
  }

  /* orb */
  .ck-orb {
    position: fixed; border-radius: 50%;
    filter: blur(100px); pointer-events: none; z-index: 0;
  }
  .ck-orb-a {
    width: 440px; height: 440px;
    background: radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%);
    top: -100px; right: -80px;
  }
  .ck-orb-b {
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%);
    bottom: -80px; left: -60px;
  }

  .ck-inner {
    position: relative; z-index: 1;
    max-width: 1060px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }

  /* ── breadcrumb ── */
  .ck-breadcrumb {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: var(--fog);
    margin-bottom: 32px;
  }
  .ck-breadcrumb-step { cursor: pointer; transition: color 0.2s; }
  .ck-breadcrumb-step:hover { color: var(--snow); }
  .ck-breadcrumb-step.active { color: var(--amber); font-weight: 500; }
  .ck-breadcrumb-sep { color: var(--rim2); }

  /* ── page title ── */
  .ck-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem; font-weight: 600;
    letter-spacing: -0.01em; line-height: 1;
    margin-bottom: 36px;
  }
  .ck-title em { font-style: italic; color: var(--amber); }

  /* ── layout ── */
  .ck-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 768px) {
    .ck-layout { grid-template-columns: 1fr 340px; align-items: start; }
  }

  /* ── section card ── */
  .ck-section {
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 16px;
    animation: secIn 0.4s ease both;
  }
  @keyframes secIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ck-section:nth-child(2) { animation-delay: 0.07s; }
  .ck-section:nth-child(3) { animation-delay: 0.14s; }

  .ck-section-title {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--fog); margin-bottom: 20px;
    display: flex; align-items: center; gap: 8px;
  }
  .ck-section-title span.num {
    width: 20px; height: 20px; border-radius: 50%;
    background: rgba(240,165,0,0.15);
    border: 1px solid rgba(240,165,0,0.3);
    color: var(--amber); font-size: 11px;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── form grid ── */
  .ck-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ck-grid-full { grid-column: 1 / -1; }

  .ck-field { display: flex; flex-direction: column; gap: 7px; }

  .ck-label {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--fog);
  }

  .ck-input-wrap { position: relative; }

  .ck-input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    background: var(--ink);
    border: 1px solid var(--rim2);
    border-radius: 11px;
    color: var(--snow);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ck-input.no-icon { padding-left: 14px; }
  .ck-input::placeholder { color: #4a5168; }
  .ck-input:focus {
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(240,165,0,0.1);
  }

  .ck-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: var(--fog); pointer-events: none; transition: color 0.2s;
  }
  .ck-input-wrap:focus-within .ck-input-icon { color: var(--amber); }

  /* ── payment method selector ── */
  .ck-pay-options { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }

  .ck-pay-opt {
    padding: 14px 10px;
    border-radius: 12px;
    border: 1px solid var(--rim2);
    background: var(--ink);
    cursor: pointer;
    display: flex; flex-direction: column; align-items: center; gap: 7px;
    transition: border-color 0.2s, background 0.2s;
  }
  .ck-pay-opt:hover { border-color: var(--fog); }
  .ck-pay-opt.selected {
    border-color: var(--amber);
    background: rgba(240,165,0,0.06);
  }
  .ck-pay-opt-icon { color: var(--fog); transition: color 0.2s; }
  .ck-pay-opt.selected .ck-pay-opt-icon { color: var(--amber); }
  .ck-pay-opt-label {
    font-size: 11px; color: var(--fog);
    text-align: center; line-height: 1.3;
    transition: color 0.2s;
  }
  .ck-pay-opt.selected .ck-pay-opt-label { color: var(--snow); }

  /* card row */
  .ck-card-row { display: grid; grid-template-columns: 1fr 100px 80px; gap: 12px; margin-top: 16px; }

  /* ── order items ── */
  .ck-order-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--rim);
  }
  .ck-order-item:last-of-type { border-bottom: none; }

  .ck-order-img {
    width: 48px; height: 48px; border-radius: 10px;
    background: var(--ink); border: 1px solid var(--rim);
    overflow: hidden; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .ck-order-img img { width: 100%; height: 100%; object-fit: cover; }

  .ck-order-name { flex: 1; font-size: 13.5px; color: var(--snow); line-height: 1.4; }
  .ck-order-qty  { font-size: 11px; color: var(--fog); margin-top: 2px; }

  .ck-order-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px; font-weight: 700; color: var(--amber);
    white-space: nowrap;
  }

  /* ── summary panel ── */
  .ck-summary {
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 20px;
    padding: 28px 24px;
    position: sticky; top: 24px;
    animation: secIn 0.4s 0.1s ease both;
  }

  .ck-summary-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem; font-weight: 600;
    color: var(--snow); margin-bottom: 20px;
    padding-bottom: 16px; border-bottom: 1px solid var(--rim);
  }

  .ck-sum-row {
    display: flex; justify-content: space-between;
    font-size: 13.5px; color: var(--fog); margin-bottom: 10px;
  }
  .ck-sum-row span:last-child { color: var(--snow); }
  .ck-sum-row.free span:last-child { color: var(--green); }

  .ck-sum-divider { height: 1px; background: var(--rim); margin: 14px 0; }

  .ck-sum-total {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 20px;
  }
  .ck-sum-total-label { font-size: 13px; font-weight: 500; color: var(--snow); }
  .ck-sum-total-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 700; color: var(--amber);
  }

  /* place order btn */
  .ck-place-btn {
    width: 100%; padding: 15px;
    border-radius: 12px; border: none;
    background: var(--amber); color: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative; overflow: hidden;
  }
  .ck-place-btn:not(:disabled):hover {
    background: #ffb820;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240,165,0,0.3);
  }
  .ck-place-btn:active:not(:disabled) { transform: scale(0.98); }
  .ck-place-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .ck-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(10,12,16,0.3);
    border-top-color: #0a0c10;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .ck-back {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    margin-top: 12px; font-size: 12.5px; color: var(--fog);
    cursor: pointer; transition: color 0.2s;
  }
  .ck-back:hover { color: var(--snow); }

  /* trust row */
  .ck-trust {
    display: flex; justify-content: space-around;
    margin-top: 20px; padding-top: 18px;
    border-top: 1px solid var(--rim);
  }
  .ck-trust-item {
    display: flex; flex-direction: column;
    align-items: center; gap: 5px;
  }
  .ck-trust-icon {
    width: 28px; height: 28px; border-radius: 8px;
    background: rgba(240,165,0,0.08);
    border: 1px solid rgba(240,165,0,0.18);
    display: flex; align-items: center; justify-content: center;
    color: var(--amber);
  }
  .ck-trust-label {
    font-size: 10px; color: var(--fog);
    text-align: center; line-height: 1.3;
    white-space: pre-line;
  }

  /* ── success overlay ── */
  .ck-success-overlay {
    position: fixed; inset: 0;
    background: rgba(13,15,20,0.92);
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .ck-success-card {
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 24px;
    padding: 48px 40px;
    max-width: 380px; width: 90%;
    text-align: center;
    animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }

  .ck-success-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(74,222,128,0.1);
    border: 1px solid rgba(74,222,128,0.3);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; color: var(--green);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.2); }
    50%      { box-shadow: 0 0 0 10px rgba(74,222,128,0); }
  }

  .ck-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem; font-weight: 600; color: var(--snow);
    margin-bottom: 8px;
  }
  .ck-success-title em { font-style: italic; color: var(--green); }
  .ck-success-sub { font-size: 13.5px; color: var(--fog); line-height: 1.6; margin-bottom: 28px; }

  .ck-success-btn {
    width: 100%; padding: 14px;
    border-radius: 12px; border: none;
    background: var(--amber); color: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .ck-success-btn:hover { background: #ffb820; transform: translateY(-2px); }
`;

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "upi",
    label: "UPI",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "cod",
    label: "Cash on\nDelivery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
      </svg>
    ),
  },
];

export default function CheckoutPage() {
  const [cart, setCart]         = useState({ items: [] });
  const [payMethod, setPayMethod] = useState("card");
  const [placing, setPlacing]   = useState(false);
  const [success, setSuccess]   = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cart/get", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCart(d));
  }, []);

  const total     = cart.items.reduce((acc, i) => acc + i.productId.price * i.quantity, 0);
  const shipping  = total > 999 ? 0 : 99;
  const grandTotal = total + shipping;

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const res  = await fetch("/api/orders/post", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.order._id);
      } else {
        alert("Failed to place order");
      }
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ck-root">
        <div className="ck-orb ck-orb-a" />
        <div className="ck-orb ck-orb-b" />
        <InvalidUser />
        <Navbar />

        <div className="ck-inner">

          {/* Breadcrumb */}
          <div className="ck-breadcrumb">
            <span className="ck-breadcrumb-step" onClick={() => router.push("/")}>Home</span>
            <span className="ck-breadcrumb-sep">›</span>
            <span className="ck-breadcrumb-step" onClick={() => router.push("/cart")}>Cart</span>
            <span className="ck-breadcrumb-sep">›</span>
            <span className="ck-breadcrumb-step active">Checkout</span>
          </div>

          <h1 className="ck-title">Secure <em>Checkout</em></h1>

          <div className="ck-layout">
            <div>

              {/* ── Section 1: Delivery ── */}
              <div className="ck-section">
                <div className="ck-section-title">
                  <span className="num">1</span> Delivery Address
                </div>
                <div className="ck-grid">
                  <div className="ck-field">
                    <label className="ck-label">First Name</label>
                    <div className="ck-input-wrap">
                      <span className="ck-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </span>
                      <input className="ck-input" placeholder="John" />
                    </div>
                  </div>
                  <div className="ck-field">
                    <label className="ck-label">Last Name</label>
                    <div className="ck-input-wrap">
                      <span className="ck-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </span>
                      <input className="ck-input" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="ck-field ck-grid-full">
                    <label className="ck-label">Street Address</label>
                    <div className="ck-input-wrap">
                      <span className="ck-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      </span>
                      <input className="ck-input" placeholder="123 MG Road" />
                    </div>
                  </div>
                  <div className="ck-field">
                    <label className="ck-label">City</label>
                    <div className="ck-input-wrap">
                      <span className="ck-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      </span>
                      <input className="ck-input" placeholder="Bengaluru" />
                    </div>
                  </div>
                  <div className="ck-field">
                    <label className="ck-label">PIN Code</label>
                    <div className="ck-input-wrap">
                      <span className="ck-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </span>
                      <input className="ck-input" placeholder="560001" />
                    </div>
                  </div>
                  <div className="ck-field ck-grid-full">
                    <label className="ck-label">Phone</label>
                    <div className="ck-input-wrap">
                      <span className="ck-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.56 3.44 2 2 0 0 1 3.54 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.76a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
                      </span>
                      <input className="ck-input" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Payment ── */}
              <div className="ck-section">
                <div className="ck-section-title">
                  <span className="num">2</span> Payment Method
                </div>
                <div className="ck-pay-options">
                  {PAYMENT_METHODS.map((m) => (
                    <div
                      key={m.id}
                      className={`ck-pay-opt ${payMethod === m.id ? "selected" : ""}`}
                      onClick={() => setPayMethod(m.id)}
                    >
                      <div className="ck-pay-opt-icon">{m.icon}</div>
                      <div className="ck-pay-opt-label" style={{ whiteSpace: "pre-line" }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {payMethod === "card" && (
                  <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div className="ck-field">
                      <label className="ck-label">Card Number</label>
                      <div className="ck-input-wrap">
                        <span className="ck-input-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        </span>
                        <input className="ck-input" placeholder="1234 5678 9012 3456" />
                      </div>
                    </div>
                    <div className="ck-card-row">
                      <div className="ck-field">
                        <label className="ck-label">Card Holder</label>
                        <input className="ck-input no-icon" placeholder="John Doe" />
                      </div>
                      <div className="ck-field">
                        <label className="ck-label">Expiry</label>
                        <input className="ck-input no-icon" placeholder="MM / YY" />
                      </div>
                      <div className="ck-field">
                        <label className="ck-label">CVV</label>
                        <input className="ck-input no-icon" placeholder="•••" type="password" />
                      </div>
                    </div>
                  </div>
                )}

                {payMethod === "upi" && (
                  <div style={{ marginTop: "18px" }}>
                    <div className="ck-field">
                      <label className="ck-label">UPI ID</label>
                      <div className="ck-input-wrap">
                        <span className="ck-input-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        </span>
                        <input className="ck-input" placeholder="yourname@upi" />
                      </div>
                    </div>
                  </div>
                )}

                {payMethod === "cod" && (
                  <div style={{ marginTop: "16px", padding: "14px", background: "var(--ink)", borderRadius: "12px", border: "1px solid var(--rim2)", fontSize: "13px", color: "var(--fog)", lineHeight: "1.6" }}>
                    Pay in cash when your order is delivered. No additional charges.
                  </div>
                )}
              </div>

              {/* ── Section 3: Order review ── */}
              <div className="ck-section">
                <div className="ck-section-title">
                  <span className="num">3</span> Review Items
                </div>
                {cart.items.map((item) => (
                  <div key={item.productId._id} className="ck-order-item">
                    <div className="ck-order-img">
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/48x48/141720/8892a4?text=Img`; }}
                      />
                    </div>
                    <div className="ck-order-name">
                      {item.productId.title}
                      <div className="ck-order-qty">Qty: {item.quantity}</div>
                    </div>
                    <div className="ck-order-price">
                      ₹{(item.productId.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Summary panel ── */}
            <div className="ck-summary">
              <h2 className="ck-summary-title">Order Summary</h2>

              <div className="ck-sum-row">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className={`ck-sum-row ${shipping === 0 ? "free" : ""}`}>
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              <div className="ck-sum-row">
                <span>Tax (GST)</span>
                <span>Incl.</span>
              </div>

              <div className="ck-sum-divider" />

              <div className="ck-sum-total">
                <span className="ck-sum-total-label">Total</span>
                <span className="ck-sum-total-val">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              <button className="ck-place-btn" onClick={placeOrder} disabled={placing || cart.items.length === 0}>
                {placing ? (
                  <><div className="ck-spinner" /> Placing Order…</>
                ) : (
                  <>Place Order
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>

              <div className="ck-back" onClick={() => router.push("/cart")}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Cart
              </div>

              {/* Trust */}
              <div className="ck-trust">
                {[
                  { label: "SSL\nSecure", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                  { label: "Easy\nReturns", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="1 4 1 11 8 11"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg> },
                  { label: "24h\nSupport", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
                ].map((b, i) => (
                  <div key={i} className="ck-trust-item">
                    <div className="ck-trust-icon">{b.icon}</div>
                    <div className="ck-trust-label">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Success overlay ── */}
        {success && (
          <div className="ck-success-overlay">
            <div className="ck-success-card">
              <div className="ck-success-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="ck-success-title">Order <em>Placed!</em></h2>
              <p className="ck-success-sub">
                Your order has been confirmed.<br />
                Order ID: <strong style={{ color: "var(--snow)" }}>#{success.slice(-8).toUpperCase()}</strong>
              </p>
              <button
                className="ck-success-btn"
                onClick={() => router.push(`/orderSucess?orderId=${success}`)}
              >
                View Order Details →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}