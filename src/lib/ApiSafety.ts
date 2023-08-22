import { z } from "zod";
export const apiRequestForMyths = z.object({
  take: z.number().optional(),
});

type TypeofRequestForMyths = z.infer<typeof apiRequestForMyths>

export type {TypeofRequestForMyths}