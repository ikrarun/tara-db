import BookCard from "@/components/BookCard";
import { bookResponse, quoteResponse, responseSchema } from "@/lib/ApiSafety";
import host from "@/server/Database/host";
import FactCard from "@/components/FactCard";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="grow w-full flex gap-3 flex-col">
      <div className="grow flex gap-3 flex-col sm:flex-row ">
        <Quotes_Of_Day />
        <Book_of_Day />
      </div>
      <div className="h-fit sm:min-h-fit">
        <MythsBusted />
      </div>
    </div>
  );
}

const MythsBusted = async () => {
  const data = await get_Post();
  try {
    const validResponses = responseSchema.parse(data);
    return validResponses && validResponses.length > 0 ? (
      <div className="flex flex-col gap-2">
        {validResponses.map((res, index) => (
          <FactCard
            key={index}
            title={res.title}
            short_desc={res.short_desc}
            date={res.date}
            link={res.id}
          />
        ))}
        {validResponses.length >= 3 && (
          <div className="flex flex-row items-center justify-end">
            <Link href={'/posts'} className="p-1 select-none cursor-pointer rounded-md text-red-600">Read More..</Link>
          </div>
        )}
      </div>
    ) : (
      <FactCard
        title={"Can't Show Any Post[s] Right Now"}
        short_desc={"Try again after a while"}
        date={"2023-08-22T15:45:00.000-04:00"}
        link={data.id}
      />
    );
  } catch (error) {
    return (
      <FactCard
        title={"Can't Show Any Post[s] Right Now"}
        short_desc={"Try again after a while"}
        date={"2023-08-22T15:45:00.000-04:00"}
        link={"/"}
      />
    );
  }
};

/**
 * Generate a random quote daily for the users.*/
const Quotes_Of_Day = async () => {
  const data = await get_Quotes();
  try {
    const { quote, author } = quoteResponse.parse(data);
    return (
      <div className=" w-full select-none hover:scale-105 hover:z-20 ease-in-out duration-75 bg-gray-950 backdrop-blur-sm text-white sm:w-[60%] p-4 gap-3 rounded-md items-start justify-center flex flex-col">
        <h1 className="text-sm font-light">Quote of the Day</h1>
        <h1 className="text-2xl font-bold">{quote}</h1>
        <h1 className="text-lg font-semibold">{author}</h1>
      </div>
    );
  } catch (error) {
    return (
      <div className=" w-full select-none hover:scale-105 hover:z-20 ease-in-out duration-75 bg-gray-950 backdrop-blur-sm text-white sm:w-[60%] p-4 gap-3 rounded-md items-start justify-center flex flex-col">
        <h1 className="text-sm font-light">Quote of the Day</h1>
        <h1 className="text-2xl font-bold">Is Currently Now Available</h1>
        <h1 className="text-lg font-semibold">Try again after a while</h1>
      </div>
    );
  }
};

/**
 * Represent book of the day for users.*/
const Book_of_Day = async () => {
  const data = await get_Books();
  try {
    const { title, desc, imageUrl, link } = bookResponse.parse(data);
    return (
      <BookCard imageUrl={imageUrl} link={link} title={title} desc={desc} />
    );
  } catch (error) {
    return (
      <BookCard
        title={"Can't Recommend Any Book Right Now"}
        desc={"Try again after a while"}
      />
    );
  }
};

async function get_Quotes() {
  const data = await fetch("https://dummyjson.com/quotes/random", {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());
  return data;
}

async function get_Books() {
  const data = await fetch(`${host}/api/suggested_readings`, {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());
  return data;
}

async function get_Post() {
  const data = await fetch(`${host}/api/get_all_post`, {
    next: {
      revalidate: 10,
    },
    headers: {
      take: "3",
    },
  }).then((res) => res.json());
  return data;
}
