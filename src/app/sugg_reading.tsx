import React from "react";
import BookCard from "@/UI/Card/BookCard";
import host from "@/server/host";

interface SuggRead {
  title: string;
  desc: string;
  link: string;
  imageUrl: string;
}

const getSuggested = async () => {
  const suggest = await fetch(`${host}/api/getSuggested`, {
    next: { revalidate: 60 },
  });
  const sugg = await suggest.json();
  const res = sugg.res as SuggRead[];
  return res;
};

const sugg_reading = async () => {
  const suggestions = await getSuggested();
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mb-2  w-fit px-5 text-start text-gray-800">
        Suggested Readings
      </h1>
      <div className="flex flex-row max-w-fit overflow-x-auto p-1 items-center justify-start">
        {suggestions.map((data, index) => (
          <div key={index} className=" w-full sm:w-1/2 md:w-1/3">
            <BookCard
              title={data.title}
              description={data.desc}
              link={data.link}
              imgUrl={data.imageUrl}
            />
          </div>
        ))}
      </div>
      <h1 className="text-base cursor-pointer select-none mb-2 w-fit self-end px-5 text-end text-blue-700">
        More...
      </h1>
    </div>
  );
};

export default sugg_reading;
