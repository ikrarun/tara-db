import { prisma } from "_database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await prisma.suggestedreadings.findFirst({
    orderBy: {
      created_at: "desc",
    },
    select: {
      title: true,
      desc: true,
      link: true,
      imageUrl: true,
    },
  });
  return NextResponse.json(res);
}
