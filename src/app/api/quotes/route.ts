import { NextRequest, NextResponse } from "next/server";
import quotes from './quotes.json'
export async function GET() {
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  const randomQuote = getRandomQuote();
  return NextResponse.json(randomQuote);
}
