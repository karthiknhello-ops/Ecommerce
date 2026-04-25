import connectDb from "@/app/(backend)/api/createConnection/route";
import order from "@/app/models/order"; 


export async function PUT(req, context) {
  try {
    await connectDb();

    const { id } = await context.params; // 🔥 FIX HERE
    const { status } = await req.json();

    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" } // ✅ updated syntax
    );

    return Response.json(updatedOrder);

  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error updating" }, { status: 500 });
  }
}