import QuoteCard from "_components/QuoteCard";
import { serverClient } from "_trpc/_important/serverClient";
/**
 * Generate a random quote daily for the users.*/
export const Quotes_Of_Day = async () => {
  const data = await serverClient.getQuotes();
  try {
    const { content, author } = data;
    return <QuoteCard quote={content} author={author} />;
  } catch (error) {
    return <QuoteCard />;
  }
};
