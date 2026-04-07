import { connectDB } from "@/lib/db";
import order from "@/app/models/order";
import { getUserFromReq } from "@/lib/getUser";
import connectDb from "../../createConnection/route";

export async function GET(req, { params }) {
  try {
    await connectDb();

    const user = getUserFromReq(req);
    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await order.findById(params.id);

    if (!orders) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    return Response.json(orders);

  } catch (error) {
    return Response.json({ message: "Error fetching order" }, { status: 500 });
  }
}