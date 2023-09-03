import { prisma } from "Lib/Database/db";
import { publicProcedure } from "TRPC/trpc";
import { z } from "zod";

export default function getArticles() {
  return publicProcedure
    .input(
      z.object({
        take: z.number().optional(),
        type: z.enum(["card", "full"]),
        post_id: z.string().optional(),
      })
    )
    .query(async (opts) => {
      if (opts.input.type === "card" && opts.input.take !== undefined) {
        return await prisma.articles
          .findMany({
            take: opts.input.take,
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
      } else if (opts.input.type === "card" && opts.input.take === undefined) {
        return await prisma.articles
          .findMany({
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
      } else if (opts.input.type === "full" && opts.input.post_id) {
        return await prisma.articles
          .findUnique({
            where: {
              id: opts.input.post_id,
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
