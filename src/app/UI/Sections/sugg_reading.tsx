import React from "react";
import BookCard from "../Card/BookCard";

const sugg_reading = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mb-2  w-fit px-5 text-start text-gray-800">
        Suggested Readings
      </h1>
      <div className="flex flex-row max-w-fit overflow-x-auto p-1 items-center justify-start">
        <BookCard
          title={"Title"}
          description={"Desc"}
          link={"Link"}
          imgUrl={
            "https://images.pexels.com/photos/3457273/pexels-photo-3457273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />
        <BookCard
          title={"Title"}
          description={"Desc"}
          link={"Link"}
          imgUrl={
            "https://images.pexels.com/photos/3457273/pexels-photo-3457273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />
        <BookCard
          title={"Title"}
          description={"Desc"}
          link={"Link"}
          imgUrl={
            "https://images.pexels.com/photos/3457273/pexels-photo-3457273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />
        <BookCard
          title={"Title"}
          description={"Desc"}
          link={"Link"}
          imgUrl={
            "https://images.pexels.com/photos/3457273/pexels-photo-3457273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
        />
      </div>
      <h1 className="text-base cursor-pointer select-none mb-2 w-fit self-end px-5 text-end text-blue-700">
        More...
      </h1>
    </div>
  );
};

export default sugg_reading;
