import prisma from "@/database/prismclient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const head = req.headers;
  const title = head.get("title");
  const desc = head.get("desc");
  const post = head.get("post");

  if (title && desc && post) {
    console.log(title + " \n " + desc + " \n " + post);
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
      return NextResponse.json({ message: "Successfully Posted", success: true });
    } catch (error) {
      return NextResponse.json({ message: error, success: false });
    }
  } else {
    return NextResponse.json({ message: "Invalid Parameters", success: false });
  }
}
