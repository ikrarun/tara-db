import React from "react";
import CardForPost from "@/components/CardForPost";
import { prisma } from "@/server/Database/db";
import Link from "next/link";

const get_myths = async (page: number) => {
  const itemsPerPage = 5;
  const pageNumber = page ?? 1;
  return await prisma.posts
    .findMany({
      skip: (pageNumber - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: {
        created_at: "desc",
      },
      select: {
        title: true,
        short_desc: true,
        id: true,
        date: true,
      },
    })
    .then((res) => {
      if (pageNumber > 1) {
        return res.length > 0 ? res : "invalidPage";
      } else return res.length > 0 ? res : "code";
    })
    .catch((e) => {
      return e.code as string;
    });
};

const myth_busting = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { pg } = searchParams;
  let page;
  if (pg) {
    const page_no = pg && (typeof pg == typeof "" ? pg : pg[0]);
    page = page_no ? page_no : "1";
  }
  const fetchPage = page ? page : "1";

  const page_num = parseInt(fetchPage as string) ?? 1;
  const total_posts = await prisma.posts.count();
  const total_pages = Math.ceil(total_posts / 5);
  const myths = await get_myths(page_num);

  if (typeof myths !== "object") {
    return myths === "code" ? (
      <div className="flex flex-col items-start justify-center w-full gap-2 mx-auto">
        <div className="flex flex-col items-center justify-center w-full p-4 my-4">
          <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
            <h1 className="w-full text-sm text-center text-gray-900">
              No Articles available right now!
            </h1>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-start justify-center w-full gap-2 mx-auto">
        <div className="flex flex-col items-center justify-center w-full p-4 my-4">
          <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
            <h1 className="w-full text-sm text-center text-gray-900">
              Invalid Request!
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  items-center justify-center w-full gap-2 mx-auto">
      <div className="flex flex-col w-full">
        <h1 className=" mb-2 text-xl text-gray-800 w-fit text-start">
          We have been continuously working for providing information&apos;s
        </h1>

        <div
          style={{ scrollbarWidth: "none" }}
          className="w-full flex flex-col gap-2 "
        >
          {myths.map((data, index) => {
            return (
              <div key={index} className="w-full aspect-auto">
                <CardForPost
                  title={data.title}
                  short_desc={data.short_desc}
                  date={data.date.toISOString()}
                  link={data.id}
                />
              </div>
            );
          })}
        </div>
        <div className="flex mt-1 flex-row justify-between">
          {page_num == 1 ? (
            <div />
          ) : (
            <Link
              className="p-1 bg-blue-700 text-white rounded-md"
              href={`/posts/?pg=${page_num - 1}`}
            >
              Prev
            </Link>
          )}
          {page_num === total_pages ? (
            <div />
          ) : (
            <Link
              className="p-1 bg-blue-700 text-white rounded-md"
              href={`/posts/?pg=${page_num + 1}`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default myth_busting;
