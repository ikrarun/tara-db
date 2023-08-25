import { z } from "zod";



export const single_Response_Schema = z.object({
  title: z.string(),
  id:z.string(),
  short_desc: z.string(),
  date: z.string(),
  wysiwyg: z.string(),

})
export const responseSchema = z.array(
 single_Response_Schema
);




export const quoteResponse = z.object({
  id: z.number(),
  content: z.string(),
  author: z.string(),
});


const quoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  authorSlug: z.string(),
  length: z.number(),
  dateAdded: z.string(),
  dateModified: z.string(),
});


export const bookResponse = z.object({
  link: z.string(),
  title: z.string(),
  desc: z.string(),
  imageUrl: z.string(),
});

type TypeofQuoteResponse = z.infer<typeof quoteResponse>;
type TypeofBookResponse = z.infer<typeof bookResponse>;

export type { TypeofQuoteResponse, TypeofBookResponse };
