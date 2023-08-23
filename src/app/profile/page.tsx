import React from "react";
import USER_DATA from "./userData";

import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import FactCard from "@/components/FactCard";
import { prisma } from "@/server/db";

const getLastPostByMe = async (id: string) => {
  try {
    const res = await prisma.myths
      .findFirst({
        orderBy: {
          created_at: "desc",
        },
        where: {
          creator: id,
        },
        select: {
          title: true,
          short_desc: true,
          date: true,
          id: true,
        },
      })
      .then((res) => {
        return res ? res : "code";
      })
      .catch(() => {
        return "code";
      });

    return res;
  } catch (e) {
    return "code";
  }
};

const Profile = async () => {
  const session = await getServerAuthSession();

  const role = session?.user.role;

  return role === "EDITOR" || role === "ADMIN" ? (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4">
        {/* s1 */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">
            Thank you for actively contributing to this project.{" "}
          </h1>
          <h1 className="text-base text-gray-900/90">
            By being an integral part of our project, your active contributions
            play a vital role in its success. Your dedication and efforts are
            shaping our shared vision into reality. We extend our heartfelt
            gratitude for your ongoing support and participation, as together,
            we make meaningful strides towards our project&apos;s goals.
          </h1>
        </div>

        {/* s3  User Posts and option to create new one*/}
        <div className="flex flex-col w-fit gap-3">
          <Link
            className="px-2 py-1 text-center text-xl text-white bg-gray-950 rounded-md"
            href="/profile/suggest_book"
          >
            Suggest A Book
          </Link>
          <Link
            className="px-2 py-1 text-center text-xl text-white bg-gray-950 rounded-md"
            href="/profile/post"
            prefetch={false}
          >
            Create A Post
          </Link>
        </div>
      </div>
      <div className="my-4 border-b border-gray-900" />
      <USER_DATA />
    </div>
  ) : (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">
          Would you like to contribute to this project?
        </h1>
        <Link
          className="px-2 py-1 text-xl text-white bg-gray-950 rounded-md w-fit"
          href="https://forms.gle/nqEXZPQC35NtmPkv7"
        >
          Join Us
        </Link>

        <h1 className="text-base text-gray-900/90">
          Join us as a contributor and be a vital part of our mission to create
          positive change.
        </h1>
      </div>
      <div className="my-2 border-b border-gray-900" />
      <USER_DATA />
    </div>
  );
};

export default Profile;
