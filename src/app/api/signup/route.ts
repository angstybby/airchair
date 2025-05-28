import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<SignUpRequestBody>;

  if (
    !body.name || typeof body.name !== "string" ||
    !body.email || typeof body.email !== "string" ||
    !body.password || typeof body.password !== "string"
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "User created", userId: user.id }, { status: 201 });
}
