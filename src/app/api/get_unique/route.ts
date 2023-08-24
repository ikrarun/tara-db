import { prisma } from "@/server/Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = req.headers.get("id");

  if (data === null) {
    return NextResponse.json({ message: "Invalid Request", success: false });
  }
  try {
    const response = await prisma.posts.findUnique({
      where: {
        id: data,
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
