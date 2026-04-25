"use client";

import {  useRouter } from "next/navigation";

export default function SuccessPage() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#141720] border border-[#1e2230] rounded-2xl p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f0a500]/10 border border-[#f0a500]/30 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f0a500"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-[#eef1f7] mb-2">
          Order Confirmed
        </h1>

        {/* Subtitle */}
        <p className="text-[#8892a4] text-sm mb-6">
          Your order has been placed successfully.
        </p>

        {/* Order ID */}
        <div className="bg-[#0d0f14] border border-[#1e2230] rounded-lg py-3 px-4 mb-6">
          <p className="text-xs text-[#8892a4] mb-1">Thank you </p>
          <p className="text-sm text-[#eef1f7] font-medium tracking-wide">
           For your order we will update your order status shortly
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">

          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-[#f0a500] text-[#0a0c10] py-2.5 rounded-lg font-medium hover:bg-[#ffb820] transition"
          >
            View Orders
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full border border-[#1e2230] text-[#eef1f7] py-2.5 rounded-lg hover:bg-[#1a1f2a] transition"
          >
            Continue Shopping
          </button>

        </div>
      </div>
    </div>
  );
}