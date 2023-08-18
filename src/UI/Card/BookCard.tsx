import React from "react";
import Image from "next/image";
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
    <div className="h-fit snap-start w-44 sm:w-52  p-1 shrink-0  flex flex-col">
      <div className=" p-2 rounded-lg w-full border-gray-400 border">
        <div className="relative w-full aspect-video rounded-lg overflow-clip">
          <Image src={imgUrl} objectFit="cover" fill={true} alt={""} />
        </div>

        <div className="w-full flex flex-col gap-1">
          <h1 className="text-gray-600 text-lg">{title}</h1>
          <h1 className="text-gray-600 text-sm">{description}</h1>
          <a
            href={link}
            className="text-white w-fit rounded-md self-end p-1 select-none cursor-pointer bg-blue-700 text-sm text-end"
          >
            Get It
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
