import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getUserFromReq } from "@/lib/getUser";

export async function POST(req) {
  try {
    await connectDB();

    const user = getUserFromReq(req);

    // 🔐 Only admin allowed
    if (!user || user.role !== "admin") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, price, image, category, stock } = await req.json();

    // Basic validation
    if (!title || !price) {
      return Response.json({ message: "Title and price required" }, { status: 400 });
    }

    const product = await Product.create({
      title,
      description,
      price,
      image,
      category,
      stock,
    });

    return Response.json({
      message: "Product created",
      product,
    });

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error creating product" }, { status: 500 });
  }
}