import connectDb from "../../createConnection/route";
import user from "@/app/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();

    // Check if user exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const users = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({
      message: "User registered successfully",
      user: { id: users._id, email: users.email }
    });

  } catch (error) {
    return Response.json({ message: "Error registering user" }, { status: 500 });
  }
}