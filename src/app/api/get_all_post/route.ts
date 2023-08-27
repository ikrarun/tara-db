import { prisma } from "Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const header = req.headers;
  const take = header.get("take");
  const type = header.get("type");
  const post_id = header.get("post_id");

  try {
    if (type === "card") {
      return await prisma.posts
        .findMany({
          take: parseInt(take??'z') ?? null,
          select: {
            title: true,
            short_desc: true,
            date: true,
            id:true
          },
        })
        .then((res) => {
          return res.length > 0 ? NextResponse.json(res) : NextResponse.json({ code: 504, result: false });
        })
        .catch((e) => {
          return NextResponse.json(
            e.code
              ? { code: e.code, result: false }
              : { code: 500, result: false }
          );
        });
    }
    if (type === "full" && post_id) {
      return await prisma.posts
        .findUnique({
          where: {
            id: post_id,
          },
          select: {
            title: true,
            short_desc: true,
            date: true,
            wysiwyg: true,
          },
        })
        .then((res) => {
          if (res != null) {
            return NextResponse.json(res);
          }
          return NextResponse.json({ code: 404, result: false });
        })
        .catch((e) => {
          return NextResponse.json(
            e.code
              ? { code: e.code, result: false }
              : { code: 400, result: false }
          );
        });
    }
  } catch (error) {
    return NextResponse.json({
      message: 900,
      result: false,
    });
  }
}
