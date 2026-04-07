import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function getUserFromReq(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;

  } catch {
    return null;
  }
}