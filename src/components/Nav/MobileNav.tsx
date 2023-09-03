"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RxTokens } from "react-icons/rx";
import {
  RiCloseFill,
} from "react-icons/ri";


const open =
  "screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/95 fixed top-0 left-0";

const close =
  "screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/95 fixed top-0 -left-full";

const MobileNav = ({children}:{children:React.ReactNode}) => {
  const path = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [path]);

  const [isVisible, setIsVisible] = useState(false);
  return (
    <nav className=" flex sm:hidden items-center justify-center">
      <div
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="flex fixed bottom-4 text-xl select-none cursor-pointer rounded-full bg-blue-700 p-2 right-4 sm:hidden z-[9000] text-white"
      >
        {isVisible ? <RiCloseFill /> : <RxTokens />}
      </div>

      <div className={isVisible ? open : close}>
        {children}
      </div>
    </nav>
  );
};

export default MobileNav;
