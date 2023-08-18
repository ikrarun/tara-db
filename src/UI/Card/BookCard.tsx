import React from "react";
import Image from 'next/image'
const BookCard = ({
  title,
  description,
  link,
  imgUrl,
}: {
  title: string;
  description: string;
  link: string;
  imgUrl: string;
}) => {
  return (
    <div className="h-fit snap-start w-full p-1 shrink-0  flex flex-col">
      <div className=" p-2 rounded-lg w-full border-gray-400 border">
        <div className="w-44 sm:w-52 h-44 sm:h-52 rounded-lg overflow-clip">
          <Image src={imgUrl} alt={""} width='44' height='44' style={{objectFit:'cover'}}  />
        </div>
        <h1 className="text-gray-600 text-base">{title}</h1>
        <h1 className="text-gray-600 text-xs">{description}</h1>
        <a
          href={link}
          className="text-white w-fit rounded-md self-end p-1 select-none cursor-pointer bg-blue-700 text-xs text-end"
        >
          Get Now
        </a>
      </div>
    </div>
  );
};

export default BookCard;
