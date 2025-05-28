import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJwt(token: string) {
  try {
    if (!token) return null;
    // console.log("Verifying token:", token);
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("Invalid JWT:", err);
    return null;
  }
}

export function setJwtCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
