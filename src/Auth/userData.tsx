"use client";
import AuthButton from "components/Buttons/AuthButton";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
interface sessions {
  sessionToken: string;
}

enum Login {
  SIGNIN,
  SIGNOUT,
}

const USER_DATA = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col w-fit py-3 px-7 justify-center bg-gray-400/30 rounded-md h-fit items-start">
        <div className="flex flex-col items-start justify-center gap-3 p-3 ">
          <div className="flex gap-2 flex-col">
            <div className="flex flex-col gap-2 ml-2">
              <h1>Welcome {session.user.name}</h1>
              <h1>{session.user.email}</h1>
            </div>
            <AuthButton
              classes="w-fit sm:text-sm text-xs"
              login={Login.SIGNOUT}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-fit py-3 px-7 justify-center bg-gray-400/30 rounded-md h-fit items-start">
      <div className="flex flex-col items-start justify-center gap-3 p-3 ">
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-2 ml-2">
            <h1>Welcome user</h1>
            <h1>You have to login to access all the feature(s).</h1>
          </div>
          <AuthButton classes="w-fit sm:text-sm text-xs" login={Login.SIGNIN} />
        </div>
      </div>
    </div>
  );
};

export default USER_DATA;
