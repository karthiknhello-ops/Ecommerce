"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  }

  .rp-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ink);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: 24px 16px;
    position: relative;
    overflow: hidden;
  }

  /* ── Ambient orbs ── */
  .rp-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-a {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(80,96,240,0.11) 0%, transparent 70%);
    top: -180px; left: -100px;
  }
  .orb-b {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(240,165,0,0.1) 0%, transparent 70%);
    bottom: -120px; right: -80px;
  }

  /* ── Noise grain ── */
  .rp-root::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Card ── */
  .rp-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 440px;
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 24px;
    padding: 44px 40px 40px;
    animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Logo mark ── */
  .rp-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--amber);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px;
    box-shadow: 0 8px 24px rgba(240,165,0,0.3);
  }

  /* ── Header ── */
  .rp-header { text-align: center; margin-bottom: 32px; }

  .rp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.1rem;
    font-weight: 600;
    color: var(--snow);
    letter-spacing: -0.01em;
    line-height: 1.1;
  }
  .rp-title em { font-style: italic; color: var(--amber); }

  .rp-sub {
    font-size: 13.5px;
    color: var(--fog);
    margin-top: 6px;
    line-height: 1.5;
  }

  /* ── Steps indicator ── */
  .rp-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 28px;
  }

  .rp-step-dot {
    width: 28px; height: 4px;
    border-radius: 999px;
    background: var(--rim2);
    transition: background 0.3s, width 0.3s;
  }
  .rp-step-dot.active { background: var(--amber); width: 40px; }
  .rp-step-dot.done   { background: rgba(240,165,0,0.4); }

  /* ── Error banner ── */
  .rp-error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 14px;
    border-radius: 10px;
    background: rgba(255,77,77,0.08);
    border: 1px solid rgba(255,77,77,0.25);
    color: #ff7070;
    font-size: 13px;
    margin-bottom: 20px;
    animation: shake 0.35s ease;
  }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    60%      { transform: translateX(6px); }
  }

  /* ── Field ── */
  .rp-field { margin-bottom: 18px; }

  .rp-label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--fog);
    margin-bottom: 8px;
  }

  .rp-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .rp-input-icon {
    position: absolute;
    left: 14px;
    color: var(--fog);
    pointer-events: none;
    transition: color 0.2s;
    z-index: 1;
  }

  .rp-input-wrap:focus-within .rp-input-icon { color: var(--amber); }

  .rp-input {
    width: 100%;
    padding: 13px 14px 13px 42px;
    background: var(--ink);
    border: 1px solid var(--rim2);
    border-radius: 12px;
    color: var(--snow);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .rp-input::placeholder { color: #4a5168; }

  .rp-input:focus {
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(240,165,0,0.12);
  }

  /* valid tick */
  .rp-tick {
    position: absolute;
    right: 12px;
    color: #4ade80;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.2s, transform 0.2s;
  }
  .rp-tick.show { opacity: 1; transform: scale(1); }

  /* Password eye */
  .rp-eye {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--fog);
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }
  .rp-eye:hover { color: var(--snow); }

  /* ── Password strength ── */
  .rp-strength {
    margin-top: 8px;
    display: flex;
    gap: 4px;
  }

  .rp-strength-bar {
    flex: 1;
    height: 3px;
    border-radius: 999px;
    background: var(--rim2);
    transition: background 0.3s;
  }
  .rp-strength-bar.s1 { background: #ff4d4d; }
  .rp-strength-bar.s2 { background: #f97316; }
  .rp-strength-bar.s3 { background: #facc15; }
  .rp-strength-bar.s4 { background: #4ade80; }

  .rp-strength-label {
    font-size: 11px;
    color: var(--fog);
    margin-top: 5px;
  }

  /* ── Terms ── */
  .rp-terms {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .rp-checkbox {
    width: 16px; height: 16px;
    border-radius: 4px;
    border: 1.5px solid var(--rim2);
    background: var(--ink);
    flex-shrink: 0;
    margin-top: 1px;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .rp-checkbox.checked {
    background: var(--amber);
    border-color: var(--amber);
  }

  .rp-terms-text {
    font-size: 12.5px;
    color: var(--fog);
    line-height: 1.5;
  }
  .rp-terms-text a { color: var(--amber); cursor: pointer; }
  .rp-terms-text a:hover { opacity: 0.75; }

  /* ── Submit ── */
  .rp-submit {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: var(--amber);
    color: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }

  .rp-submit:not(:disabled):hover {
    background: #ffb820;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240,165,0,0.3);
  }

  .rp-submit:active:not(:disabled) { transform: scale(0.98); }

  .rp-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .rp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(10,12,16,0.3);
    border-top-color: #0a0c10;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Divider ── */
  .rp-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
  }
  .rp-divider-line { flex: 1; height: 1px; background: var(--rim); }
  .rp-divider span {
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #4a5168;
    text-transform: uppercase;
  }

  /* ── Social ── */
  .rp-socials { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .rp-social-btn {
    padding: 11px 12px;
    border-radius: 10px;
    border: 1px solid var(--rim2);
    background: var(--ink);
    color: var(--fog);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .rp-social-btn:hover {
    border-color: var(--fog);
    color: var(--snow);
    background: var(--rim);
  }

  /* ── Footer ── */
  .rp-footer {
    text-align: center;
    margin-top: 24px;
    font-size: 13px;
    color: var(--fog);
  }
  .rp-footer-link {
    color: var(--amber);
    font-weight: 500;
    cursor: pointer;
  }
  .rp-footer-link:hover { opacity: 0.75; }
`;

function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "s1", "s2", "s3", "s4"];

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const strength = getStrength(password);

  // rough step tracker: 0 = empty, 1 = name filled, 2 = email filled, 3 = password filled
  const step = [name, email, password].filter(Boolean).length;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) { setError("Please accept the terms to continue."); return; }
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Registration failed"); setLoading(false); return; }
      router.push("/lib/auth/login");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rp-root">
        <div className="rp-orb orb-a" />
        <div className="rp-orb orb-b" />

        <div className="rp-card">

          {/* Logo */}
          <div className="rp-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          {/* Header */}
          <div className="rp-header">
            <h1 className="rp-title">Join <em>us today</em></h1>
            <p className="rp-sub">Create your account and start exploring.</p>
          </div>

          {/* Progress dots */}
          <div className="rp-steps">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`rp-step-dot ${i === step - 1 ? "active" : i < step - 1 ? "done" : ""}`}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="rp-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister}>

            {/* Full Name */}
            <div className="rp-field">
              <label className="rp-label">Full Name</label>
              <div className="rp-input-wrap">
                <input
                  type="text"
                  className="rp-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <span className="rp-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <span className={`rp-tick ${name.length > 1 ? "show" : ""}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="rp-field">
              <label className="rp-label">Email</label>
              <div className="rp-input-wrap">
                <input
                  type="email"
                  className="rp-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="rp-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <span className={`rp-tick ${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "show" : ""}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="rp-field">
              <label className="rp-label">Password</label>
              <div className="rp-input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  className="rp-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="rp-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <button type="button" className="rp-eye" onClick={() => setShowPw(!showPw)}>
                  {showPw ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength meter */}
              {password && (
                <>
                  <div className="rp-strength">
                    {[1,2,3,4].map((i) => (
                      <div
                        key={i}
                        className={`rp-strength-bar ${i <= strength ? STRENGTH_COLORS[strength] : ""}`}
                      />
                    ))}
                  </div>
                  <div className="rp-strength-label">{STRENGTH_LABELS[strength]} password</div>
                </>
              )}
            </div>

            {/* Terms */}
            <div className="rp-terms" onClick={() => setAgreed(!agreed)}>
              <div className={`rp-checkbox ${agreed ? "checked" : ""}`}>
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </div>
              <p className="rp-terms-text">
                I agree to the <a onClick={(e) => e.stopPropagation()}>Terms of Service</a> and <a onClick={(e) => e.stopPropagation()}>Privacy Policy</a>
              </p>
            </div>

            {/* Submit */}
            <button type="submit" className="rp-submit" disabled={loading}>
              {loading ? (
                <><div className="rp-spinner" /> Creating account…</>
              ) : (
                <>Create Account
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

 

          {/* Footer */}
          <p className="rp-footer">
            Already have an account?{" "}
            <span className="rp-footer-link" onClick={() => router.push("/lib/auth/login")}>
              Sign in →
            </span>
          </p>
        </div>
      </div>
    </>
  );
}