"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
interface sessions {
  sessionToken: string;
}
const USERDATA = ({ allsession }: { allsession?: sessions[] }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex w-fit flex-col p-4 gap-3 rounded-md border border-gray-500/70 items-start justify-start">
          <h1>Welcome {session.user.email}</h1>
          <button
            className="bg-blue-700 rounded-md
          text-white py-1 px-2"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full ">
      <div className="flex w-fit flex-col p-4 gap-3 rounded-md border border-gray-500/70 items-start justify-start">
        <h1>Welcome User, Please login to access all feature(s)</h1>
        <button
          className="bg-blue-700 rounded-md
          text-white py-1 px-2"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default USERDATA;
