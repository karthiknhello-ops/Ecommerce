"use client";
import Navbar from "@/app/componenets/navBar/page";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders/getmyorder", { credentials: "include" })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f14]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-[#eef1f7] mb-6">
          Your Orders
        </h1>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center text-[#8892a4] mt-20">
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#141720] border border-[#1e2230] rounded-xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >

                {/* Top Row */}
                <div className="flex items-center justify-between mb-4">
                  
                  <div>
                    <p className="text-xs text-[#8892a4]">Order ID</p>
                    <p className="text-sm text-[#eef1f7] font-medium">
                      {order._id}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        order.status === "Delivered"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : order.status === "Pending"
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2 border-t border-[#1e2230] pt-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm text-[#cbd5e1]"
                    >
                      <span>{item.title}</span>
                      <span className="text-[#8892a4]">
                        × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between mt-4 border-t border-[#1e2230] pt-3">
                  <p className="text-sm text-[#8892a4]">
                    Total
                  </p>
                  <p className="text-lg font-semibold text-[#f0a500]">
                    ₹{order.totalAmount}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}