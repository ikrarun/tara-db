import NextAuth from "next-auth";
import { authOptions } from "Lib/Auth/auth";

export default NextAuth(authOptions);
