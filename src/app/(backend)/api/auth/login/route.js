import connectDb from "../../createConnection/route";
import Users from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    await connectDb();

    const { email, password } = await req.json();

    // Check user
    const user = await Users.findOne({ email });
    if (!user) {
      return Response.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("token",token)
     const response = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, email: user.email }
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
      return response;

  } catch (error) {
    return Response.json({ message: "Login failed" }, { status: 500 });
  }
}