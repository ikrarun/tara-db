"use server";
import { prisma } from "@/server/db";

export const postData = async (data: FormData) => {
  const name = data.get("name")?.toString().trim();
  const phone = data.get("phone")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  if (name && phone && phone?.length > 10 && email) {
    return prisma.joiningRequest
      .create({
        data: {
          email: email,
          phone: phone,
          name: name,
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
      id: "INV_DATA",
    };

    return res;
  }
};
