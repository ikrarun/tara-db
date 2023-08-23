import React from "react";
import { AiOutlineRead } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const FactCard = ({
  title,
  short_desc,
  date,
  link,
}: {
  title: string;
  short_desc: string;
  date: string;
  link: string;
}) => {
  const dateObject = parseISO(date);
  const formattedDate = format(dateObject, "dd-MM-yyyy");
  return (
    <Link className="flex" href={`/${link}`}>
      <div className="flex border bg-cyan-700 gap-3 sm:gap-0 text-white backdrop-blur-sm border-gray-700/70 rounded-md sm:flex-row flex-col w-full p-4 my-1">
        <div className="flex flex-col w-full sm:w-11/12 gap-2">
          <h1 className="text-lg select-none">{title}</h1>
          <h1 className="text-sm text-gray-200 select-none">{short_desc}</h1>
        </div>

        <div className="flex flex-row sm:flex-col items-center w-full justify-start sm:justify-center sm:w-1/12 gap-2 text-white">
          <AiOutlineRead size={25} />
          <h1 className="text-xs text-white select-none">{formattedDate}</h1>
        </div>
      </div>
    </Link>
  );
};

export default FactCard;
