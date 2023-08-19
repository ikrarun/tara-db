import React from "react";

interface Quotes {
  quote: string;
  author: string;
}

async function getquote() {
  const quotes = await fetch(`https://taradb.vercel.app/api/getQuotes`, {
    next: { revalidate: 86400 }
  });
  const pres = await quotes.json();
  const res = pres.quote as Quotes;
  return res;
}

const quoteofday = async () => {
  const data = await getquote();
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 my-4">
      <div className="flex flex-col gap-3 border border-gray-600/40 rounded-lg w-full p-4 items-center justify-center">
        <h1 className="text-sm text-gray-900 text-start w-full">
          Quote of the Day
        </h1>
        <h1 className="text-3xl text-gray-900 text-center w-full">
          {data.quote}
        </h1>
        <h1 className="text-sm text-gray-700 text-center capitalize">
          {data.author}
        </h1>
      </div>
    </div>
  );
};

export default quoteofday;
