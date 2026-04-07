import connectDb from "../../createConnection/route";
import product from "@/app/models/product";

export async function GET() {
  try {
    await connectDb();

    const products = await product.find();

    return Response.json(products);
  } catch (error) {
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}