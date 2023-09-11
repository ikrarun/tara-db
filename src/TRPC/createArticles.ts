import { prisma } from "Lib/Database/db";
import { protectedProcedure } from "TRPC/trpc";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export default function createArticles() {
  return protectedProcedure
    .input(
      z.object({
        short_desc: z.string(),
        wysiwyg: z.string(),
        title: z.string(),
        creator: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.articles
          .create({
            data: {
              short_desc: input.short_desc,
              wysiwyg: input.wysiwyg,
              title: input.title,
              creator: input.creator,
            },
            select: {
              id: true,
            },
          })
          .then((result) => {
            revalidatePath("/");
            return { message: result.id, result: true };
          })
          .catch(async (e) => {
            return e.message
              ? { code: e.message.toString(), result: false }
              : { code: "unknown", result: false };
          });
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          const firstValidationError = error.errors[0];
          return firstValidationError?.message
            ? { error: firstValidationError.message, result: false }
            : { error: "unknown", result: false };
        }

        return { error: "unknown", result: false };
      }
    });
}
