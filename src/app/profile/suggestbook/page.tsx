import { getServerAuthSession } from "@/server/auth";
import host from "@/server/host";
import { redirect } from "next/navigation";
import React from "react";

const submitData = async (data: FormData) => {
  "use server";
  console.log(data);
  return "a";
};

const Suggested = async () => {
  const session = await getServerAuthSession();
  const role = session?.user.role;

  if (role == "ADMIN") {
    return (
      <form action={submitData} className="flex flex-col gap-4 w-full items-start justify-center">
        {/* Title */}
        <div className="flex w-full flex-col">
          <label className="mb-3 pl-2 block text-base font-medium text-black">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title of Book"
            className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          />
        </div>
        {/* Desc */}
        <div className="flex w-full flex-col">
          <label className="mb-3 pl-2 block text-base font-medium text-black">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter a short description"
            className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          />
        </div>
        {/* link */}
        <div className="flex w-full flex-col">
          <label className="mb-3 pl-2 block text-base font-medium text-black">
            Link
          </label>
          <input
            type="text"
            placeholder="Enter link for the Book Resource"
            className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          />
        </div>
        {/* image url */}
        <div className="flex w-full flex-col">
          <label className="mb-3 pl-2 block text-base font-medium text-black">
            Image
          </label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            placeholder="Enter link for the Book Resource"
            className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }

  if (role == "USER") {
    redirect(`${host}/joiningform`);
  }
  if (!session) {
    redirect(`${host}/api/auth/signin`);
  }
};

export default Suggested;
