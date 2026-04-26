// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function adminNavbar() {
//     const router = useRouter();
//     const [scrolled, setScrolled] = useState(false);
//     const [searchFocused, setSearchFocused] = useState(false);
//     const [search, setSearch] = useState("");
//     const [user, setUser] = useState(null);
//     const [cartCount] = useState(3);

//     // ✅ Handle scroll
//     useEffect(() => {
//         const handleScroll = () => setScrolled(window.scrollY > 20);
//         window.addEventListener("scroll", handleScroll);

//         return () => window.removeEventListener("scroll", handleScroll);

//     }, []);

//     // ✅ Load user from localStorage (FIXED)
//     // ✅ FETCH USER FROM API (IMPORTANT)
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await fetch("/api/user", {
//                     credentials: "include", // 🔥 MUST
//                 });

//                 if (!res.ok) throw new Error();

//                 const data = await res.json();
//                 setUser(data.users);

//             } catch (err) {
//                 setUser(null);
//             }
//         };

//         fetchUser();
//     }, []);

//     // 🔍 Search
//     const handleSearch = () => {
//         if (!search.trim()) return;
//         router.push(`/search?q=${encodeURIComponent(search)}`);
//     };
//     return (
//         <>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//         .navbar {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           z-index: 100;
//           font-family: 'DM Sans', sans-serif;
//           transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//           background: ${scrolled
//                     ? "rgba(8, 8, 10, 0.92)"
//                     : "rgba(8, 8, 10, 1)"};
//           backdrop-filter: blur(20px);
//           border-bottom: 1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "transparent"};
//           box-shadow: ${scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none"};
//         }

//         .navbar-inner {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 0 2rem;
//           height: 68px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 2rem;
//         }

//         /* LOGO */
//         .logo {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           cursor: pointer;
//           text-decoration: none;
//           flex-shrink: 0;
//         }

//         .logo-icon {
//           width: 32px;
//           height: 32px;
//           background: linear-gradient(135deg, #e8d5b7 0%, #c9a96e 100%);
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 16px;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           box-shadow: 0 0 0 0 rgba(201,169,110,0);
//         }

//         .logo:hover .logo-icon {
//           transform: rotate(-6deg) scale(1.08);
//           box-shadow: 0 0 18px rgba(201,169,110,0.4);
//         }

//         .logo-text {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           font-size: 1.25rem;
//           letter-spacing: -0.02em;
//           color: #f5f0e8;
//         }

//         .logo-text span {
//           color: #c9a96e;
//         }

//         /* SEARCH */
//         .search-wrapper {
//           flex: 1;
//           max-width: 480px;
//           position: relative;
//         }

//         .search-icon {
//           position: absolute;
//           left: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #555;
//           transition: color 0.2s;
//           pointer-events: none;
//         }

//         .search-wrapper:focus-within .search-icon {
//           color: #c9a96e;
//         }

//         .search-input {
//           width: 100%;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 10px;
//           padding: 10px 16px 10px 42px;
//           color: #f0ece4;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.875rem;
//           font-weight: 400;
//           outline: none;
//           transition: all 0.25s ease;
//           box-sizing: border-box;
//         }

//         .search-input::placeholder {
//           color: #444;
//           font-weight: 300;
//         }

//         .search-input:focus {
//           background: rgba(255,255,255,0.07);
//           border-color: rgba(201,169,110,0.4);
//           box-shadow: 0 0 0 3px rgba(201,169,110,0.08), 0 4px 20px rgba(0,0,0,0.3);
//         }

//         /* NAV ACTIONS */
//         .nav-actions {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           flex-shrink: 0;
//         }

//         .nav-btn {
//           display: flex;
//           align-items: center;
//           gap: 7px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           border-radius: 9px;
//           padding: 8px 14px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.85rem;
//           font-weight: 500;
//           color: #a09880;
//           transition: all 0.2s ease;
//           letter-spacing: 0.01em;
//           position: relative;
//         }

//         .nav-btn:hover {
//           color: #f0ece4;
//           background: rgba(255,255,255,0.06);
//         }

//         .nav-btn svg {
//           opacity: 0.7;
//           transition: opacity 0.2s;
//         }

//         .nav-btn:hover svg {
//           opacity: 1;
//         }

//         /* CART BUTTON */
//         .cart-btn {
//           position: relative;
//         }

//         .cart-badge {
//           position: absolute;
//           top: 4px;
//           right: 8px;
//           background: linear-gradient(135deg, #e8d5b7, #c9a96e);
//           color: #1a1208;
//           font-size: 0.6rem;
//           font-weight: 700;
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: 1.5px solid #08080a;
//           line-height: 1;
//           font-family: 'Syne', sans-serif;
//         }

//         /* DIVIDER */
//         .nav-divider {
//           width: 1px;
//           height: 22px;
//           background: rgba(255,255,255,0.08);
//           margin: 0 4px;
//         }

//         /* LOGIN BUTTON */
//         .login-btn {
//           background: linear-gradient(135deg, rgba(232,213,183,0.12), rgba(201,169,110,0.08)) !important;
//           border: 1px solid rgba(201,169,110,0.25) !important;
//           color: #e8d5b7 !important;
//           padding: 8px 18px !important;
//         }

//         .login-btn:hover {
//           background: linear-gradient(135deg, rgba(232,213,183,0.2), rgba(201,169,110,0.15)) !important;
//           border-color: rgba(201,169,110,0.5) !important;
//           color: #fff !important;
//           box-shadow: 0 4px 20px rgba(201,169,110,0.15) !important;
//         }

//         /* TOP ACCENT LINE */
//         .navbar::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.5) 30%, rgba(232,213,183,0.8) 50%, rgba(201,169,110,0.5) 70%, transparent 100%);
//         }
//       `}</style>

//             <nav className="navbar">
//                 <div className="navbar-inner">
//                      <div className="logo" onClick={() => router.push("/")}>
//                         <div className="logo-icon">🛍</div> <span className="logo-text">My<span>Shop</span></span> </div>
//                      <div className="search-wrapper">
//                         <input type="text" placeholder="Search products, brands..." className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
//                         <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-[#c9a96e] text-black rounded-md" > Search </button>
//                     </div> <div className="nav-actions"> 
//                         <button className="nav-btn cart-btn" onClick={() => router.push("/admin/addProduct")} >
//                              Manage orders
//                         </button>
//                          <button className="nav-btn cart-btn" onClick={() => router.push("/admin/addProduct")} >
//                              Manage product
//                         </button>
//                          <button className="nav-btn cart-btn" onClick={() => router.push("/admin/addProduct")} >
//                              Manage user
//                         </button>
//                          <div className="nav-divider" /> {/* ✅ Auth UI */}   {user ? (
//                             <button onClick={() => router.push("/profile")}>
//                                 Hi, {user.name}
//                             </button>
//                         ) : (
//                             <button onClick={() => router.push("/lib/auth/login")}>
//                                 Login
//                             </button>
//                         )} </div>
//                          </div> 
//                 </nav>  <div style={{ height: "68px" }} />
//         </>
//     );
// }