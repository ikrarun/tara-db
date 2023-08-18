import prisma from "@/database/prismclient";
import { NextResponse } from "next/server";

export async function GET() {
    const totalquotes = await prisma.quotes.count();
    const min = 1;
    const max = totalquotes;
    const randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    const quote = await prisma.quotes.findUnique({
      where:{
        id:randomnumber
      }
    })

  return NextResponse.json({ quote });
}
