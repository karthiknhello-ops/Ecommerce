import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function getUserFromReq(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) throw new Error("UNAUTHORIZED");
  if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("INVALID_TOKEN");
  }
}

// Check if user has ANY required role
export function requireRole(req, allowedRoles = []) {
  const user = getUserFromReq(req);

  if (!user?.roles || !Array.isArray(user.roles)) {
    throw new Error("INVALID_USER_ROLES");
  }

  const hasRole = user.roles.some(role =>
    allowedRoles.includes(role)
  );

  if (!hasRole) {
    throw new Error("FORBIDDEN");
  }

  return user;
}