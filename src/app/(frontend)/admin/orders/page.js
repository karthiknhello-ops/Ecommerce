"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/componenets/navBar/page";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders/get", {
      credentials: "include",
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    // 🔥 Update UI immediately
    setOrders(prev =>
      prev.map(order =>
        order._id === id ? { ...order, status } : order
      )
    );

    // Then call backend
    await fetch(`/api/orders/put/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    // Optional: re-fetch to sync
    fetchOrders();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded shadow mb-3">

            <p><b>Order:</b> {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>

            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option value="placed">Placed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}