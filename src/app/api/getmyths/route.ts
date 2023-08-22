import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = req.headers.get("take");

  if (data !== null) {
    const number = parseInt(data);

    // Number is ok
    if (!Number.isNaN(number) && number >= 0) {
      // Data fetching Successful
      try {
        const response = await prisma.myths.findMany({
          take: number !== 0 ? number : undefined,
          orderBy: {
            created_at: "desc",
          },
          select: {
            title: true,
            short_desc: true,
            date: true,
            id:true,
            Posts: {
              select: {
                wysiwyg: true,
              },
            },
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
