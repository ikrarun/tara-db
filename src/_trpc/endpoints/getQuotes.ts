import { publicProcedure } from "_trpc/_important/trpc";
import quotes from "../_important/quotes.json";

export default function get_Quotes() {
  return publicProcedure.query(async () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });
}
