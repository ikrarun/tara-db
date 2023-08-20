import {prisma} from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.suggestedreadings.findMany({
    take: 3,
   orderBy:{
    created_at:"desc"
   },
    select: {
      title: true,
      desc: true,
      link: true,
      imageUrl: true,
    },
  });

  return NextResponse.json({ res });
}
