import { Inter as Font } from "next/font/google";
import NavButton from "components/Buttons/NavButton";
import Image from "next/image";
import {
  RiHome6Line,
  RiBookOpenLine,
  RiNewspaperLine,
} from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { TfiCreditCard } from "react-icons/tfi";
import icon from "app/favicon.ico";
import ProfileButton from "components/Buttons/ProfileButton";
import MobileNav from "./MobileNav";
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


export default function Nav() {


  return (
    <>
      <nav
        style={font.style}
        className="bg-white sticky  top-0 max-h-screen border-r border-gray-700/20 text-black items-end justify-start flex-grow hidden sm:flex flex-col flex-shrink-0 w-1/5 p-4"
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
      </nav>

      {/* //? Mobile Navigation */}

      <MobileNav>
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
      </MobileNav>
    </>
  );
}
