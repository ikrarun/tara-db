import { prisma } from "Lib/Database/db";
import { publicProcedure } from "TRPC/trpc";
import { z } from "zod";

export default function getArticles() {
  return publicProcedure.input(z.string()).query(async (opts) => {
    if (opts.input) {
      return await prisma.articles
        .findUnique({
          where: {
            id: opts.input,
          },
          select: {
            title: true,
            short_desc: true,
            date: true,
            wysiwyg: true,
            creator: true,
          },
        })
        .then((res) => {
          return res;
        })
        .catch((e) => {
          return null;
        });
    }
  });
}
