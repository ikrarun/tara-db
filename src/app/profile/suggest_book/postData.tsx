"use server";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

export const postData = async (data: FormData) => {
const session = await getServerAuthSession();
  const name = data.get("title")?.toString().trim();
  const book_desc = data.get("desc")?.toString().trim();
  const book = data.get("book_link")?.toString().trim();
  const cover = data.get("cover_link")?.toString();
  return name && book_desc && book && cover && session ? prisma.suggestedreadings
  .create({
    data: {
      desc: book_desc,
      imageUrl: cover,
      title: name,
      link: book,
      suggestedby:session.user.id,
    },
    select: {
      id: true,
    },
  })
  .then((result) => {
    revalidatePath('/')
    return {
      id: result.id,
    };
  })
  .catch((e) => {
    return {
      id: e.code,
    };
  }) : {
    id: "INV_DATA",
  };
};
