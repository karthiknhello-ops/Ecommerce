"use client";

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-4 py-2 rounded-lg shadow-lg text-white animate-slideIn
        ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}
      >
        {toast.message}
      </div>
    </div>
  );
}