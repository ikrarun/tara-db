"use client";
import Link from "next/link";
import Editor from "./Mantic_Editor";
import { useSession } from "next-auth/react";
const Post = () => {
  const { data: session } = useSession();
  const role = session?.user.role;

  if (role === "EDITOR" || role === "ADMIN") {
    return (
      <div className="min-h-[70vh] flex flex-col w-full items-center gap-4 justify-center">
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <h1 className="text-xl font-semibold select-none">Create a post.</h1>
          <h1 className="text-base select-none">
            Thanks for choosing to contribute by submitting a busted myth.
          </h1>
        </div>
        <div className="w-full my_style">
          <Editor />
        </div>
      </div>
    );
  }

  if (role === "USER" || role === "APPLIED") {
    return (
      <div className="flex flex-col w-full min-h-[80vh] justify-center items-center">
        <div className="flex flex-col items-start justify-center gap-3 p-3 border rounded-md border-gray-700/50">
          <h1 className="text-2xl font-semibold">
            Currently you are not a Contributor on our Platform.
          </h1>
          <h1 className="text-sm">
            You can become a contributor just by joining us.
          </h1>
          <Link
            className="p-2 text-white bg-gray-950 rounded-md w-fit"
            href={"/join_form"}
          >
            Join Us
          </Link>
        </div>
      </div>
    );
  }
  if (!session) {
    <div className="flex flex-col w-full min-h-[80vh] justify-center items-center">
      <div className="flex flex-col items-start justify-center gap-3 p-3 border rounded-md border-gray-700/50">
        <h1 className="text-2xl font-semibold">
          You have to login to access this page.
        </h1>
        <h1 className="text-sm">Please login using the link below.</h1>
        <Link
          className="p-2 text-white bg-gray-950 rounded-md w-fit"
          href={"/api/auth/signin"}
        >
          Sign In
        </Link>
      </div>
    </div>;
  }
};

export default Post;
