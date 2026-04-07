import cart from "@/app/models/cart";
import connectDb from "../../createConnection/route";
import { getUserFromReq } from "@/app/lib/page";

export async function POST(req) {
  try {
    await connectDb();

    const user = getUserFromReq(req);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    let carts = await cart.findOne({ userId: user.userId });

    if (!carts) {
      carts = await cart.create({
        userId: user.userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = carts.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        carts.items[itemIndex].quantity += quantity;
      } else {
        carts.items.push({ productId, quantity });
      }

      await carts.save();
    }

    return Response.json(carts);

  } catch (error) {
    return Response.json({ message: "Error adding to carts",error }, { status: 500 });
  }
}