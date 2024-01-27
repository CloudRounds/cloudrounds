import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();


if (process.env.NODE_ENV !== "production") globalThis.prisma = db

// async function main() {
//   const users = await db.user.findMany();
//   console.log(users);
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await db.$disconnect();
//   });
