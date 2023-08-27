"use server";

import { getServerAuthSession } from "Auth/auth";
import { prisma } from "Database/db";
import { revalidatePath } from "next/cache";
import {z} from "zod";

const formDataSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/), // Assuming a 10-digit phone number
});

export default async function submitData(formData: FormData) {
  const session = await getServerAuthSession();
  const user_id = session?.user.id as string;

  const formDataObject = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  try {
    const validatedData = formDataSchema.parse(formDataObject);

    return await prisma.joiningRequest
      .create({
        data: {
          first_name: validatedData.first_name,
          last_name: validatedData.last_name,
          email: validatedData.email,
          phone: validatedData.phone,
          id: user_id,
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
