import { quoteResponse } from "@/lib/ApiSafety";

/**
 * Generate a random quote daily for the users.*/
export const Quotes_Of_Day = async () => {
  const data = await get_Quotes();
  try {
    const { quote, author } = quoteResponse.parse(data);
    return (
      <div className=" w-full select-none bg-gray-950/70 backdrop-blur-sm text-white grow p-4 gap-3 rounded-md items-start justify-center flex flex-col">
        <h1 className="text-sm font-light">Quote of the Day</h1>
        <h1 className="text-2xl font-bold">{quote}</h1>
        <h1 className="text-lg font-semibold">{author}</h1>
      </div>
    );
  } catch (error) {
    return (
      <div className=" w-full select-none bg-gray-950 backdrop-blur-sm text-white sm:w-[60%] p-4 gap-3 rounded-md items-start justify-center flex flex-col">
        <h1 className="text-sm font-light">Quote of the Day</h1>
        <h1 className="text-2xl font-bold">Is Currently Now Available</h1>
        <h1 className="text-lg font-semibold">Try again after a while</h1>
      </div>
    );
  }
};



export async function get_Quotes() {
  const data = await fetch("https://dummyjson.com/quotes/random", {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());
  return data;
}

