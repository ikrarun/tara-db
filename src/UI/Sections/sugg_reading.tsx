import React from "react";
import BookCard from "../Card/BookCard";
import prisma from "@/database/prismclient";

const getSuggested = async () => {
  const suggestions = await prisma.suggestedreadings.findMany({
    take:3,
    where:{
      featured:true
    }
  })

  return suggestions;
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
