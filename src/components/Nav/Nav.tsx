"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RxTokens } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import Link from 'next/link'
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


    const pathname = usePathname();
    const [realPath, setRealPath] = useState("");
    useEffect(() => {
      if (pathname === "/articles") {
        setRealPath("Articles");
        return;
      }
      if (pathname === "/books") {
        setRealPath("Books");
        return;
      }

      if (pathname === "/profile") {
        setRealPath("Profile");
        return;
      }
      if (pathname === "/profile/create_article") {
        setRealPath("Create Article");
        return;
      }
      if (pathname === "/profile/update") {
        setRealPath("Update Profile");
        return;
      }

      if (pathname === "/profile/recommend") {
        setRealPath("Recommend");
      } else {
        setRealPath("TARA DB");
      }
      return;
    }, [pathname]);

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="inline-flex top-0 left-0 right-0  text-white z-[2000] bg-blue-700 w-full fixed p-3 justify-start items-center">
      <nav className=" item-center justify-between text-base w-full gap-2 inline-flex items-center  mx-auto max-w-[880px]">
        {/* Header Title */}
        <div className="  text-base w-full gap-2 inline-flex items-center">
        <Link href="/" className={" text-xl capitalize inline-flex items-center  font-normal "}>
        <RiHome6Line />
        </Link>
           {realPath ?? "Home"}
      </div>
        {/* Menu Button */}
        <div
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className="flex text-xl select-none cursor-pointer text-white"
        >
          <FiMenu /> 
        </div>

        {/* Navigation Page */}
        <div className={isVisible ? open : close}>
          <div className="flex flex-col pt-14 text-white gap-1 items-start justify-start">
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
