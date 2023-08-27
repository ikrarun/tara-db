import { host } from "Lib/host";
import QuoteCard from "_components/QuoteCard";

type Data =
  | {
      id: number;
      content: string;
      author: string;
    }
  | {
      code: any;
      result: boolean;
    };

const get_Quotes = async () => {
  const data = await fetch(`${host}/api/get_quotes`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return data as Data;
};

export const Quotes_Of_Day = async () => {
  const data = await get_Quotes();

  if ("code" in data) {
    return <QuoteCard />;
  } else {
    const { content, author } = data;
    return <QuoteCard quote={content} author={author} />;
  }
};
