import { prisma } from "_database/db";
import { publicProcedure } from "_trpc/_important/trpc";
import { z } from "zod";

export default function get_all_post() {
  return publicProcedure.input(z.number().optional()).query(async (params) => {
    return await prisma.posts
      .findMany({
        take: params.input,
        orderBy: {
          created_at: "desc",
        },
        select: {
          title: true,
          short_desc: true,
          date: true,
          id: true,
          wysiwyg: true,
        },
      })
      .then((res) => res)
      .catch((e) => false);
  });
}
