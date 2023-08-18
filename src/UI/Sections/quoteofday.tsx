import prisma from "@/database/prismclient";
import React from "react";

async function getquote() {
  const totalquotes = await prisma.quotes.count();
  const min = 1;
  const max = totalquotes;
  const randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const quote = await prisma.quotes.findUnique({
    where:{
      id:randomnumber
    }
  })

  return quote;
}

const quoteofday = async () => {
  const quote = await getquote();
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 my-4">
      <div className="flex flex-col gap-3 border border-gray-600/40 rounded-lg w-full p-4 items-center justify-center">
        <h1 className="text-sm text-gray-900 text-start w-full">Quote of the Day</h1>
        <h1 className="text-3xl text-gray-900 text-center w-full">{quote?.quote}</h1>
        <h1 className="text-sm text-gray-700 text-center capitalize">{quote?.author}</h1>
      </div>
    </div>
  );
};

export default quoteofday;
