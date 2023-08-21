"use server";

import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export default async function post_data(data: FormData) {
  const user = await getServerAuthSession();
  const title = data.get("title")?.toString();
  const desc = data.get("desc")?.toString();
  const post = data.get("post")?.toString();

  if (title && desc && post) {
    const res = await prisma.myths
      .create({
        data: {
          title: title,
          short_desc: desc,
          creator: user?.user.id,
        },
        select: {
          id: true,
        },
      })
      //  ** Myth Create Successfully
      .then(async (res) => {
        const result = await prisma.posts
          .create({
            data: {
              wysiwyg: post,
              postid: res.id,
            },
            select: {
              id: true,
            },
          })
          // ** Post Create Successfully
          .then(() => {
            const res = {
              id: "SUCCESS",
            };
            return res;
          })
          // ** Post Creation Failed

          .catch((e) => {
            const err = e.code === "P2002" ? "CODE" : "ERROR";
            const res = {
              id: err,
            };
            return res;
          });
        return result;
      })
      // * Myths Creation Failed
      .catch((e) => {
        const err = e.code === "P2002" ? "CODE" : "ERROR";
        const res = {
          id: err,
        };
        return res;
      });
    return res;
  } else {
    const res = {
      id: "INV_DATA",
    };
    return res;
  }
}
