"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import profile from "components/profile.svg";

const ProfileButton = ({mobile}:{mobile?: boolean}) => {
  const { data } = useSession();

  return (
    <Link
      href={"/profile"}
      className={
        !mobile
          ? "inline-flex text-black hover:bg-gray-700/30 rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
          : "inline-flex overflow-clip hover:bg-gray-100/30 text-black bg-white rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
      }
    >
      <div className="flex flex-row relative gap-1 justify-start p-1 items-center">
        <div className="relative rounded-full overflow-hidden w-10 h-10">
          <Image alt="Profile Pic" src={data?.user.image ?? profile} fill />
        </div>
        <div className="flex flex-col justify-center items-center px-3">
          <h1 className="text-xl">{data?.user.name ?? "Profile"}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ProfileButton;
