import Link from "next/link";
import React from "react";
import { Raleway as Font } from "next/font/google";
import { getServerAuthSession } from "@/server/Auth/auth";
import Image from "next/image";
import { BiSolidUserCircle } from "react-icons/bi";

const font = Font({ subsets: ["latin"] });
export const Nav = async () => {
  const user = await getServerAuthSession();
  return (
    <div className="sticky top-0 w-full mb-5 flex-col h-fit p-2 flex z-[10000]  bg-blue-700 text-white ">
      <div className={font.className}>
        <div className="w-full flex-col flex ">
          <div className="max-w-[900px] relative grow-0 mx-auto  w-full inline-flex items-center justify-between">
            <Link
              href={"/"}
              className="text-xl decoration-transparent text-white"
            >
              TARA-DB
            </Link>
            <div className="relative w-8 h-full aspect-square">
              <Link href={"/profile"}>
                {user?.user.image ? (
                  <Image
                    src={user.user.image}
                    fill={true}
                    alt="profile_picture"
                    className="rounded-full"
                  />
                ) : (
                  <BiSolidUserCircle size={30} />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
