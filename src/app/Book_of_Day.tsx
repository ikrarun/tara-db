import BookCard from "_components/BookCard";
import { serverClient } from "_trpc/_important/serverClient";

export const Book_of_Day = async () => {
  const data = await serverClient.getBooks();

  return typeof data === "boolean" ? (
    <BookCard
      title={"Can't Recommend Any Book Right Now"}
      desc={"Try again after a while"}
    />
  ) : (
    <BookCard
      imageUrl={data.imageUrl}
      link={data.link}
      title={data.title ?? ""}
      desc={data.desc ?? ""}
    />
  );
};
