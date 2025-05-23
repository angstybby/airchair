// lib/custom-prisma-adapter.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  const base = PrismaAdapter(prisma);

  return {
    ...base,
    async deleteSession(sessionToken) {
      try {
        await prisma.session.delete({
          where: { sessionToken },
        });
      } catch (error) {
        // Ignore if session doesn't exist (P2025 = record not found)
        if (
          error instanceof Error &&
          "code" in error &&
          (error as any).code === "P2025"
        ) {
          return;
        }
        throw error;
      }
    },
  };
}
