import { NextResponse } from "next/server";
import { db } from "i/server/db";
import bcrypt from "bcrypt";
import { signJwt } from "i/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signJwt({ id: user.id, email: user.email, name: user.name });


  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
