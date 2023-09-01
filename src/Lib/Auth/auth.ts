import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "Lib/Database/db";
import { Role } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      lastloginLocation: string;
      // ...other properties
      role: Role;
    };
  }

  interface User {
    // ...other properties
    role: Role;
    lastloginLocation: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
      location: user.lastloginLocation,
    }),
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  events: {
    signIn: async (data) => {},
  },
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
export const getContextServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

async function lastSignIN(data: string) {
  const lastSignIN = await prisma.session
    .findFirst({
      orderBy: {
        expires: "desc",
      },
      where: {
        userId: data,
      },
    })
    .then((res) => res?.id);
  return lastSignIN;
}
