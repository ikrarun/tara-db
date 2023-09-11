import { TRPCError, initTRPC } from "@trpc/server";
import { getServerAuthSession } from "Lib/Auth/auth";
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
const isAuth = t.middleware(async (opts) => {
  const allowed = await getServerAuthSession().then((res) => {
    const role = res?.user.role;
    return role === "ADMIN" || role === "EDITOR" ? true : false;
  });
  if (!allowed) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next();
});

export const protectedProcedure = t.procedure.use(isAuth)
