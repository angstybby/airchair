import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserWorkspaces(userId: string) {
  return prisma.workspace.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}