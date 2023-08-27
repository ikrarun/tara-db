"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { RxCrossCircled,RxTokens } from "react-icons/rx";

const MobileNav = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  useEffect(() => {
    setIsVisible(false);
  }, [path]);
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className=" flex sm:hidden items-center justify-center">
      <div
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="flex fixed bottom-4 rounded-full bg-blue-700 p-2 right-4 sm:hidden z-[9000] text-white"
      >
        {isVisible?<RxCrossCircled/>:<RxTokens/>}
      </div>

      {isVisible ? (
        <div className="screen p-3 w-full transition-all duration-200 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/90 fixed top-0 -left-1/2">
          {children}
        </div>
      ) : (
        <div className="screen w-full h-full flex transition-all duration-200 ease-in-out flex-col items-center justify-center z-[8000] bg-black/90 fixed top-0 -left-full">
        {children}
      </div>
      )}
    </div>
  );
};

export default MobileNav;
