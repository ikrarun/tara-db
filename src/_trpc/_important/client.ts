import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "_trpc";

export const trpc = createTRPCReact<AppRouter>({})