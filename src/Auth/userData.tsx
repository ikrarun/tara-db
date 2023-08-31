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
      <div className="flex flex-col w-full justify-center bg-gray-400/30 rounded-md h-80 items-center">
        <div className="flex flex-col items-start justify-center gap-3 p-3 ">
          <h1 className="text-2xl font-semibold">
            Welcome {session.user.name}
          </h1>
          <h1 className="text-sm">{session.user.email}</h1>
          <button
            className="inline-flex text-sm sm:text-base bg-blue-700 text-white hover:bg-blue-800 rounded-full py-3 px-5 items-center justify-center gap-2 "
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full justify-center bg-gray-400/30 rounded-md h-80 items-center">
      <div className="flex flex-col items-start justify-center gap-3 p-3 ">
        <h1 className="text-2xl font-semibold">Welcome user</h1>
        <h1 className="text-sm">
          You have to login to access all the feature(s).
        </h1>
        <button
          className="text-sm sm:text-base inline-flex bg-blue-700 text-white hover:bg-blue-800 rounded-full py-3 px-5 items-center justify-center gap-2"
          onClick={() => signIn("google")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default USER_DATA;
