import { BsInstagram, BsEnvelope, BsTwitter } from "react-icons/bs";
import Link from "next/link";
const Footer = () => (
  <div className="w-full h-fit p-2 mt-2 flex  bg-blue-700 text-white sticky top-0 ">
    <div className="max-w-[900px] gap-4 p-4 mx-auto w-full flex flex-col items-center justify-center">
      <h1 className="font-light text-sm sm:text-base break-before-auto">
        TARA DB - Truth and Awareness Resource Archive
      </h1>
      <h1 className="font-light text-xs sm:text-sm text-center break-before-auto">
        {message}
      </h1>
      {/* <div className="flex flex-row items-center gap-3 justify-center">
        <h1>{<BsTwitter />}</h1>
        <h1>{<BsInstagram />}</h1>
        <h1>{<BsEnvelope />}</h1>
      </div> */}
      <Link href='https://github.com/codemanch' className="font-light underline underline-offset-2 text-xs">Crafted By: Kr. Arun</Link>
      <h1 className="font-light  text-xs">Copyright &#64; 2023 | CodeManch </h1>
    </div>
  </div>
);

const message = `TARA DB stands for Truth and Awareness Resource Archive.
It's a platform dedicated to providing reliable and well-researched
information about topics related to Dalit, Bahujan, Ambedkar, Buddha,
and other related subjects. Our mission is to dispel misconceptions,
promote accurate knowledge, and create an inclusive space for open
dialogue.`;

export default Footer;
