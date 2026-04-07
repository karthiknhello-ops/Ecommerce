import connectDb from "../../createConnection/route";
import user from "@/app/models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    await connectDb();

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ message: "No token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const users = await user.findById(decoded.userId).select("-password");

    return Response.json(users);

  } catch (error) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}