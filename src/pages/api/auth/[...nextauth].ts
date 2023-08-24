import NextAuth from "next-auth";
import { authOptions } from "@/server/Auth/auth";

export default NextAuth(authOptions);
