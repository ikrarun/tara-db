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
    <div className="flex flex-row w-full p-4">
      <div className="flex flex-col w-11/12 gap-2">
        <h1 className="text-lg text-gray-900 select-none">{title}</h1>
        <h1 className="text-sm text-gray-700 select-none">{short_desc}</h1>
      </div>

      <div className="flex flex-col items-center justify-center w-1/12 gap-2 text-gray-600">
        <Link className="flex" href={`/${link}`}>
          <AiOutlineRead size={25} />
        </Link>
        <h1 className="text-xs text-gray-500 select-none">{formattedDate}</h1>
      </div>
    </div>
  );
};

export default FactCard;
