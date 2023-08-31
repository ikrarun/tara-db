import { get_suggested_book } from "Lib/apiPaths";
import BookCard from "components/Cards/BookCard";

const getBooks = async () => {
  const data = await fetch(get_suggested_book, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return data as Suggested_Book;
};

export const Book_of_Day = async () => {
  const data = await getBooks();

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
};
