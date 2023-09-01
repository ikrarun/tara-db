import React from "react";
import NavButton from "components/Buttons/NavButton";
import { TfiCreditCard } from "react-icons/tfi";

export default function Right_Tab() {
  /* //? Desktop Only */
  return (
    <div className="bg-white border-l border-gray-700/20 text-black items-start justify-start flex-grow hidden sm:flex flex-col flex-shrink-0 w-1/5 p-4">
      <div className="w-fit h-full flex flex-col items-start justify-between max-h-[700px]">
        {/* //? Top Section */}
        <div className="flex flex-col items-start justify-start">
          <div className="rounded-2xl text-base flex flex-col gap-2 p-3 bg-gray-400/30 text-black">
            <h1 className="pl-1">Donate to this Project</h1>
            <NavButton
              href={"/"}
              className="text-sm sm:text-base bg-black text-white"
            >
              <TfiCreditCard />
              <h1>Donate</h1>
            </NavButton>
          </div>
        </div>
      </div>
    </div>
  );
}
