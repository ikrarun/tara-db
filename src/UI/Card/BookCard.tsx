import React from "react";

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
    <div className="h-fit snap-start w-full sm:w-1/2 md:w-1/3 p-1 shrink-0  flex flex-col">
      <div className=" p-2 rounded-lg  border-gray-400 border">
        <div className="w-full h-44 sm:h-52 rounded-lg overflow-clip">
          <img src={imgUrl} alt={""} className="h-full w-full" style={{objectFit:'cover'}}  />
        </div>
        <h1 className="text-gray-600 text-base">{title}</h1>
        <h1 className="text-gray-600 text-xs">{description}</h1>
        <a
          href={link}
          className="text-white w-fit rounded-md self-end p-1 select-none cursor-pointer bg-blue-700 text-xs text-end"
        >
          Read Now
        </a>
      </div>
    </div>
  );
};

export default BookCard;
