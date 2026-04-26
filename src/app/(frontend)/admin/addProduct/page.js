"use client";

import AdminNavbar from "@/app/componenets/anav/page";
import { useState, useRef } from "react";

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
  }

  .ap-wrap {
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: var(--snow);
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;
  }

  /* ── Card ── */
  .ap-card {
    background: var(--card);
    border: 1px solid var(--rim);
    border-radius: 22px;
    padding: 20px 16px;
    width: 100%;
    max-width: 520px;
  }
  @media (min-width: 480px) {
    .ap-card { padding: 32px; }
  }

  /* ── Header ── */
  .ap-header { margin-bottom: 22px; }

  .ap-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.45rem, 5vw, 1.9rem);
    font-weight: 600; letter-spacing: -0.01em; line-height: 1.1;
  }
  .ap-title em { font-style: italic; color: var(--amber); }
  .ap-sub { font-size: 13px; color: var(--fog); margin-top: 5px; }

  /* ── Field ── */
  .ap-field { margin-bottom: 14px; }

  .ap-label {
    display: block; font-size: 11px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--fog); margin-bottom: 7px;
  }

  .ap-input-wrap { position: relative; display: flex; align-items: center; }

  .ap-icon {
    position: absolute; left: 13px;
    color: var(--fog); pointer-events: none;
    transition: color 0.2s; z-index: 1; flex-shrink: 0;
  }
  .ap-input-wrap:focus-within .ap-icon { color: var(--amber); }

  .ap-input, .ap-textarea, .ap-select {
    width: 100%;
    padding: 11px 12px 11px 38px;
    background: var(--ink);
    border: 1px solid var(--rim2);
    border-radius: 12px;
    color: var(--snow);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    -webkit-text-size-adjust: 100%;
  }
  @media (min-width: 480px) {
    .ap-input, .ap-textarea, .ap-select {
      padding: 12px 13px 12px 40px;
    }
  }

  .ap-input::placeholder, .ap-textarea::placeholder { color: #4a5168; }
  .ap-input:focus, .ap-textarea:focus, .ap-select:focus {
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(240,165,0,0.1);
  }

  .ap-textarea { resize: vertical; min-height: 88px; padding-top: 11px; line-height: 1.55; }
  .ap-select   { appearance: none; cursor: pointer; }
  .ap-select option { background: var(--card); }

  /* ── Price + Stock: stacked on <380px, side-by-side above ── */
  .ap-row { display: grid; grid-template-columns: 1fr; gap: 14px; }
  @media (min-width: 380px) { .ap-row { grid-template-columns: 1fr 1fr; } }

  /* ── Drop zone ── */
  .ap-drop-zone {
    width: 100%;
    border: 2px dashed var(--rim2);
    border-radius: 14px;
    padding: 20px 12px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 8px;
    cursor: pointer; position: relative;
    transition: border-color 0.2s, background 0.2s;
    background: var(--ink); text-align: center;
    min-height: 100px; margin-bottom: 10px;
  }
  @media (min-width: 480px) { .ap-drop-zone { padding: 28px 16px; } }
  .ap-drop-zone:hover, .ap-drop-zone.dragging {
    border-color: var(--amber); background: rgba(240,165,0,0.04);
  }
  .ap-drop-zone input[type="file"] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
    width: 100%; height: 100%;
  }
  .ap-drop-icon { color: var(--fog); }
  .ap-drop-title { font-size: 13px; color: var(--snow); }
  .ap-drop-sub   { font-size: 11px; color: var(--fog); }

  /* ── Preview ── */
  .ap-preview {
    position: relative; border-radius: 14px; overflow: hidden;
    border: 1px solid var(--rim2); aspect-ratio: 16/9;
    background: var(--ink); margin-bottom: 10px; max-width: 100%;
  }
  .ap-preview img { width: 100%; height: 100%; object-fit: contain; }
  .ap-preview-remove {
    position: absolute; top: 8px; right: 8px;
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(13,15,20,0.75); border: 1px solid var(--rim);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--fog);
    transition: color 0.2s, background 0.2s; touch-action: manipulation;
  }
  .ap-preview-remove:hover { color: var(--red); background: rgba(255,77,77,0.12); }

  /* ── Progress ── */
  .ap-progress {
    height: 3px; border-radius: 999px;
    background: var(--rim2); overflow: hidden; margin-bottom: 10px;
  }
  .ap-progress-fill {
    height: 100%; border-radius: 999px;
    background: linear-gradient(90deg, var(--amber), #ffb820);
    transition: width 0.3s ease;
  }

  .ap-upload-status {
    display: flex; align-items: center; gap: 8px;
    font-size: 12.5px; margin-bottom: 10px; flex-wrap: wrap;
  }
  .ap-upload-status.success { color: var(--green); }
  .ap-upload-status.error   { color: var(--red); }

  /* ── Upload btn ── */
  .ap-upload-btn {
    width: 100%; padding: 12px; border-radius: 11px;
    border: 1px solid var(--rim2); background: var(--ink); color: var(--fog);
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500;
    cursor: pointer; margin-bottom: 14px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    touch-action: manipulation;
  }
  .ap-upload-btn:not(:disabled):hover {
    border-color: var(--blue); color: var(--blue); background: rgba(96,165,250,0.06);
  }
  .ap-upload-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── Submit ── */
  .ap-submit {
    width: 100%; padding: 14px; border-radius: 12px; border: none;
    background: var(--amber); color: #0a0c10;
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
    letter-spacing: 0.04em; cursor: pointer; min-height: 50px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    touch-action: manipulation;
  }
  .ap-submit:not(:disabled):hover {
    background: #ffb820; transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(240,165,0,0.28);
  }
  .ap-submit:active:not(:disabled) { transform: scale(0.98); }
  .ap-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Spinner ── */
  .ap-spinner {
    width: 15px; height: 15px; flex-shrink: 0;
    border: 2px solid rgba(10,12,16,0.3);
    border-top-color: #0a0c10;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Divider ── */
  .ap-divider { height: 1px; background: var(--rim); margin: 18px 0; }

  /* ── Char count ── */
  .ap-charcount { font-size: 11px; color: var(--fog); text-align: right; margin-top: 4px; }

  /* ── Toast: full-width on mobile, centered pill on desktop ── */
  .ap-toast {
    position: fixed; bottom: 16px;
    left: 12px; right: 12px;
    background: var(--card); border: 1px solid var(--rim);
    border-radius: 12px; padding: 13px 18px;
    display: flex; align-items: center; gap: 10px;
    font-size: 13.5px; color: var(--snow);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    z-index: 200;
    animation: toastInMobile 0.3s ease;
  }
  @keyframes toastInMobile {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (min-width: 520px) {
    .ap-toast {
      left: 50%; right: auto; bottom: 24px;
      transform: translateX(-50%);
      white-space: nowrap; width: auto;
      animation: toastInDesktop 0.3s ease;
    }
    @keyframes toastInDesktop {
      from { opacity: 0; transform: translateX(-50%) translateY(16px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  }
  .ap-toast-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .ap-toast-dot.green { background: var(--green); }
  .ap-toast-dot.red   { background: var(--red); }
`;

const CATEGORIES = [
  "Electronics", "Fashion", "Home & Living", "Books",
  "Sports", "Beauty", "Toys", "Grocery", "Other",
];

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function AddProduct() {
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "", stock: "" });
  const [imageFile, setImageFile]           = useState(null);
  const [imageUrl, setImageUrl]             = useState("");
  const [preview, setPreview]               = useState("");
  const [uploading, setUploading]           = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus]     = useState(null);
  const [loading, setLoading]               = useState(false);
  const [dragging, setDragging]             = useState(false);
  const [toast, setToast]                   = useState(null);
  const fileRef = useRef(null);

  const showToast = (msg, type = "green") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setImageFile(file); setImageUrl(""); setUploadStatus(null); setUploadProgress(0);
    setPreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null); setImageUrl(""); setPreview("");
    setUploadStatus(null); setUploadProgress(0);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleImageUpload = async () => {
    if (!imageFile) { showToast("Select an image first", "red"); return; }
    setUploading(true); setUploadProgress(20);
    try {
      const base64 = await toBase64(imageFile);
      setUploadProgress(50);
      const res  = await fetch("https://api-jet-psi-24.vercel.app/api/photoUpload", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: `data:image/jpeg;base64,${base64.split(",")[1]}` }),
      });
      setUploadProgress(85);
      const data = await res.json();
      if (!res.ok) throw new Error("Upload failed");
      setImageUrl(data.url); setUploadProgress(100); setUploadStatus("success");
      showToast("Image uploaded successfully");
    } catch (err) {
      console.error(err); setUploadStatus("error");
      showToast("Upload failed — please try again", "red");
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) { showToast("Upload an image first", "red"); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/products/post", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title, description: form.description,
          price: Number(form.price), image: imageUrl,
          category: form.category, stock: Number(form.stock),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showToast("Product added successfully!");
      setForm({ title: "", description: "", price: "", category: "", stock: "" });
      clearImage();
    } catch (err) { console.error(err); showToast("Failed to add product", "red"); }
    setLoading(false);
  };

  return (
    <>
    <AdminNavbar/>
      <style>{styles}</style>
      <div className="ap-wrap">
        <div className="ap-card">
          <div className="ap-header">
            <h2 className="ap-title">Add <em>Product</em></h2>
            <p className="ap-sub">Fill in the details to list a new product.</p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="ap-field">
              <label className="ap-label">Product Title</label>
              <div className="ap-input-wrap">
                <span className="ap-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                </span>
                <input className="ap-input" placeholder="e.g. Bluetooth Speaker Pro"
                  value={form.title} required maxLength={120}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
            </div>

            {/* Description */}
            <div className="ap-field">
              <label className="ap-label">Description</label>
              <div className="ap-input-wrap" style={{ alignItems: "flex-start" }}>
                <span className="ap-icon" style={{ position: "absolute", top: "13px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/>
                    <line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
                  </svg>
                </span>
                <textarea className="ap-textarea"
                  placeholder="Describe the product — features, specs, highlights…"
                  value={form.description} required maxLength={500}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="ap-charcount">{form.description.length} / 500</div>
            </div>

            {/* Price + Stock */}
            <div className="ap-row">
              <div className="ap-field" style={{ marginBottom: 0 }}>
                <label className="ap-label">Price (₹)</label>
                <div className="ap-input-wrap">
                  <span className="ap-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </span>
                  <input type="number" className="ap-input" placeholder="1799"
                    value={form.price} required min="0"
                    onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <div className="ap-field" style={{ marginBottom: 0 }}>
                <label className="ap-label">Stock</label>
                <div className="ap-input-wrap">
                  <span className="ap-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  </span>
                  <input type="number" className="ap-input" placeholder="80"
                    value={form.stock} required min="0"
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "14px" }} />

            {/* Category */}
            <div className="ap-field">
              <label className="ap-label">Category</label>
              <div className="ap-input-wrap">
                <span className="ap-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6h16M4 12h16M4 18h7"/>
                  </svg>
                </span>
                <select className="ap-select ap-input" value={form.category} required
                  onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="" disabled>Select a category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="ap-divider" />

            <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fog)", marginBottom: "8px" }}>
              Product Image
            </div>

            {/* Drop zone / Preview */}
            {!preview ? (
              <div
                className={`ap-drop-zone ${dragging ? "dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); handleFileChange(e.dataTransfer.files[0]); }}
              >
                <input type="file" accept="image/*" ref={fileRef}
                  onChange={(e) => handleFileChange(e.target.files[0])} />
                <div className="ap-drop-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <div className="ap-drop-title">Drop image here or <span style={{ color: "var(--amber)" }}>browse</span></div>
                <div className="ap-drop-sub">PNG, JPG, WEBP — max 5 MB</div>
              </div>
            ) : (
              <div className="ap-preview">
                <img src={preview} alt="preview" />
                <button type="button" className="ap-preview-remove" onClick={clearImage}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="ap-progress">
                <div className="ap-progress-fill" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="ap-upload-status success">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Image uploaded — ready to submit
              </div>
            )}
            {uploadStatus === "error" && (
              <div className="ap-upload-status error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Upload failed — try again
              </div>
            )}

            <button type="button" className="ap-upload-btn"
              onClick={handleImageUpload}
              disabled={!imageFile || uploading || !!imageUrl}>
              {uploading ? (
                <><div className="ap-spinner" style={{ borderTopColor: "var(--blue)" }} /> Uploading…</>
              ) : imageUrl ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Uploaded</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg> Upload Image</>
              )}
            </button>

            <button type="submit" className="ap-submit" disabled={loading}>
              {loading ? (
                <><div className="ap-spinner" /> Adding Product…</>
              ) : (
                <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg> Add Product</>
              )}
            </button>
          </form>
        </div>
      </div>

      {toast && (
        <div className="ap-toast">
          <span className={`ap-toast-dot ${toast.type}`} />
          {toast.msg}
        </div>
      )}
    </>
  );
}