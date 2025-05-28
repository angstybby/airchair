import { auth } from "i/server/auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface WorkspaceRequest {
  name: string;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Partial<WorkspaceRequest>;

  if (!body.name || typeof body.name !== "string") {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const workspace = await prisma.workspace.create({
    data: {
      name: body.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userId: session.userId,
    },
  });

  return NextResponse.json({ id: workspace.id });
}
