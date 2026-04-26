
import user from "@/app/models/user";
import connectDb from "../../../createConnection/route";

export async function PUT(req, context) {
  await connectDb();

  const { id } = await context.params;
  const { roles } = await req.json();

  const users = await user.findByIdAndUpdate(
    id,
    { roles },
    { returnDocument: "after" }
  );

  return Response.json(users);
}