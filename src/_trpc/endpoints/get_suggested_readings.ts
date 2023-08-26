import { TRPCError } from "@trpc/server";
import { prisma } from "_database/db";
import { publicProcedure } from "_trpc/_important/trpc";

export default function suggested_readings() {
  return publicProcedure.query(async () => {
    return await prisma.suggestedreadings
      .findFirstOrThrow({
        orderBy: {
          created_at: "desc",
        },
        select: {
          title: true,
          desc: true,
          link: true,
          imageUrl: true,
        },
      })
      .then((res) => res)
      .catch((e) => false);
  });
}
