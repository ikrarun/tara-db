import { FeaturedPost } from "./FeaturedPost";
import { Quotes_Of_Day } from "./Quotes_Of_Day";
import { Book_of_Day } from "./Book_of_Day";
export default async function Home() {
  return (
    <div className="grow w-full flex gap-3 flex-col">
      <div className="flex gap-3 flex-col w-full sm:flex-row ">
        <Book_of_Day />
        <Quotes_Of_Day />
      </div>
      <div className="h-fit flex w-full flex-col items-start justify-start">
        <FeaturedPost />
      </div>
    </div>
  );
}


