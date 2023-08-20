import host from "@/server/host";
import React from "react";

interface Quotes {
  quote: string;
  author: string;
}

async function getquote() {
  const quotes = await fetch(`${host}/api/getQuotes`, {
     next: { revalidate: 60  },
  });
  const pres = await quotes.json();
  const res = pres.quote as Quotes;
  return res;
}

const quoteofday = async () => {
  const data = await getquote();
  if (data != null) {
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
  } else {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 my-4">
        <div className="flex flex-col gap-3 border border-gray-600/40 rounded-lg w-full p-4 items-center justify-center">
          <h1 className="text-sm text-gray-900 text-center w-full">
            No Quotes available to recommend!
          </h1>
        </div>
      </div>
    );
  }
};

export default quoteofday;
