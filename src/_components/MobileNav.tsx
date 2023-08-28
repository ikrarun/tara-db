"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { RxTokens } from "react-icons/rx";
import { RiCloseFill } from "react-icons/ri";

const MobileNav = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  useEffect(() => {
    setIsVisible(false);
  }, [path]);

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className=" flex sm:hidden items-center justify-center">
      <div
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="flex fixed bottom-4 text-xl select-none cursor-pointer rounded-full bg-blue-700 p-2 right-4 sm:hidden z-[9000] text-white"
      >
        {isVisible ? <RiCloseFill /> : <RxTokens />}
      </div>

      {isVisible ? (
        <div className="screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/90 fixed top-0 left-0">
          {children}
        </div>
      ) : (
        <div className="screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/90 fixed top-0 -left-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
