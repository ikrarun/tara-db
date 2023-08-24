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
      <div className="flex h-full flex-col w-fit">
        <div className="flex flex-col items-start justify-start gap-3 p-4 border rounded-md w-fit border-gray-500/70">
          <h1>Welcome {session.user.email}</h1>
          <button
            className="px-2 py-1 text-white bg-blue-700 rounded-md"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full w-fit ">
      <div className="flex flex-col mx-auto items-start justify-start gap-3 p-4 border rounded-md w-fit border-gray-500/70">
        <h1>Welcome User, Please login to access all feature(s)</h1>
        <button
          className="px-2 py-1 text-white bg-blue-700 rounded-md"
          onClick={() => signIn("google")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default USER_DATA;
