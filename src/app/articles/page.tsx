import CardForArticle from "components/Cards/CardForArticle";
import { serverClient } from "TRPC/serverClient";

export default async function Posts() {
  const data = await serverClient.get_posts();
  if (
    data === null ||
    (Array.isArray(data) && data.length === 0) ||
    typeof data === "undefined"
  ) {
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
  if (Array.isArray(data) && data.length > 0) {
    return (
      <div className="flex flex-col  items-center justify-center w-full gap-2 mx-auto">
        <div className="flex flex-col w-full">
          <h1 className="text-sm mb-2 text-gray-500">
            Articles&apos;s are written by the contributors.
          </h1>

          <div
            style={{ scrollbarWidth: "none" }}
            className="w-full flex flex-col gap-2 "
          >
            {data.map((data, index) => {
              return (
                <CardForArticle
                  key={index}
                  title={data.title}
                  short_desc={data.short_desc}
                  date={data.date}
                  link={data.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
