import connectDb from "../../createConnection/route";
import user from "@/app/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
console.log("Jwt",JWT_SECRET)

export async function GET() {
  try {
    await connectDb();

      const cookieStore = await cookies(); // ✅ FIX
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "No token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const users = await user
      .findById(decoded.userId)
      .select("-password");

    return Response.json(users);
  } catch (error) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}