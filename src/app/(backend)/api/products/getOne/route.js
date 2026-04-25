import product from "@/app/models/product";
import connectDb from "../../createConnection/route";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const singleProduct = await product.findById(id);

      if (!singleProduct) {
        return Response.json({ message: "Product not found" }, { status: 404 });
      }

      return Response.json(singleProduct);
    }

    // If no id provided, return all products
    const products = await product.find();
    return Response.json(products);

  } catch (error) {
    return Response.json(
      { message: "Error fetching product", error: error.message },
      { status: 500 }
    );
  }
}