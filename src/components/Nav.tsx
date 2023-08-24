import Link from "next/link";
import React from "react";
import { Raleway as Font } from "next/font/google";
import { getServerAuthSession } from "@/server/Auth/auth";
import Image from "next/image";
import { Button } from "./Button";
import MobileNav from "./MobileNav";
import host from "@/server/Database/host";

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

            {/* Desktop Nav */}
            <div className="sm:inline-flex hidden gap-2 items-center">
              <Button href="/profile/suggest_book" variant="outline">
                Suggest Book
              </Button>
              <Button href="/profile/post" variant="outline">
                Create Post
              </Button>
              <div className="relative w-8 h-full aspect-square">
                <Link href={"/profile"}>
                  {
                    <Image
                      src={user?.user.image ?? `${host}/profile.png`}
                      fill={true}
                      alt="profile_picture"
                      className="rounded-full"
                    />
                  }
                </Link>
              </div>
            </div>

            {/* Mobile Nav */}
            <MobileNav>
              <div className="flex screen flex-col items-center justify-center gap-4">
                <div className="relative w-2/12 aspect-square">
                  <Link href={"/profile"}>
                    {
                      <Image
                        src={user?.user.image ?? `${host}/profile.png`}
                        fill={true}
                        alt="profile_picture"
                        className="rounded-full"
                      />
                    }
                  </Link>
                </div>
                <div className=" flex flex-col gap-3">
                  <Button href="/profile/suggest_book">Suggest Book</Button>
                  <Button href="/profile/post">Create Post</Button>
                </div>
              </div>
            </MobileNav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
