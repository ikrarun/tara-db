"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

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
        className="flex sm:hidden z-[9000] text-white"
      >
        {<RxHamburgerMenu />}
      </div>

      {isVisible ? (
        <div className="screen w-full z-[8000] bg-black/90 fixed top-0 left-0">
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileNav;
