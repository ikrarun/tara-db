"use client";
import AuthButton from "components/Buttons/AuthButton";
import { useSession } from "next-auth/react";
import { AuthEnums } from "enum";
import React from "react";

export default function USER_DATA() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-full sm:w-fit py-3 px-7 justify-center bg-gray-400/30 rounded-md h-fit items-start">
      <div className="flex flex-col items-start justify-center gap-3 p-3 ">
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-2 ml-2">
            <h1>{session ? `Welcome ${session.user.name}` : `Welcome user`}</h1>
            <h1>
              {session
                ? `${session.user.email}`
                : `You have to login to access all the feature(s).`}
            </h1>
          </div>
          <AuthButton
            className="w-fit sm:text-sm text-xs"
            authFunction={session ? AuthEnums.SIGNOUT : AuthEnums.SIGNIN}
          />
        </div>
      </div>
    </div>
  );
}
