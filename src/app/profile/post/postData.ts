"use server";

import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

export default async function post_data(data: FormData) {
  const session = await getServerAuthSession();
  const post_title = data.get("title")?.toString();
  const desc = data.get("desc")?.toString();
  const post = data.get("post")?.toString();

  try {
    if (!post_title || !desc || !post || !session) {
      return {
        id: "INV_DATA",
      };
    }

    const createdMyth = await prisma.myths.create({
      data: {
        title: post_title,
        short_desc: desc,
        creator: session.user.id,
      },
      select: {
        id: true,
      },
    });

    await prisma.posts.create({
      data: {
        wysiwyg: post,
        postid: createdMyth.id,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/");

    return {
      id: "SUCCESS",
    };
  } catch (error: any) {
    return error.code === "P2002" ? { id: "CODE" } : { id: "ERROR" };
  }
}
