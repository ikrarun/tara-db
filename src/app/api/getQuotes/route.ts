import { prisma } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  const allQutoe = await prisma.quotes.findMany();
  const randomIndex = Math.floor(Math.random() * allQutoe.length);
  const randomQuote = allQutoe[randomIndex];

  var quote = () => {
    if (randomQuote != null) {
      return {
        quote: randomQuote.quote,
        author: randomQuote.author,
      };
    } else {
      return null;
    }
  };
  const data = quote();
  return NextResponse.json({ data });
}
