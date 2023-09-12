import { prisma } from "Lib/Database/db";
import { publicProcedure } from "TRPC/trpc";
import { z } from "zod";

export default function getBooks() {
  return publicProcedure.input(z.number().optional()).query(async (data) => {
    return await prisma.suggestedreadings
      .findMany({
        orderBy: {
        created_at:'desc'
        },
        take: data.input,
        select: {
          imageUrl: true,
          title: true,
          link: true,
          desc: true,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return null;
      });
  });
}
