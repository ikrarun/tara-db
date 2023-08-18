import React from "react";
import { AiOutlineRead } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const FactCard = ({
  title,
  shortdesc,
  date,
  link,
}: {
  title: string;
  shortdesc: string;
  date: string;
  link: string;
}) => {
  const dateObject = parseISO(date);
  const formattedDate = format(dateObject, "dd-MM-yyyy");
  return (
    <div className="w-full flex-row flex p-4">
      <div className="flex flex-col gap-2 w-11/12">
        <h1 className="text-lg select-none text-gray-900">{title}</h1>
        <h1 className="text-sm select-none text-gray-700">{shortdesc}</h1>
      </div>

      <div className="flex flex-col gap-2 items-center text-gray-600 justify-center w-1/12">
        <Link className="flex" href={`/${link}`}>
          <AiOutlineRead size={25} />
        </Link>
        <h1 className="text-xs select-none text-gray-500">{formattedDate}</h1>
      </div>
    </div>
  );
};

export default FactCard;
