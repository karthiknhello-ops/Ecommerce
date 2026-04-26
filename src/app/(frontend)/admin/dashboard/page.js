"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "@/app/componenets/anav/page";
import useCheckAdmin from "@/app/lib/checkadmin/page";

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
    --red:   #ff4d4d;
    --blue:  #60a5fa;
    --purple:#a78bfa;
  }

  .ap-root {
    min-height: 100vh;
    background: var(--ink);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--snow);
    position: relative;
  }

  .ap-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.03; pointer-events: none; z-index: 0;
  }

  .ap-orb {
    position: fixed; border-radius: 50%;
    filter: blur(110px); pointer-events: none; z-index: 0;
  }
  .ap-orb-a {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(240,165,0,0.07) 0%, transparent 70%);
    top: -150px; right: -100px;
  }
  .ap-orb-b {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%);
    bottom: -100px; left: -80px;
  }

  .ap-inner {
    position: relative; z-index: 1;
    max-width: 1180px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }

  /* ── Header ── */
  .ap-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 36px;
  }

  .ap-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem; font-weight: 600;
    letter-spacing: -0.01em; line-height: 1;
  }
  .ap-title em { font-style: italic; color: var(--amber); }

  .ap-subtitle { font-size: 13px; color: var(--fog); margin-top: 6px; }

  .ap-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(240,165,0,0.1);
    border: 1px solid rgba(240,165,0,0.25);
    color: var(--amber);
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 999px;
  }
  .ap-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--amber);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.4; transform:scale(0.7); }
  }

  /* ── Stat cards ── */
  .ap-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }
  @media (min-width: 640px) { .ap-stats { grid-template-columns: repeat(4, 1fr); } }

  .ap-stat {
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 18px;
    padding: 22px 20px;
    position: relative;
    overflow: hidden;
    animation: cardIn 0.4s ease both;
    transition: border-color 0.2s, transform 0.2s;
  }
  .ap-stat:hover { border-color: var(--rim2); transform: translateY(-3px); }
  .ap-stat:nth-child(1) { animation-delay: 0s; }
  .ap-stat:nth-child(2) { animation-delay: 0.06s; }
  .ap-stat:nth-child(3) { animation-delay: 0.12s; }
  .ap-stat:nth-child(4) { animation-delay: 0.18s; }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ap-stat-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
  }

  .ap-stat-label {
    font-size: 11px; text-transform: uppercase;
    letter-spacing: 0.12em; color: var(--fog);
    margin-bottom: 4px;
  }

  .ap-stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 700; line-height: 1;
  }

  .ap-stat-sub { font-size: 11px; color: var(--fog); margin-top: 4px; }

  .ap-stat-glow {
    position: absolute; top: -30px; right: -30px;
    width: 100px; height: 100px;
    border-radius: 50%; filter: blur(40px); opacity: 0.25;
  }

  /* ── Main grid ── */
  .ap-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 900px) { .ap-grid { grid-template-columns: 340px 1fr; } }

  /* ── Panel ── */
  .ap-panel {
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 20px;
    padding: 28px;
    animation: cardIn 0.4s 0.2s ease both;
  }

  .ap-panel-title {
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--fog); margin-bottom: 22px;
    display: flex; align-items: center; gap: 8px;
  }
  .ap-panel-title::after {
    content: ''; flex: 1; height: 1px; background: var(--rim);
  }

  /* ── Form ── */
  .ap-field { margin-bottom: 14px; }

  .ap-label {
    display: block; font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--fog); margin-bottom: 7px;
  }

  .ap-input-wrap { position: relative; display: flex; align-items: center; }

  .ap-input-icon {
    position: absolute; left: 13px;
    color: var(--fog); pointer-events: none;
    transition: color 0.2s; z-index: 1;
  }
  .ap-input-wrap:focus-within .ap-input-icon { color: var(--amber); }

  .ap-input, .ap-select {
    width: 100%;
    padding: 11px 13px 11px 40px;
    background: var(--ink);
    border: 1px solid var(--rim2);
    border-radius: 11px;
    color: var(--snow);
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
  }
  .ap-input::placeholder { color: #4a5168; }
  .ap-input:focus, .ap-select:focus {
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(240,165,0,0.1);
  }
  .ap-select { padding-left: 40px; cursor: pointer; }
  .ap-select option { background: var(--card); }

  .ap-submit {
    width: 100%; padding: 13px;
    border-radius: 11px; border: none;
    background: var(--amber); color: #0a0c10;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; font-weight: 500;
    cursor: pointer; margin-top: 4px;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .ap-submit:hover {
    background: #ffb820; transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240,165,0,0.25);
  }
  .ap-submit:active { transform: scale(0.98); }

  /* ── Search bar ── */
  .ap-search-wrap {
    position: relative; margin-bottom: 16px;
  }
  .ap-search-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: var(--fog); pointer-events: none;
  }
  .ap-search {
    width: 100%; padding: 10px 13px 10px 40px;
    background: var(--ink); border: 1px solid var(--rim2);
    border-radius: 11px; color: var(--snow);
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; outline: none;
    transition: border-color 0.2s;
  }
  .ap-search::placeholder { color: #4a5168; }
  .ap-search:focus { border-color: var(--amber); }

  /* ── User rows ── */
  .ap-user-row {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid var(--rim);
    animation: cardIn 0.3s ease both;
  }
  .ap-user-row:last-of-type { border-bottom: none; }

  .ap-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 500;
    border: 1px solid var(--rim2);
  }

  .ap-user-info { flex: 1; min-width: 0; }
  .ap-user-email {
    font-size: 13.5px; color: var(--snow);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .ap-user-role-pills { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 3px; }

  .ap-role-pill {
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 2px 8px; border-radius: 999px;
    border: 1px solid;
  }

  .ap-role-select {
    padding: 7px 10px;
    background: var(--ink); border: 1px solid var(--rim2);
    border-radius: 9px; color: var(--fog);
    font-family: 'DM Sans', sans-serif; font-size: 12px;
    outline: none; cursor: pointer;
    transition: border-color 0.2s; appearance: none;
    min-width: 130px;
  }
  .ap-role-select option { background: var(--card); }
  .ap-role-select:focus { border-color: var(--amber); }

  /* ── Toast ── */
  .ap-toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    background: var(--card); border: 1px solid var(--rim);
    border-radius: 12px; padding: 13px 20px;
    display: flex; align-items: center; gap: 10px;
    font-size: 13.5px; color: var(--snow);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    z-index: 200;
    animation: toastIn 0.3s ease;
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(16px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .ap-toast-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }

  /* scrollable users list */
  .ap-users-scroll { max-height: 520px; overflow-y: auto; padding-right: 4px; }
  .ap-users-scroll::-webkit-scrollbar { width: 4px; }
  .ap-users-scroll::-webkit-scrollbar-track { background: transparent; }
  .ap-users-scroll::-webkit-scrollbar-thumb { background: var(--rim2); border-radius: 999px; }
`;

const ROLE_COLORS = {
  admin:           { color: "#f0a500", bg: "rgba(240,165,0,0.12)" },
  user:            { color: "#8892a4", bg: "rgba(136,146,164,0.1)" },
};

const AVATAR_COLORS = [
  "#f0a500","#60a5fa","#4ade80","#a78bfa","#f472b6","#fb923c",
];

function getInitial(email = "") { return email[0]?.toUpperCase() ?? "?"; }
function avatarColor(email = "") {
  let h = 0;
  for (const c of email) h = (h * 31 + c.charCodeAt(0)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h];
}


export default function AdminPage() {
  const [stats, setStats]   = useState({ orders: 0, users: 0, revenue: 0, products: 0 });
  const [users, setUsers]   = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast]   = useState("");
  const [form, setForm]     = useState({ name: "", email: "", password: "", roles: "user" });
  const { loading, isAdmin } = useCheckAdmin();
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };


  const fetchStats = async () => {
    const res  = await fetch("/api/admin/stats", { credentials: "include" });
    const data = await res.json();
    setStats(data);
  };

  const fetchUsers = async () => {
    const res  = await fetch("/api/admin/users", { credentials: "include" });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => { fetchStats(); fetchUsers(); }, []);

  const addUser = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/users", {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, roles: [form.roles] }),
    });
    setForm({ name: "", email: "", password: "", roles: "user" });
    fetchUsers(); fetchStats();
    showToast("User added successfully");
  };

  const updateRole = async (id, role) => {
    await fetch(`/api/admin/user/${id}`, {
      method: "PUT", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roles: [role] }),
    });
    fetchUsers();
    showToast("Role updated");
  };

  const filtered = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.name?.toLowerCase().includes(search.toLowerCase())
  );
  if (loading) return <div>Checking access...</div>;
  if (!isAdmin) return null;

  return (
    <>
    <AdminNavbar/>
      <style>{styles}</style>
      <div className="ap-root">
        <div className="ap-orb ap-orb-a" />
        <div className="ap-orb ap-orb-b" />

        <div className="ap-inner">
          {/* Header */}
          <div className="ap-header">
            <div>
              <h1 className="ap-title">Admin <em>Dashboard</em></h1>
              <p className="ap-subtitle">Manage users, monitor stats, and control the platform.</p>
            </div>
            <div className="ap-badge">
              <span className="ap-badge-dot" />
              Live
            </div>
          </div>



          {/* Main grid */}
          <div className="ap-grid">

            {/* ── Add user form ── */}
            <div className="ap-panel">
              <div className="ap-panel-title">Add New User</div>

              <form onSubmit={addUser}>
                <div className="ap-field">
                  <label className="ap-label">Full Name</label>
                  <div className="ap-input-wrap">
                    <span className="ap-input-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <input
                      className="ap-input" placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="ap-field">
                  <label className="ap-label">Email</label>
                  <div className="ap-input-wrap">
                    <span className="ap-input-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </span>
                    <input
                      type="email" className="ap-input" placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="ap-field">
                  <label className="ap-label">Password</label>
                  <div className="ap-input-wrap">
                    <span className="ap-input-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </span>
                    <input
                      type="password" className="ap-input" placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="ap-field">
                  <label className="ap-label">Role</label>
                  <div className="ap-input-wrap">
                    <span className="ap-input-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </span>
                    <select
                      className="ap-select"
                      value={form.roles}
                      onChange={(e) => setForm({ ...form, roles: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="product_manager">Product Manager</option>
                      <option value="order_manager">Order Manager</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="ap-submit">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add User
                </button>
              </form>
            </div>

            {/* ── Users list ── */}
            <div className="ap-panel">
              <div className="ap-panel-title">
                All Users
                <span style={{ marginLeft: "auto", marginRight: 0, fontSize: "11px", color: "var(--fog)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                  {filtered.length} of {users.length}
                </span>
              </div>

              {/* Search */}
              <div className="ap-search-wrap">
                <span className="ap-search-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </span>
                <input
                  className="ap-search"
                  placeholder="Search by email or name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="ap-users-scroll">
                {filtered.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "var(--fog)", fontSize: "13.5px" }}>
                    No users found
                  </div>
                ) : (
                  filtered.map((u, idx) => {
                    const color = avatarColor(u.email);
                    return (
                      <div
                        key={u._id}
                        className="ap-user-row"
                        style={{ animationDelay: `${idx * 0.04}s` }}
                      >
                        {/* Avatar */}
                        <div
                          className="ap-avatar"
                          style={{
                            background: `${color}18`,
                            color,
                            borderColor: `${color}30`,
                          }}
                        >
                          {getInitial(u.email)}
                        </div>

                        {/* Info */}
                        <div className="ap-user-info">
                          {u.name && (
                            <div style={{ fontSize: "12px", color: "var(--fog)", marginBottom: "1px" }}>{u.name}</div>
                          )}
                          <div className="ap-user-email">{u.email}</div>
                          <div className="ap-user-role-pills">
                            {u.roles.map((r) => {
                              const rc = ROLE_COLORS[r] || ROLE_COLORS.user;
                              return (
                                <span
                                  key={r}
                                  className="ap-role-pill"
                                  style={{ color: rc.color, background: rc.bg, borderColor: `${rc.color}40` }}
                                >
                                  {r.replace("_", " ")}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Role selector */}
                        <select
                          className="ap-role-select"
                          value={u.roles[0]}
                          onChange={(e) => updateRole(u._id, e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                  
                        </select>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="ap-toast">
            <span className="ap-toast-dot" />
            {toast}
          </div>
        )}
      </div>
    </>
  );
}