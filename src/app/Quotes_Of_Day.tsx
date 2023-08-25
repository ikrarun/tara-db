import { quoteResponse } from "_lib/ApiSafety";
import QuoteCard from "_components/QuoteCard";
import host from "_database/host";
/**
 * Generate a random quote daily for the users.*/
export const Quotes_Of_Day = async () => {
  const data = await get_Quotes();
  try {
    const { content, author } = quoteResponse.parse(data);
    return <QuoteCard quote={content} author={author} />;
  } catch (error) {
    return <QuoteCard />;
  }
};

export async function get_Quotes() {
  return await fetch(`${host}/api/quotes`, {
    next: {
      revalidate: 60 * 60 * 12,
    },
  }).then((res) => res.json());
}
