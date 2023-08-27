import { prisma } from "Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    return await prisma.suggestedreadings
      .findFirst({
        orderBy: {
          created_at: "desc",
        },
        select: {
          title: true,
          imageUrl: true,
          link: true,
          desc:true,
        },
      })
      .then((res) => {
        return res != null
          ? NextResponse.json(res)
          : NextResponse.json({ code: 404, result: false });
      })
      .catch((e) => {
        return NextResponse.json(
          e.code
            ? { code: e.code, result: false }
            : { code: 400, result: false }
        );
      });
  } catch (error) {
    return NextResponse.json({
      message: 900,
      result: false,
    });
  }
}
