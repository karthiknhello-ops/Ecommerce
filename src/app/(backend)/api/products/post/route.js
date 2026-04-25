
import product from "@/app/models/product";

import connectDb from "../../createConnection/route";
import { getUserFromReq } from "@/app/lib/route";

export async function POST(req) {
  try {
    await connectDb();

    // const user = getUserFromReq(req);

    // // 🔐 Only admin allowed
    // if (!user || user.role !== "admin") {
    //   return Response.json({ message: "Unauthorized" }, { status: 401 });
    // }
    const { title, description, price, image, category, stock } = await req.json();

    // Basic validation
    if (!title || !price) {
      return Response.json({ message: "Title and price required" }, { status: 400 });
    }

    const products = await product.create({
      title,
      description,
      price,
      image,
      category,
      stock,
    });

    return Response.json({
      message: "Product created",
      products,
    });

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error creating product" }, { status: 500 });
  }
}