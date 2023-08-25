import NextAuth from "next-auth";
import { authOptions } from "_auth/auth";

export default NextAuth(authOptions);
