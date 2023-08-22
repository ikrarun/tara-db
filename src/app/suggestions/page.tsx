import React from "react";
import FactCard from "@/components/cards/FactCard";
import { prisma } from "@/server/db";
import BookCard from "@/components/cards/BookCard";

const getSuggested = async () => {
  const res = prisma.suggestedreadings
    .findMany({
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
      var result;
      if (res.length > 0) {
        result = res;
      } else {
        result = "code";
      }
      return result;
    })
    .catch((e) => {
      const resCode = e.code as string;
      return resCode;
    });
  return res;
};

const suggest_reading = async () => {
  const suggestions = await getSuggested();

  if (typeof suggestions !== "object") {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2 mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
            <h1 className="w-full text-sm text-center text-gray-900">
              No Books available to recommend!
            </h1>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2 mx-auto">
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
        </div>
      </div>
    );
};

export default suggest_reading;
