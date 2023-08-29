import Link from "next/link";
import React from "react";
import { Inter as Font } from "next/font/google";
import { getServerAuthSession } from "Auth/auth";
import Image from "next/image";
import MobileNav from "./MobileNav";
import profile from "_components/profile.svg";
import { RiHome6Line, RiBookOpenLine, RiNewspaperLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { TfiCreditCard } from "react-icons/tfi";
import icon from "app/favicon.ico";
const font = Font({ subsets: ["latin"] });
export const Nav = async () => {
  const user = await getServerAuthSession();

  return (
    <>
      <div
        style={font.style}
        className="bg-white border-r border-gray-700/20 text-black items-end justify-start flex-grow hidden sm:flex flex-col flex-shrink-0 w-1/5 p-4"
      >
        {/* //? Desktop */}
        <div className="w-fit h-full flex flex-col items-start justify-between max-h-[700px]">
          {/* //? Top Section */}
          <div className="flex flex-col items-start justify-start">
            <div className="inline-flex text-blue-700 rounded-full py-3 px-3 items-center justify-center">
              <div className="relative w-10 aspect-square">
                <Image src={icon} alt="" fill={true} />
              </div>
              <h1 className="text-lg">TARA</h1>
            </div>
            <Link
              href={"/"}
              className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<RiHome6Line />}Home
            </Link>
            <Link
              href={"/books"}
              prefetch={false}
              className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<RiBookOpenLine />}Book&apos;s
            </Link>
            <Link
              href={"/articles"}
              className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<RiNewspaperLine />}Articles
            </Link>
            <Link
              href={"/profile/suggest_book"}
              className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<BiSolidEdit />}Suggest Book
            </Link>
          </div>

          {/* //? Bottom Section */}

          <div className="flex flex-col items-start gap-2 justify-start">
            <Link
              href={"/profile/create_article"}
              className="inline-flex bg-blue-700 text-white hover:bg-blue-800 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
            >
              {<IoCreateOutline />}Create
            </Link>
            <Link
              href={"/profile"}
              className="inline-flex text-black hover:bg-gray-700/30 rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
            >
              <div className="flex flex-row relative gap-1 justify-start p-1 items-center">
                <div className="relative rounded-full overflow-hidden w-10 h-10">
                  <Image
                    alt="Profile Pic"
                    src={user?.user.image ?? profile}
                    fill
                  />
                </div>
                <div className="flex flex-col justify-center items-center px-3">
                  <h1 className="text-xl">
                    {user?.user.name ?? "Profile"}
                  </h1>
                  {/* <h1 className="text-base capitalize">
                    {user?.user.role.toLowerCase() ?? ""}
                  </h1> */}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* //? Mobile Navigation */}

      <MobileNav>
        <div className="flex flex-col text-white gap-1 items-start justify-start">
          <div className="inline-flex rounded-full py-3 gap-2 px-4 items-center justify-center">
            <div className="relative bg-gray-300 rounded-full p-1 w-10 aspect-square">
              <Image src={icon} alt="" fill={true} />
            </div>
            <h1 className="text-lg">TARA</h1>
          </div>
          <Link
            href={"/"}
            className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
          >
            {<RiHome6Line />}Home
          </Link>
          <Link
            href={"/books"}
            prefetch={false}
            className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
          >
            {<RiBookOpenLine />}Books
          </Link>
          <Link
            href={"/articles"}
            className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
          >
            {<RiNewspaperLine />}Articles
          </Link>
          <Link
            href={"/profile/suggest_book"}
            className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
          >
            {<BiSolidEdit />}Suggest Book
          </Link>

          {/* //! Bottom Part */}
          <div>
            <div className="flex flex-col  text-white items-start gap-2 justify-start">
              <Link
                href={"/profile/create_article"}
                className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
              >
                {<IoCreateOutline />}Create
              </Link>
              <Link
                href={"/"}
                prefetch={false}
                className="inline-flex hover:bg-gray-700/30 rounded-full py-3 px-5 items-center justify-center gap-2 text-xl"
              >
                <TfiCreditCard />
                <h1>Donate</h1>
              </Link>
              {/* //! Profile Section */}
              <Link
                href={"/profile"}
                className="inline-flex hover:bg-gray-100/30 text-white bg-gray-700/30 rounded-full py-1 px-2 items-center justify-center gap-2 text-xl"
              >
                <div className="flex flex-row relative gap-1 justify-start p-1 items-center">
                  <div className="relative rounded-full overflow-hidden w-10 h-10">
                    <Image
                      alt="Profile Pic"
                      src={user?.user.image ?? profile}
                      fill
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center px-3">
                    <h1 className="text-xl">
                      {user?.user.name ?? "Profile"}
                    </h1>
                    {/* <h1 className="text-base capitalize">
                      {user?.user.role.toLowerCase() ?? ""}
                    </h1> */}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </MobileNav>
    </>
  );
};

export default Nav;
