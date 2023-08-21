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
        <div className="flex flex-col items-center justify-center w-full gap-3">
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
        <div className="flex flex-col items-start justify-center gap-3 p-3 border rounded-md border-gray-700/50">
          <h1 className="text-2xl font-semibold">
            Currently you are not a Contributor on our Platform.
          </h1>
          <h1 className="text-sm">
            You can become a contributor just by joining us.
          </h1>
          <Link
            className="p-2 text-white bg-blue-700 rounded-md w-fit"
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
          className="p-2 text-white bg-blue-700 rounded-md w-fit"
          href={"/api/auth/signin"}
        >
          Sign In
        </Link>
      </div>
    </div>;
  }
};

export default Suggested;
