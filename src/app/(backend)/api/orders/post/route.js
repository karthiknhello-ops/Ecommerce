
import cart from "@/app/models/cart";
import connectDb from "../../createConnection/route";
import { getUserFromReq } from "@/app/lib/route";
import order from "@/app/models/order";

export async function POST(req) {
  try {
    await connectDb();

    const user = getUserFromReq(req);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get user's carts
    const carts = await cart.findOne({ userId: user.userId }).populate("items.productId");

    if (!carts || carts.items.length === 0) {
      return Response.json({ message: "cart is empty" }, { status: 400 });
    }

    // Build orders items
    const items = carts.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    // Calculate total
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Create orders
    const orders = await order.create({
      userId: user.userId,
      items,
      totalAmount,
      status: "placed",
    });

    // Clear carts after orders
   
await cart.findOneAndUpdate(
      { userId: user.userId },
      { items: [] }
    );
return Response.json({
  message: "Order placed successfully",
  order: orders, // ✅ rename this
});
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error placing orders" }, { status: 500 });
  }
}