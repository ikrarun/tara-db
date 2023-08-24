"use server";

import { validForm } from "@/lib/form_validator";
import { prisma } from "@/server/Database/db";

export async function submit_Form(data: validForm) {
  return await prisma.joiningRequest
    .create({
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        id: data.id,
      },
    })
    .then((res) => "true")
    .catch((e) => "failed");
}
