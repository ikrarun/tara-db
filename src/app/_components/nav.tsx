import Link from "next/link";
import React from "react";
import { Raleway as Font } from "next/font/google";

const font = Font({ subsets: ["latin"] });
export const nav = () => {
  return (
    <div className="sticky top-0 w-full mb-5 flex-col h-fit p-2 flex z-50  bg-gray-950 text-white ">
      <div className={font.className}>
        <div className="w-full flex-col flex ">
          <div className="max-w-[900px]  mx-auto  w-full inline-flex items-center justify-between">
            <Link
              href={"/"}
              className="text-xl decoration-transparent text-white"
            >
              TARA-DB
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default nav;
