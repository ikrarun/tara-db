import { responseSchema } from "_lib/ApiSafety";
import CardForPost from "_components/CardForPost";
import host from "_database/host";
import { Button } from "_components/Button";

type responseType = {
  title: string;
  id: string;
  short_desc: string;
  date: string;
  wysiwyg: string;
}[];

export async function get_Post() {
  return await fetch(`${host}/api/get_all_post`, {
    next: {
      revalidate: 10,
    },
    headers: {
      take: "3",
    },
  }).then((res) => res.json());
}

export const FeaturedPost = async () => {
  const data = await get_Post();

  try {
    const validResponses = responseSchema.parse(data);
    return validResponses && validResponses.length > 0
      ? dataAvailable(validResponses)
      : noDataAvailable();
  } catch (e) {
    return dataFetchError();
  }
};

function dataFetchError() {
  return (
    <CardForPost
      title={"Can't Show Any Post[s] Right Now"}
      short_desc={"Try again after a while"}
      date={"2023-08-22T15:45:00.000-04:00"}
      link={"/"}
    />
  );
}

function dataAvailable(validResponses: responseType) {
  return (
    <div className="flex flex-col bg-red-500 p-2 w-full items-start justify-start gap-2">
      {validResponses.map((res, index) => (
        <CardForPost
          key={index}
          title={res.title}
          short_desc={res.short_desc}
          date={res.date}
          link={res.id}
        />
      ))}
      {validResponses.length >= 3 && (
        <div className="flex flex-row items-center justify-end">
          <Button href={"/posts"}>Read More..</Button>
        </div>
      )}
    </div>
  );
}

function noDataAvailable() {
  return (
    <div className="flex flex-col w-full items-start justify-start gap-2">
      <CardForPost
        title={"Can't Show Any Post Right Now"}
        short_desc={"Try again after a while"}
        link={"/"}
      />
    </div>
  );
}
