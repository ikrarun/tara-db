import React from "react";
import { serverClient } from "TRPC/serverClient";
import CardForPost from "components/Cards/CardForArticle";
import { Button } from "components/Buttons/Button";

const featured_article = async() => {
  const data = await serverClient.get_posts(4);

  if (
    data === null ||
    (Array.isArray(data) && data.length === 0) ||
    typeof data === "undefined"
  ) {
    return (
      <div className="flex flex-col items-start justify-center w-full gap-2 mx-auto">
        <div className="flex flex-col items-center justify-center w-full my-4">
          <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
            <h1 className="w-full text-sm text-center text-gray-900">
              No Articles available right now!
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (Array.isArray(data) && data.length > 0) {
    const filterData = data.slice(0, 3);
    return (
      <div className="flex flex-col w-full items-start justify-start gap-2">
        {filterData.map((res, index) => (
          <CardForPost
            key={index}
            title={res.title}
            short_desc={res.short_desc}
            date={res.date}
            link={res.id}
          />
        ))}
        {data.length > 3 && (
          <div className="flex flex-row items-center justify-end">
            <Button className='cursor-pointer' href={"/articles"}>Read More..</Button>
          </div>
        )}
      </div>
    );
  }
};

export default featured_article;
