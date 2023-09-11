import { getServerAuthSession } from "Lib/Auth/auth";
import { prisma } from "Lib/Database/db";
import { protectedProcedure } from "TRPC/trpc";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export default function updateProfile() {
  return protectedProcedure
    .input(
      z.object({
        state: z.string().min(1),
        city: z.string().min(1),
        pincode: z.string().min(6),
        phone: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      const user_id = await getServerAuthSession().then((res) => res?.user.id);
      try {
        if (user_id) {
          return await prisma.userProfile
            .create({
              data: {
                state: input.state,
                city: input.city,
                pincode: parseInt(input.pincode),
                phone: input.phone,
                userId: user_id,
              },
              select: {
                id: true,
              },
            })
            .then(async (result) => {
              await prisma.user.update({
                where: {
                  id: user_id,
                },
                data: {
                  role: "EDITOR",
                },
              });
              revalidatePath("/");

              return { message: result, result: true };
            })
            .catch(async (e) => {
              return e.message
                ? { code: e.message, result: false }
                : { code: "unknown", result: false };
            });
        } else {
          return { error: "unknown", result: false };
        }
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
