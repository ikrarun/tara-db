"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
// @ts-ignore
interface sessions {
  sessionToken: string;
}
const USERDATA = ({ allsession }: { allsession?: sessions[] }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col gap-3 items-start justify-start">
          <h1>
            Signed in as {session.user.email} and role is {session.user.role}{" "}
          </h1>

          {allsession ? (
            <div className="flex flex-col gap-2">
              <h1 className="text-base">
                You are signed at {allsession.length} Device(s)
              </h1>
              <h1 className="text-xs text-gray-500">
                (For Multiple Browser Sessions, session = devices)
              </h1>
            </div>
          ) : (
            <></>
          )}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-2">
      <div>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </div>
  );
};

export default USERDATA;
