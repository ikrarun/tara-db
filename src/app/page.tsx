import { get_suggested_book } from "Lib/Utils/apiPaths";
import BookCard from "components/Cards/BookCard";
import CardForPost from "components/Cards/CardForArticle";
import { Button } from "components/Buttons/Button";
import { get_all_post } from "Lib/Utils/apiPaths";
import { get_quotes } from "Lib/Utils/apiPaths";
import QuoteCard from "components/Cards/QuoteCard";

export default async function Home() {
  const books = await getBooks();
  const featuredArticle = await get_Post();
  const quote = await get_Quotes();

  return (
    <div className="grow w-full flex gap-3 flex-col">
      <div className="flex gap-3 flex-col w-full sm:flex-row ">
        <Book_of_Day data={books} />
        <Quotes_Of_Day data={quote} />
      </div>
      <div className="h-fit flex w-full flex-col items-start justify-start">
        <FeaturedArticle data={featuredArticle} />
      </div>
    </div>
  );
}

function Quotes_Of_Day({ data }: { data: Quotes }) {
  return "code" in data ? (
    <QuoteCard />
  ) : (
    <QuoteCard quote={data.content} author={data.author} />
  );
}

async function FeaturedArticle({ data }: { data: ArrayArticles }) {
  return "code" in data ? (
    <div className="flex flex-col items-start justify-center w-full gap-2 mx-auto">
      <div className="flex flex-col items-center justify-center w-full my-4">
        <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
          <h1 className="w-full text-sm text-center text-gray-900">
            No Articles available right now!
          </h1>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full items-start justify-start gap-2">
      {data.map((data, index) => (
        <CardForPost
          key={index}
          title={data.title}
          short_desc={data.short_desc}
          date={data.date}
          link={data.id}
        />
      ))}
      {data.length >= 3 && (
        <div className="flex flex-row items-center justify-end">
          <Button href={"/articles"}>Read More..</Button>
        </div>
      )}
    </div>
  );
}

function Book_of_Day({ data }: { data: Suggested_Book }) {
  return "code" in data ? (
    <BookCard
      title={"Can't Recommend Any Book Right Now"}
      desc={"Try again after a while"}
    />
  ) : (
    <BookCard
      imageUrl={data.imageUrl}
      link={data.link}
      title={data.title}
      desc={data.desc}
    />
  );
}

async function getBooks() {
  const data = await fetch(get_suggested_book, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return data as Suggested_Book;
}

async function get_Post() {
  const data = await fetch(get_all_post, {
    next: { revalidate: 60 },
    headers: {
      take: "3",
      type: "card",
    },
  }).then((res) => res.json());

  return data as ArrayArticles;
}

async function get_Quotes() {
  const data = await fetch(get_quotes, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return data as Quotes;
}
