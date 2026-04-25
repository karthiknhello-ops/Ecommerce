
import cart from "@/app/models/cart";
import { getUserFromReq } from "@/app/lib/route";
import connectDb from "../../createConnection/route";

export async function GET(req) {
  try {
    await connectDb();

    const user = getUserFromReq(req);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const carts = await cart.findOne({ userId: user.userId })
  .populate("items.productId");

    return Response.json(carts || { items: [] });

  } catch (error) {
    return Response.json({ message: "Error fetching cart" }, { status: 500 });
  }
}