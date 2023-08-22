import { prisma } from "@/server/db";
import React from "react";

async function get_quote() {
  const all_Quote = await prisma.quotes.findMany();
  const randomIndex = Math.floor(Math.random() * all_Quote.length);
  const randomQuote = all_Quote[randomIndex];

  if (randomQuote != null) {
    return {
      quote: randomQuote.quote,
      author: randomQuote.author,
    };
  } else {
    return null;
  }
}

const Quote_of_Day = async () => {
  const data = await get_quote();
  if (data != null) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 my-4">
        <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
          <h1 className="w-full text-sm text-gray-900 text-start">
            Quote of the Day
          </h1>
          <h1 className="w-full text-3xl text-center text-gray-900">
            {data.quote}
          </h1>
          <h1 className="text-sm text-center text-gray-700 capitalize">
            {data.author}
          </h1>
        </div>
      </div>
    );
  } else if (data === null) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 my-4">
        <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
          <h1 className="w-full text-sm text-center text-gray-900">
            No Quotes available to recommend!
          </h1>
        </div>
      </div>
    );
  }
};

export default Quote_of_Day;
