import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import user from "@/app/models/user";
import connectDb from "../createConnection/route";

export async function GET(req) {
  try {
    // ✅ Connect DB
    await connectDb();

    // 🍪 Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 📦 Fetch user from DB
    const users = await user.findById(decoded.userId).select("name email");

    if (!users) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ users });

  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}