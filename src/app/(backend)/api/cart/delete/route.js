import cart from "@/app/models/cart";
import connectDb from "../../createConnection/route";
import { getUserFromReq } from "@/app/lib/page";

export async function DELETE(req) {
  try {
    await connectDb();

    const user = getUserFromReq(req);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    const carts = await cart.findOne({ userId: user.userId });

    if (!carts) {
      return Response.json({ message: "cart not found" }, { status: 404 });
    }

    carts.items = carts.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await carts.save();

    return Response.json(carts);

  } catch (error) {
    return Response.json({ message: "Error removing item" }, { status: 500 });
  }
}