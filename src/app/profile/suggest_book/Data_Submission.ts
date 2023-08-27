"use server";
import { getServerAuthSession } from "Auth/auth";
import { prisma } from "Database/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define a schema using Zod
const formDataSchema = z.object({
  title: z.string(),
  desc: z.string(),
  book_link: z.string().url(),
  cover_link: z.string().url(),
  user_id: z.string(),
});

export default async function Data_Submission(formData: FormData) {
  const session = await getServerAuthSession();
  const user_id = session?.user.id as string;
  const formDataObject = {
    title: formData.get("title")?.toString().trim(),
    desc: formData.get("desc")?.toString().trim(),
    book_link: formData.get("book_link")?.toString().trim(),
    cover_link: formData.get("cover_link")?.toString().trim(),
    user_id: user_id,
  };

  try {
    const validatedData = formDataSchema.parse(formDataObject);
    console.log("Data is valid:", validatedData);

    return await prisma.suggestedreadings
      .create({
        data: {
          desc: validatedData.desc,
          imageUrl: validatedData.cover_link,
          title: validatedData.title,
          link: validatedData.book_link,
          suggestedby: validatedData.user_id,
        },
        select: {
          id: true,
        },
      })
      .then((result) => {
        revalidatePath("/");
        return { message: result, result: true };
      })
      .catch(async (e) => {
        return e.message
          ? { code: e.message, result: false }
          : { code: "unknown", result: false };
      });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const firstValidationError = error.errors[0];

      return firstValidationError.message
        ? { error: firstValidationError.message, result: false }
        : { error: "unknown", result: false };
    }

    return { error: "unknown", result: false };
  }
}
