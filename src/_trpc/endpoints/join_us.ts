import { TRPCError } from "@trpc/server";
import { prisma } from "_database/db";
import { authProcedure } from "_trpc/_important/trpc";
import { z } from "zod";

export default function join_us() {
  return authProcedure
    .input(
      z.object({
        first_name: z.string().min(2),
        last_name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().regex(/^\d{10}$/),
        id: z.string(),
      })
    )
    .mutation(async (params) => {
      return await prisma.joiningRequest
        .create({
          data: {
            email: params.input.email,
            phone: params.input.phone,
            first_name: params.input.first_name,
            last_name: params.input.last_name,
            id: params.input.id,
          },
          select: {
            id: true,
          },
        })
        .then((res) => {
          return `${params.input.first_name} ${params.input.last_name}`;
        })
        .catch((e) => {
          return false;
        });
    });
}
