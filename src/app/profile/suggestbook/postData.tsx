"use server";
import { prisma } from "@/server/db";

export const postData = async (data: FormData) => {
  const name = data.get("title")?.toString().trim();
  const desc = data.get("desc")?.toString().trim();
  const book = data.get("booklink")?.toString().trim();
  const cover = data.get("coverlink")?.toString().trim();
  if (name && desc && book && cover) {
    return prisma.suggestedreadings
      .create({
        data: {
          desc: desc,
          imageUrl: cover,
          title: name,
          link: book,
        },
        select: {
          id: true,
        },
      })
      .then((result) => {
        const res = {
          id: result.id,
        };
        return res;
      })
      .catch((e) => {
        const res = {
          id: e.code,
        };
        return res;
      });
  } else {
    const res = {
      id: "INVDATA",
    };
    return res;
  }
};
