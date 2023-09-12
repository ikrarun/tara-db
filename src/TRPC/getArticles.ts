import { prisma } from "Lib/Database/db";
import { publicProcedure } from "TRPC/trpc";
import { z } from "zod";

export default function getArticles() {
  return publicProcedure
    .input(z.number().optional())
    .query(async (opts) => {
        return await prisma.articles
          .findMany({
            orderBy: {
              date:'desc'
            },
            take: opts.input,
            select: {
              title: true,
              short_desc: true,
              date: true,
              id: true,
            },
          })
          .then((res) => {
            return res;
          })
          .catch((e) => {
            return null;
          });
      })
}
