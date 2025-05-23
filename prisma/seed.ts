import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst(); // Assumes at least 1 user exists

  if (!user) {
    throw new Error("No user found — create one before running seed.");
  }

  await prisma.workspace.createMany({
    data: [
      { name: "Project Tracker", userId: user.id },
      { name: "Marketing Plan", userId: user.id },
      { name: "Engineering Roadmap", userId: user.id },
    ],
  });

  console.log("✅ Seed complete");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
