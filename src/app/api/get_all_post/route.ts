import { prisma } from "@/server/Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = req.headers.get("take");

  if (data !== null) {
    const number = parseInt(data);

    // Number is ok
    if (!Number.isNaN(number) && number >= 0) {
      try {
        const response = await prisma.posts.findMany({
          take: number === 0 ? undefined : number,
          orderBy: {
            created_at: "desc",
          },
          select: {
            title: true,
            short_desc: true,
            date: true,
            id: true,
            wysiwyg: true,
          },
        });

        return NextResponse.json(response);
      } catch (e) {
        // Data Fetching Failed
        return NextResponse.json({
          message: "Invalid Request",
          success: false,
        });
      }
    }
    // Data is not a number
    else {
      return NextResponse.json({ message: "Invalid Request", success: false });
    }
  }

  // Data is Null
  else {
    return NextResponse.json({ message: "Invalid Request", success: false });
  }
}
