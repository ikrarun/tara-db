import { getServerAuthSession } from "Lib/Auth/auth";
import { prisma } from "Lib/Database/db";
import { protectedProcedure } from "TRPC/trpc";
import { z } from "zod";

export default function suggestBook() {
  return protectedProcedure
    .input(
      z.object({
        desc: z.string().min(1),
        cover_link: z.string().min(1),
        title: z.string().min(1),
        book_link: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const userID = await getServerAuthSession().then((res) => {
          return res?.user.id;
        });
        return await prisma.suggestedreadings
          .create({
            data: {
              desc: input.desc,
              imageUrl: input.cover_link,
              title: input.title,
              link: input.book_link,
              suggestedby: userID ?? "unknown",
            },
            select: {
              id: true,
            },
          })
          .then((result) => {
            return { message: result, result: true };
          })
          .catch(async (e) => {
            return e.message
              ? { code: e.message, result: false }
              : { code: "unknown", result: false };
          });
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          const firstValidationError = error.errors[0];

          return firstValidationError?.message
            ? { error: firstValidationError.message, result: false }
            : { error: "unknown", result: false };
        } else return { error: "unknown", result: false };
      }
    });
}
