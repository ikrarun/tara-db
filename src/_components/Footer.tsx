import Link from "next/link";
const Footer = () => (
  <div className="w-full h-fit p-2 mt-2 flex  bg-blue-700 text-white sticky top-0 ">
    <div className="max-w-[900px] gap-1 text-xs mx-auto w-full flex flex-row items-center justify-center sm:justify-start">
      <h1 className="font-light">Copyright &#64; 2023 | </h1>

      <Link
        href="https://github.com/ikrarun"
        target="_blank"
        className="font-light underline underline-offset-2 "
      >
        Crafted By: Kr. Arun
      </Link>
    </div>
  </div>
);

export default Footer;
