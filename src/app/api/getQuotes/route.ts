import { prisma } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  const qid = await prisma.quotes.findMany({
    select: {
      id: true,
    },
  });

  const allQutoe = await prisma.quotes.findMany();
  const randomIndex = Math.floor(Math.random() * allQutoe.length);
  const randomQuote = allQutoe[randomIndex];

  var quote = {
    quote: randomQuote.quote,
    author: randomQuote.author,
  };

  return NextResponse.json({ quote });
}
