import { TRPCClientError } from "@trpc/client";
import { TRPCError, initTRPC } from "@trpc/server";
import { getContextServerAuthSession, getServerAuthSession } from "_auth/auth";
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
const isAuth = t.middleware(async ({ next }) => {
  const session = await getServerAuthSession();
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({
    ctx: {
      userID: session.user.id,
    },
  });
});

export const authProcedure = t.procedure.use(isAuth);
