import { prisma } from "Lib/Database/db";
import { publicProcedure } from "TRPC/trpc";

export default function getBooks() {
  return publicProcedure.query(async () => {
    const res = await prisma.suggestedreadings.findFirst({
      orderBy: {
        created_at: 'desc'
      },
      select: {
        imageUrl: true,
        title: true,
        link: true,
        desc: true,
      },
    }).then((res) => { return res; });
    return res;
  });
}
