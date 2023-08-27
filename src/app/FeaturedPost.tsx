import CardForPost from "_components/CardForPost";
import { Button } from "_components/Button";
import { host } from "Lib/host";

type Data =
  | {
      title: string;
      short_desc: string;
      date: Date;
      id: string;
    }[]
  | { code: any; result: boolean };

export const get_Post = async () => {
  const data = await fetch(`${host}/api/get_all_post`, {
    next: { revalidate: 60 },
    headers: {
      take: "3",
      type: "card",
    },
  }).then((res) => res.json());

  return data as Data;
};

export const FeaturedPost = async () => {
  const res = await get_Post();
  return "code" in res ? (
    <div className="flex flex-col items-start justify-center w-full gap-2 mx-auto">
      <div className="flex flex-col items-center justify-center w-full my-4">
        <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
          <h1 className="w-full text-sm text-center text-gray-900">
            No Articles available right now!
          </h1>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full items-start justify-start gap-2">
      {res.map((res, index) => (
        <CardForPost
          key={index}
          title={res.title}
          short_desc={res.short_desc}
          date={res.date}
          link={res.id}
        />
      ))}
      {res.length >= 3 && (
        <div className="flex flex-row items-center justify-end">
          <Button href={"/posts"}>Read More..</Button>
        </div>
      )}
    </div>
  );
};
