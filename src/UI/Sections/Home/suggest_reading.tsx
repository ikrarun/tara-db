import React from "react";
import BookCard from "@/UI/Card/BookCard";
import host from "@/server/host";
import { prisma } from "@/server/db";

interface SuggestRead {
  title: string;
  desc: string;
  link: string;
  imageUrl: string;
}[]

const getSuggested = async () => {
  const res = prisma.suggestedreadings
    .findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      select: {
        title: true,
        desc: true,
        link: true,
        imageUrl: true,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      var result:any[] = []
      return result;
    });
  return res;
};

const suggest_reading = async () => {
  const suggestions = await getSuggested();

  if (!(suggestions.length > 0)) {
    return (
      <div className="flex flex-col w-full">
        <h1 className="px-5 mb-2 text-xl text-gray-800 w-fit text-start">
          Suggested Readings
        </h1>
        <div className="flex flex-col items-center justify-center w-full p-1 overflow-x-auto animate-bounce">
          <h1 className="text-red-500">No Suggestions Available Right Now!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="px-5 mb-2 text-xl text-gray-800 w-fit text-start">
        Suggested Readings
      </h1>
      <div className="flex flex-row items-center justify-start p-1 overflow-x-auto max-w-fit">
        {suggestions.map((data, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3">
            <BookCard
              title={data.title}
              description={data.desc}
              link={data.link}
              imgUrl={data.imageUrl}
            />
          </div>
        ))}
      </div>
      <h1 className="self-end px-5 mb-2 text-base text-blue-700 cursor-pointer select-none w-fit text-end">
        More...
      </h1>
    </div>
  );
};

export default suggest_reading;
