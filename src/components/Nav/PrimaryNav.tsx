"use client";
import React, { useEffect, useState } from "react";
import { Inter as Font } from "next/font/google";
import NavButton from "components/Buttons/NavButton";
import Image from "next/image";
import {
  RiHome6Line,
  RiBookOpenLine,
  RiNewspaperLine,
  RiCloseFill,
} from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { TfiCreditCard } from "react-icons/tfi";
import icon from "app/favicon.ico";
import { usePathname } from "next/navigation";
import { RxTokens } from "react-icons/rx";
import ProfileButton from "components/Buttons/ProfileButton";
const font = Font({ subsets: ["latin"] });

function Logo({ mobile }: { mobile: boolean }) {
  return (
    <div
      className={
        mobile
          ? "inline-flex rounded-full py-3 gap-2 px-4 items-center justify-center"
          : "inline-flex text-blue-700 rounded-full py-3 px-3 items-center justify-center"
      }
    >
      <div className="relative w-10 rounded-full aspect-square">
        <Image src={icon} alt="" fill={true} />
      </div>
      <h1 className="text-lg">TARA</h1>
    </div>
  );
}

const open =
  "screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/95 fixed top-0 left-0";

const close =
  "screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/95 fixed top-0 -left-full";

export default function Nav() {
  const path = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [path]);

  const [isVisible, setIsVisible] = useState(false);

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
            <Logo mobile={false} />
            <NavButton href={"/"}>{<RiHome6Line />}Home</NavButton>
            <NavButton href={"/books"}>
              {<RiBookOpenLine />}Book&apos;s
            </NavButton>
            <NavButton href="/articles">
              {<RiNewspaperLine />}Articles
            </NavButton>
            <NavButton href="/profile/suggest_book">
              {<BiSolidEdit />}Suggest Book
            </NavButton>
          </div>

          {/* //? Bottom Section */}

          <div className="flex flex-col items-start gap-2 justify-start">
            <NavButton href={"/profile/create_article"} variant="blue">
              {<IoCreateOutline />}Create
            </NavButton>
            <ProfileButton />
          </div>
        </div>
      </div>

      {/* //? Mobile Navigation */}

      <div className=" flex sm:hidden items-center justify-center">
        <div
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className="flex fixed bottom-4 text-xl select-none cursor-pointer rounded-full bg-blue-700 p-2 right-4 sm:hidden z-[9000] text-white"
        >
          {isVisible ? <RiCloseFill /> : <RxTokens />}
        </div>

        <div className={isVisible ? open : close}>
          <div className="flex flex-col text-white gap-1 items-start justify-start">
            <Logo mobile={true} />

            <NavButton variant="dark" href={"/"}>
              {<RiHome6Line />}Home
            </NavButton>
            <NavButton variant="dark" href={"/books"}>
              {<RiBookOpenLine />}Books
            </NavButton>
            <NavButton variant="dark" href={"/articles"}>
              {<RiNewspaperLine />}Articles
            </NavButton>
            <NavButton variant="dark" href={"/profile/suggest_book"}>
              {<BiSolidEdit />}Suggest Book
            </NavButton>

            {/* //! Bottom Part */}
            <div>
              <div className="flex flex-col  text-white items-start gap-2 justify-start">
                <NavButton variant="dark" href={"/profile/create_article"}>
                  {<IoCreateOutline />}Create
                </NavButton>
                <NavButton variant="dark" href={"/"}>
                  <TfiCreditCard />
                  <h1>Donate</h1>
                </NavButton>
                {/* //! Profile Section */}
                <ProfileButton mobile={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
