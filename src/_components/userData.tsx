"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
interface sessions {
  sessionToken: string;
}
const USER_DATA = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col items-start justify-start gap-3 w-fit">
        <h1>Welcome {session.user.name}</h1>
        <h1>{session.user.email}</h1>
        <button
          className="inline-flex text-sm sm:text-base bg-blue-700 text-white hover:bg-blue-800 rounded-full py-3 px-5 items-center justify-center gap-2 "
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start justify-start gap-3 w-fit">
    <h1>Welcome User, Please login to access all feature(s)</h1>
      <button
        className="text-sm sm:text-base inline-flex bg-blue-700 text-white hover:bg-blue-800 rounded-full py-3 px-5 items-center justify-center gap-2"
        onClick={() => signIn("google")}
      >
        Sign In
      </button>
    </div>
  );
};

export default USER_DATA;
