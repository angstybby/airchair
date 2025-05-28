import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return response;
}