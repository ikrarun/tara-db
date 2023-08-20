export { default } from "next-auth/middleware"
export const config = { matcher: ["/profile",] }

// import { NextRequest, NextResponse } from "next/server";
// import host from "./server/host";
// import { getServerAuthSession } from "./server/auth";

// export default async function middleware(req: NextRequest) {
//   const session = await getServerAuthSession();
//   if (req.nextUrl.pathname.startsWith("/profile")) {
//     if (!session?.user.id) {
//       return NextResponse.redirect(`${host}/api/auth/signin`);
//     }
//   }
// }
