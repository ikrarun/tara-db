import quotes from "./quotes.json";

async function get_It() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
import { publicProcedure } from "TRPC/trpc";

export default function getQuotes() {
  return publicProcedure.query(async () => {
    const res = await get_It()
      .then((res) => {
        if (res) {
          return res
        }
        else return null
      });
    return res;
  });
}
