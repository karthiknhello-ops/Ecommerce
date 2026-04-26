
import user from "@/app/models/user";
import bcrypt from "bcryptjs";
import connectDb from "../../createConnection/route";

export async function GET() {
  await connectDb();
  const userss = await user.find();
  return Response.json(userss);
}

export async function POST(req) {
  await connectDb();

  const { name, email, password, roles } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await user.create({
    name,
    email,
    password: hashedPassword,
    roles,
  });

  return Response.json(users);
}