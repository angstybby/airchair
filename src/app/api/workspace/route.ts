import { auth } from "i/server/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({error: "Name required"}, { status: 400 });
  }

  const workspace = await prisma.workspace.create({
    data: {
      name,
      userId: session.user.id,
    }
  });

  return NextResponse.json({ id: workspace.id });
}