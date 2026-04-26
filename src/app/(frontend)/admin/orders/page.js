"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/componenets/navBar/page";
import AdminNavbar from "@/app/componenets/anav/page";

const statusStyles = {
  placed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders/getAll", {
      credentials: "include",
    });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    setOrders(prev =>
      prev.map(order =>
        order._id === id ? { ...order, status } : order
      )
    );

    await fetch(`/api/orders/put/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchOrders();
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <AdminNavbar/>

      <div className="max-w-6xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-gray-400 text-sm">
            Track and manage all customer orders
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#1e293b] p-5 rounded-xl shadow-lg border border-gray-700 hover:scale-[1.01] transition"
            >
              {/* Top Row */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-400">
                  Order ID
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm mb-2 break-all text-gray-300">
                {order._id}
              </p>

              {/* Total */}
              <p className="text-lg font-semibold mb-3">
                ₹{order.totalAmount}
              </p>

              {/* Items */}
              <div className="bg-[#020617] rounded-lg p-3 mb-4 max-h-32 overflow-y-auto">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>{item.title}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Status Change */}
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="w-full bg-[#0f172a] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="placed">Placed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>

        {/* Empty */}
        {orders.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
}