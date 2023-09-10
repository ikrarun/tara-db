"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RxTokens } from "react-icons/rx";
import {
  RiBookOpenLine,
  RiCloseFill,
  RiHome6Line,
  RiNewspaperLine,
} from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { IoCreateOutline } from "react-icons/io5";
import { TfiCreditCard } from "react-icons/tfi";
import NavButton from "components/Buttons/NavButton";
import ProfileButton from "components/Buttons/ProfileButton";

const open =
  "screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/95 fixed top-0 left-0";

const close =
  "screen py-3 px-6 select-none w-fit transition-all duration-500 ease-in-out h-full flex flex-col items-end justify-start z-[8000] bg-black/95 fixed top-0 -left-full";

const MobileNav = () => {
  const path = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [path]);

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="bottom-4 right-4 z-[5000] sm:right-0 flex flex-col  w-full fixed justify-start items-center">
      <nav className="flex w-full z-[5000] max-w-[900px] items-center justify-end">
        <div
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className="flex text-xl select-none cursor-pointer rounded-full bg-black/40  p-1  z-[9000] text-white"
        >
          <div className="p-1 rounded-full  bg-blue-700">
          {isVisible ? <RiCloseFill /> : <RxTokens />}
          </div>
        </div>

        <div className={isVisible ? open : close}>
          <div className="flex flex-col text-white gap-1 items-start justify-start">
            <NavButton variant="dark" href={"/"}>
              {<RiHome6Line />}Home
            </NavButton>
            <NavButton variant="dark" href={"/books"}>
              {<RiBookOpenLine />}Books
            </NavButton>
            <NavButton variant="dark" href={"/articles"}>
              {<RiNewspaperLine />}Articles
            </NavButton>
            <NavButton variant="dark" href={"/profile/recommend"}>
              {<BiSolidEdit />}Recommend
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
      </nav>
    </div>
  );
};

export default MobileNav;
