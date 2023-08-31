import { get_quotes } from "Lib/apiPaths";
import QuoteCard from "components/Cards/QuoteCard";

const get_Quotes = async () => {
  const data = await fetch(get_quotes, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return data as Quotes;
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
