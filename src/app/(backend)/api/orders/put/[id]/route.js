import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getUserFromReq } from "@/lib/getUser";
import connectDb from "../../../createConnection/route";

export async function PUT(req, { params }) {
  try {
    await connectDb();

    const user = getUserFromReq(req);
    if (!user || user.role !== "admin") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    return Response.json(order);

  } catch (error) {
    return Response.json({ message: "Error updating order" }, { status: 500 });
  }
}