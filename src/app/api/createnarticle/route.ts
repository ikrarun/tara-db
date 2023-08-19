import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const head = req.headers;
  const title = head.get("title");
  const desc = head.get("desc");
  const post = await req.json();

  if (title && desc && post) {
    var mres;
    try {
      mres = await prisma.myths.create({
        data: {
          title: title,
          shrotsec: desc,
        },
      });
    } catch (error) {
      return NextResponse.json({ message: error, success: false });
    }

    try {
      await prisma.posts.create({
        data: {
          wysiwyg: post,
          postid: mres.id,
        },
      });
      return NextResponse.json({
        message: "Successfully Posted",
        success: true,
      });
    } catch (error) {
      return NextResponse.json({ message: error, success: false });
    }
  } else {
    return NextResponse.json({ message: "Invalid Parameters", success: false });
  }
}
