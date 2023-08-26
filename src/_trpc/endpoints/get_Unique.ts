import { TRPCError } from "@trpc/server";
import { prisma } from "_database/db";
import { publicProcedure } from "_trpc/_important/trpc";
import { z } from "zod";

export default function get_Unique() {
  return publicProcedure.input(z.string()).query(async (params) => {
    return await prisma.posts
      .findUnique({
        where: {
          id: params.input,
        },
        select: {
          title: true,
          short_desc: true,
          date: true,
          id: true,
          wysiwyg: true,
        },
      })
      .then((res) => {
        return res ? res : false;
      })
      .catch((_e) => false);
  });
}
