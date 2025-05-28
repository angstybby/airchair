// src/server/auth/index.ts
import { cookies } from "next/headers";
import { verifyJwt } from "i/lib/jwt";

export async function auth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  // console.log("Verifying token:", token); 

  try {
    const decoded = verifyJwt(token);
    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      return null;
    }
    // console.log("Decoded JWT payload:", decoded); 
    return { userId: decoded.id }; 
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}
