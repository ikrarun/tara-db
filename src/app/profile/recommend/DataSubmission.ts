
"use server";
import { serverClient } from "TRPC/serverClient";
export default async function submitData({
  title,
  desc,
  cover_link,
  book_link,
}: {
  title: string;
  desc: string;
  cover_link: string;
  book_link: string;
}) {
  return await serverClient.suggestBooks({
    title: title,
    desc:desc,
    cover_link: cover_link,
    book_link: book_link
  });
}

