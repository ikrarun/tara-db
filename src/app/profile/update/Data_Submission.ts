"use server";

import { getServerAuthSession } from "Lib/Auth/auth";
import { prisma } from "Lib/Database/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formDataSchema = z.object({
  state: z.string(),
  city: z.string(),
  pincode: z.number(),
  phone: z.string().regex(/^\d{10}$/), // Assuming a 10-digit phone number
});

export default async function submitData(formData: FormData) {
  const session = await getServerAuthSession();
  const user_id = session?.user.id;

  const formDataObject = {
    state: formData.get("state"),
    city: formData.get("city"),
    pincode: formData.get("pincode"),
    phone: formData.get("phone"),
  };

  try {
    const validatedData = formDataSchema.parse(formDataObject);
    if (user_id) {
      return await prisma.userProfile
        .create({
          data: {
            state: validatedData.state,
            city: validatedData.city,
            pincode: validatedData.pincode,
            phone: validatedData.phone,
            userId: user_id,
          },
          select: {
            id: true,
          },
        })
        .then(async (result) => {
          await prisma.user.update({
            where: {
              id: user_id,
            },
            data: {
              role: "EDITOR",
            },
          });
          revalidatePath("/");

          return { message: result, result: true };
        })
        .catch(async (e) => {
          return e.message
            ? { code: e.message, result: false }
            : { code: "unknown", result: false };
        });
    } else {
      return { error: "unknown", result: false };
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const firstValidationError = error.errors[0];

      return firstValidationError?.message
        ? { error: firstValidationError.message, result: false }
        : { error: "unknown", result: false };
    }

    return { error: "unknown", result: false };
  }
}
