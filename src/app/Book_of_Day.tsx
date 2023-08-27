import { host } from "Lib/host";
import BookCard from "_components/BookCard";

type Data =
  | {
      link: string;
      title: string;
      imageUrl: string;
      desc: string;
    }
  | {
      code: any;
      result: boolean;
    };

const getBooks = async () => {
  const data = await fetch(`${host}/api/get_suggested_book`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return data as Data;
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
