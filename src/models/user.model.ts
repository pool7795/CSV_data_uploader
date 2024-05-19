// src/models/user.model.ts
export interface User {
  id?: number;
  name: string;
  email: string;
  age?: number;
  role?: string;
}

export function validateUser(user: User): boolean {
  if (!user.name || !user.email) {
    return false;
  }
  if (
    user.age !== undefined &&
    (typeof user.age !== "number" || user.age <= 0)
  ) {
    return false;
  }
  if (user.role && user.role !== "user" && user.role !== "admin") {
    return false;
  }
  return true;
}
