import Link from "next/link";
import React from "react";
import { TfiCreditCard } from "react-icons/tfi";
const Right_Tab = () => {
  return (
    <div className="bg-white border-l border-gray-700/20 text-black items-start justify-start flex-grow hidden sm:flex flex-col flex-shrink-0 w-1/5 p-4">
      {/* //? Desktop */}
      <div className="w-fit h-full flex flex-col items-start justify-between max-h-[700px]">
        {/* //? Top Section */}
        <div className="flex flex-col items-start justify-start">
          <div className="rounded-2xl text-base flex flex-col gap-2 p-3 bg-gray-400/30 text-black">
            <h1 className="pl-1">Donate to this Project</h1>
            <Link
              href={"/"}
              prefetch={false}
              className="text-sm sm:text-base inline-flex bg-black text-white  rounded-full py-3 px-5 items-center justify-center gap-2"
            >
              <TfiCreditCard />
              <h1>Donate</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right_Tab;
