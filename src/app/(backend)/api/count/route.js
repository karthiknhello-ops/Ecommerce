
import order from "@/app/models/order";
import user from "@/app/models/user";
import connectDb from "../createConnection/route";

export async function GET() {
  await connectDb();

  const orders = await order.countDocuments();
  const users = await user.countDocuments();

  return Response.json({ orders, users });
}