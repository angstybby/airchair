import { NextResponse } from "next/server";
import { db } from "i/server/db";
import bcrypt from "bcrypt";
import { signJwt } from "i/lib/jwt";

interface SignInRequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<SignInRequestBody>;

  if (
    !body.email || typeof body.email !== "string" ||
    !body.password || typeof body.password !== "string"
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email: body.email } });
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
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
