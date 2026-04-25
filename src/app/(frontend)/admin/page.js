"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/componenets/navBar/page";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", price: "", image: "" });
    fetchProducts();
  };

  // Delete product
  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    fetchProducts();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        {/* Add Product */}
        <form onSubmit={addProduct} className="bg-white p-4 rounded shadow mb-6 space-y-3">
          <input
            placeholder="Title"
            className="w-full border px-3 py-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Price"
            type="number"
            className="w-full border px-3 py-2"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Image URL"
            className="w-full border px-3 py-2"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <button className="bg-black text-white px-4 py-2 rounded">
            Add Product
          </button>
        </form>

        {/* Product List */}
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-3 rounded shadow flex justify-between">
              <span>{p.title} - ₹{p.price}</span>

              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}