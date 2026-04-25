import { getUserFromReq } from "@/app/lib/route";
import connectDb from "../../createConnection/route";
import order from "@/app/models/order";


export async function GET(req) {
  try {
    await connectDb();

    const user = getUserFromReq(req);

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const orders = await order.find({ userId: user.userId })
      .sort({ createdAt: -1 });

    return Response.json(orders);

  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error fetching orders" }, { status: 500 });
  }
}