"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    #0d0f14;
    --card:   #141720;
    --rim:    #1e2230;
    --rim2:   #262d3e;
    --amber:  #f0a500;
    --fog:    #8892a4;
    --snow:   #eef1f7;
    --red:    #ff4d4d;
  }

  .lp-root {
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
  .lp-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-a {
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(240,165,0,0.12) 0%, transparent 70%);
    top: -160px; right: -120px;
  }
  .orb-b {
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(80,96,240,0.10) 0%, transparent 70%);
    bottom: -100px; left: -80px;
  }

  /* ── Noise grain ── */
  .lp-root::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Card ── */
  .lp-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
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
  .lp-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--amber);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px;
    box-shadow: 0 8px 24px rgba(240,165,0,0.3);
  }

  /* ── Header ── */
  .lp-header { text-align: center; margin-bottom: 32px; }

  .lp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.1rem;
    font-weight: 600;
    color: var(--snow);
    letter-spacing: -0.01em;
    line-height: 1.1;
  }

  .lp-title em {
    font-style: italic;
    color: var(--amber);
  }

  .lp-sub {
    font-size: 13.5px;
    color: var(--fog);
    margin-top: 6px;
    line-height: 1.5;
  }

  /* ── Error banner ── */
  .lp-error {
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

  /* ── Form fields ── */
  .lp-field { margin-bottom: 18px; }

  .lp-label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--fog);
    margin-bottom: 8px;
  }

  .lp-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .lp-input-icon {
    position: absolute;
    left: 14px;
    color: var(--fog);
    pointer-events: none;
    transition: color 0.2s;
  }

  .lp-input {
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
    -webkit-font-smoothing: antialiased;
  }

  .lp-input::placeholder { color: #4a5168; }

  .lp-input:focus {
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(240,165,0,0.12);
  }

  .lp-input:focus + .lp-input-icon,
  .lp-input-wrap:focus-within .lp-input-icon {
    color: var(--amber);
  }

  .lp-eye {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--fog);
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .lp-eye:hover { color: var(--snow); }

  /* ── Forgot ── */
  .lp-forgot {
    display: block;
    text-align: right;
    font-size: 12px;
    color: var(--fog);
    margin-top: 8px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .lp-forgot:hover { color: var(--amber); }

  /* ── Submit ── */
  .lp-submit {
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
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .lp-submit:not(:disabled):hover {
    background: #ffb820;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240,165,0,0.3);
  }

  .lp-submit:active:not(:disabled) { transform: scale(0.98); }

  .lp-submit:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  /* Spinner */
  .lp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(10,12,16,0.3);
    border-top-color: #0a0c10;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Divider ── */
  .lp-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
  }

  .lp-divider-line {
    flex: 1;
    height: 1px;
    background: var(--rim);
  }

  .lp-divider span {
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #4a5168;
    text-transform: uppercase;
  }

  /* ── Social buttons ── */
  .lp-socials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 8px;
  }

  .lp-social-btn {
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

  .lp-social-btn:hover {
    border-color: var(--fog);
    color: var(--snow);
    background: var(--rim);
  }

  /* ── Footer link ── */
  .lp-footer {
    text-align: center;
    margin-top: 24px;
    font-size: 13px;
    color: var(--fog);
  }

  .lp-footer-link {
    color: var(--amber);
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .lp-footer-link:hover { opacity: 0.75; }
`;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed"); setLoading(false); return; }
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">
        <div className="lp-orb orb-a" />
        <div className="lp-orb orb-b" />

        <div className="lp-card">

          {/* Logo mark */}
          <div className="lp-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0c10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>

          {/* Header */}
          <div className="lp-header">
            <h1 className="lp-title">Welcome <em>back</em></h1>
            <p className="lp-sub">Sign in to continue your shopping journey.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="lp-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="lp-field">
              <label className="lp-label">Email</label>
              <div className="lp-input-wrap">
                <input
                  type="email"
                  className="lp-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="lp-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="lp-field">
              <label className="lp-label">Password</label>
              <div className="lp-input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  className="lp-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="lp-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <button type="button" className="lp-eye" onClick={() => setShowPw(!showPw)}>
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
              <span className="lp-forgot">Forgot password?</span>
            </div>

            {/* Submit */}
            <button type="submit" className="lp-submit" disabled={loading}>
              {loading ? (
                <><div className="lp-spinner" /> Signing in…</>
              ) : (
                <>Sign In
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

       

          {/* Footer */}
          <p className="lp-footer">
            Don't have an account?{" "}
            <span className="lp-footer-link" onClick={() => router.push("/lib/auth/register")}>
              Create one →
            </span>
          </p>
        </div>
      </div>
    </>
  );
}