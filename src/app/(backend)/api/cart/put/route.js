import { getUserFromReq } from "@/app/lib/route";
import cart from "@/app/models/cart";
import connectDb from "../../createConnection/route";

export async function PUT(req) {
  try {
    await connectDb();

    const user = getUserFromReq(req);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    const carts = await cart.findOne({ userId: user.userId });

    if (!carts) {
      return Response.json({ message: "cart not found" }, { status: 404 });
    }

    const item = carts.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return Response.json({ message: "Item not found" }, { status: 404 });
    }

    item.quantity = quantity;

    await carts.save();

    return Response.json(carts);

  } catch (error) {
    return Response.json({ message: "Error updating carts" }, { status: 500 });
  }
}