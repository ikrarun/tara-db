import Link from "next/link";
import React from "react";

export const invalidRequest = () => {
  return (
    <div className="mx-auto w-full min-h-[80vh] h-full flex flex-col items-center justify-center ">
      <div className="border border-gray-700/70 rounded-md flex flex-col gap-2  items-center p-10 justify-center ">
        <h1 className="text-3xl">Invalid Request</h1>
        <h1 className="text-sm">
          Your Request is invalid, Kindly Refresh this page or choose to go
          home.
        </h1>
        <Link
          href={"/"}
          className="bg-blue-700 w-fit decoration-transparent text-white rounded-md text-lg py-1 px-2"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default invalidRequest