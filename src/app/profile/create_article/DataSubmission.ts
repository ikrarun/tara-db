"use server";
import { serverClient } from "TRPC/serverClient";
export default async function submitData({
  title,
  short_desc,
  wysiwyg,
  creator,
}: {
  title: string;
  short_desc: string;
  wysiwyg: string;
  creator: string;
}) {
  return await serverClient.create_Article({
    title: title,
    short_desc: short_desc,
    wysiwyg: wysiwyg,
    creator: creator,
  });
}
