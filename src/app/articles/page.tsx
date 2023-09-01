import React from "react";
import CardForArticle from "components/Cards/CardForArticle";
import { get_all_post } from "Lib/Utils/apiPaths";

async function get_Post() {
  const res = await fetch(get_all_post, {
    next: {
      revalidate: 60,
    },
    headers: {
      type: "card",
    },
  }).then((res) => res.json());
  return res as ArrayArticles;
}

export default async function Posts() {
  const res = await get_Post();
  if ("code" in res) {
    return (
      <div className="flex flex-col items-start justify-center w-full gap-2 mx-auto">
        <div className="flex flex-col items-center justify-center w-full p-4 my-4">
          <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
            <h1 className="w-full text-sm text-center text-gray-900">
              No Articles available right now!
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
          {res.map((data, index) => {
            return (
              <div key={index} className="w-full aspect-auto">
                <CardForArticle
                  title={data.title}
                  short_desc={data.short_desc}
                  date={data.date}
                  link={data.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
