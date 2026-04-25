export function requireAdmin(req) {
  const user = requireAuth(req);

  if (user.role !== "admin") {
    throw new Error("Admin only");
  }

  return user;
}