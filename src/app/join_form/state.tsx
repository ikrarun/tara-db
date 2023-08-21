"use client";

import React from "react";
import { experimental_useFormStatus as useFromState } from "react-dom";
const State = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFromState();
  if (pending) {
    return (
      <div className="flex animate-pulse flex-col w-full min-h-[50vh] justify-start items-center">
        <div className="flex flex-col items-start border p-3 rounded-md border-gray-700/50 justify-center gap-3">
          <h1 className="text-2xl font-semibold">
            Please wait while your date is being submitted.
          </h1>
          <h1 className="text-sm">
            We respect privacy and we never will share your data.
          </h1>
        </div>
      </div>
    );
  } else
    return (
      <div
        className={
          pending ? `opacity-10 animate-pulse` : `opacity-100 animate-none`
        }
      >
        {children}
      </div>
    );
};

export default State;
