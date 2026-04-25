"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/componenets/navBar/page";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function ProductDetailPage() {
  const { id } = useParams();
  console.log("idddddd",id);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
fetchData()
  }, []);
const fetchData = async()=>{
  try{
    const Response = await fetch(`/api/products/getOne?id=${id}`)
    const data = await Response.json()
    setProduct(data)
    console.log("dataaaaa",data)
        setLoading(false);

  }catch(e){
        setLoading(false);
    console.error("error",error)
  }
}
  const addToCart = async () => {
   const payload = {
  productId: product._id,
  quantity: qty,
};

console.log("Sending data:", payload);

const response = await fetch("/api/cart/post", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
    alert("Added to cart");
    // router.push("/cart");
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 bg-white mt-6 rounded-xl shadow">
        
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-gray-500 mt-2">{product.description}</p>

          <p className="text-3xl font-bold text-green-600 mt-4">
            ₹{product.price}
          </p>

          <p className="text-yellow-500 mt-2">★★★★☆</p>

          {/* Quantity */}
          <div className="mt-4">
            <label className="mr-2">Qty:</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border px-2 py-1"
            >
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={addToCart}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold"
            >
              Add to Cart
            </button>

            <button
              onClick={addToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold"
            >
              Buy Now
            </button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 text-sm text-gray-600">
            <p>✔ Free Delivery</p>
            <p>✔ Cash on Delivery Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}