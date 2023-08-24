import React from "react";
import { AiOutlineRead } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface PostData {
  title: string;
  short_desc: string;
  date?: string;
  link: string;
}

const CardForPost = ({ title, short_desc, date, link }: PostData) => {
  let formattedDate;
  let dateObject;
  if (date) {
    dateObject = parseISO(date);
    formattedDate = format(dateObject, "dd-MM-yyyy");
  }

  if(date){
    return (
      <Link className="flex w-full" href={`/${link}`}>
        <div className="flex border bg-blue-700 gap-3 sm:gap-0 text-white backdrop-blur-sm border-gray-700/70 rounded-md sm:flex-row flex-col w-full p-4">
          <div className="flex flex-col grow gap-2">
            <h1 className="text-lg select-none">{title}</h1>
            <h1 className="text-sm text-gray-200 select-none">{short_desc}</h1>
          </div>
          <div className="flex flex-row  flex-shrink-0 sm:flex-col max-w-fit justify-start sm:justify-center ml-2 sm:items-end items-center gap-2 text-white">
            <AiOutlineRead size={25} />
            <h1 className="text-xs shrink-0 flex  w-fit text-white select-none">
            {formattedDate}
            </h1>
          </div>
        </div>
      </Link>
    );
  }
else
  return (
    <div className="flex w-full">
      <div className="flex border bg-blue-700 gap-3 sm:gap-0 text-white backdrop-blur-sm border-gray-700/70 rounded-md sm:flex-row flex-col w-full p-4">
        <div className="flex flex-col grow gap-2">
          <h1 className="text-lg select-none">{title}</h1>
          <h1 className="text-sm text-gray-200 select-none">{short_desc}</h1>
        </div>
        <div className="flex flex-row  flex-shrink-0 sm:flex-col max-w-fit justify-start sm:justify-center ml-2 sm:items-end items-center gap-2 text-white" />
      </div>
    </div>
  );
};

export default CardForPost;
