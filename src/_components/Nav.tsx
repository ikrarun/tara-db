import Link from "next/link";
import React from "react";
import { Raleway as Font } from "next/font/google";
import { getServerAuthSession } from "Auth/auth";
import Image from "next/image";
import MobileNav from "./MobileNav";
import p_pic from "./profile.png";
import { RiHome6Line, RiBookOpenLine, RiNewspaperLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

const font = Font({ subsets: ["latin"] });
export const Nav = async () => {
  const user = await getServerAuthSession();

  return (
    <>
      <div className="bg-white border-r border-gray-700/20 text-black items-end justify-start flex-grow hidden sm:flex flex-col flex-shrink-0 w-1/5 p-4">
        {/* Desktop */}
        <div className="w-fit h-full flex flex-col items-start justify-between max-h-[700px]">
          <div className="flex flex-col items-start justify-start">
            <Link
              href={"/"}
              className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<RiHome6Line />}Home
            </Link>
            <Link
              href={"/"}
              className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<RiBookOpenLine />}Books
            </Link>
            <Link
              href={"/"}
              className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<RiNewspaperLine />}Articles
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2 justify-start">
            <Link
              href={"/"}
              className="inline-flex bg-blue-700 text-white hover:bg-blue-800 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<IoCreateOutline />}Create
            </Link>
            <Link
              href={"/profile"}
              className="inline-flex  bg-gray-300 text-black hover:bg-gray-700/30 rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
            >
              <div className="flex flex-row  relative gap-3 justify-start px-2 py-1 items-center">
                <div className="relative rounded-full overflow-clip w-10 h-10">
                  <Image
                    alt="Profile Pic"
                    src={user?.user.image ?? p_pic}
                    fill
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base">
                    {user?.user.name ?? "Login Now"}
                  </h1>
                  <h1 className="text-base capitalize">
                    {user?.user.role ?? ""}
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <MobileNav>
        <div className="flex flex-col items-start justify-start">
          <Link href={"/"}>Home</Link>
          <Link
            href={"/"}
            className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
          >
            {<RiHome6Line />}Home
          </Link>
          <Link
            href={"/"}
            className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
          >
            {<RiBookOpenLine />}Books
          </Link>
          <Link
            href={"/"}
            className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
          >
            {<RiNewspaperLine />}Articles
          </Link>
        </div>
      </MobileNav>
    </>
  );
};

export default Nav;
