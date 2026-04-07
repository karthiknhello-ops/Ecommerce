import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import connectDb from "../../createConnection/route";
import { getUserFromReq } from "@/app/lib/page";
import order from "@/app/models/orders";

export async function POST(req) {
  try {
    await connectDb();

    const user = getUserFromReq(req);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId: user.userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return Response.json({ message: "Cart is empty" }, { status: 400 });
    }

    // Build orders items
    const items = cart.items.map((item) => ({
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

    // Clear cart after orders
    await Cart.findOneAndUpdate(
      { userId: user.userId },
      { items: [] }
    );

    return Response.json({
      message: "Order placed successfully",
      orders,
    });

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error placing orders" }, { status: 500 });
  }
}