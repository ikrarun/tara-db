import Link from "next/link";
import React from "react";
import Image from "next/image";
import profile from "components/profile.svg";
import { getServerAuthSession } from "Lib/Auth/auth";

export default async function ProfileButton({ mobile }: { mobile?: boolean }) {
  const session  = await getServerAuthSession();
  if (session ===null) {
    return (
      <Link
        href={"/profile"}
        className={
          !mobile
            ? "inline-flex text-black bg-gray-700/30 hover:bg-gray-700/50 rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
            : "inline-flex overflow-clip bg-gray-100/30 hover:bg-gray-100/50 text-black bg-white rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
        }
      >
        <div className="flex flex-row relative gap-1 justify-start p-1 items-center">
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <Image alt="Profile Pic" src={profile} fill />
          </div>
          <div className="flex flex-col justify-center items-center px-3">
            <h1 className="text-xl">Profile</h1>
          </div>
        </div>
      </Link>
    );
  }
   if (session) {
    return (
      <Link
        href={"/profile"}
        className={
          !mobile
            ? "inline-flex text-black bg-gray-700/30 hover:bg-gray-700/50 rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
            : "inline-flex overflow-clip bg-gray-100/30 hover:bg-gray-100/50 text-black bg-white rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
        }
      >
        <div className="flex flex-row relative gap-1 justify-start p-1 items-center">
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <Image alt="Profile Pic" src={session.user.image ?? profile} fill />
          </div>
          <div className="flex flex-col justify-center items-center px-3">
            <h1 className="text-xl">{session.user.name}</h1>
          </div>
        </div>
      </Link>
    );
  }
 
}

