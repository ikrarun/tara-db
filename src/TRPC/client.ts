import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "./main";

export const trpc = createTRPCReact<AppRouter>({})