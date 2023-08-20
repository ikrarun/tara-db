import { getServerAuthSession } from "@/server/auth";
import host from "@/server/host";
import { redirect } from "next/navigation";
import React from "react";
import SuggestionForm from "./SuggestionForm";
import Link from "next/link";
const submitData = async (data: FormData) => {
  "use server";
  console.log(data);
  return "a";
};

const Suggested = async () => {
  const session = await getServerAuthSession();
  const role = session?.user.role;

  if (role === "EDITOR" || role === "ADMIN") {
    return (
      <div className="min-h-[70vh] flex flex-col w-full items-center gap-4 justify-center">
        <div className="flex flex-col w-full gap-3 items-center justify-center">
          <h1 className="text-3xl font-semibold">Suggest a Book</h1>
          <h1 className="text-base">
            Thanks for choosing to suggest a book to our users.
          </h1>
        </div>
        <SuggestionForm submitData={submitData} />
      </div>
    );
  }

  if (role === "USER" || role === "APPLIED") {
    return (
      <div className="flex flex-col w-full min-h-[80vh] justify-center items-center">
        <div className="flex flex-col items-start border p-3 rounded-md border-gray-700/50 justify-center gap-3">
          <h1 className="text-2xl font-semibold">
            Currently you are not a Contributer on our Platform.
          </h1>
          <h1 className="text-sm">
            You can become a contributer just by joining us.
          </h1>
          <Link
            className="bg-blue-700 text-white w-fit rounded-md p-2"
            href={"/joinform"}
          >
            Join Us
          </Link>
        </div>
      </div>
    );
  }
  if (!session) {
    <div className="flex flex-col w-full min-h-[80vh] justify-center items-center">
      <div className="flex flex-col items-start border p-3 rounded-md border-gray-700/50 justify-center gap-3">
        <h1 className="text-2xl font-semibold">
          You have to login to access this page.
        </h1>
        <h1 className="text-sm">Please login using the link below.</h1>
        <Link
          className="bg-blue-700 text-white w-fit rounded-md p-2"
          href={"/api/auth/signin"}
        >
          Sign In
        </Link>
      </div>
    </div>;
  }
};

export default Suggested;
