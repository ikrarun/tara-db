import CardForPost from "_components/CardForPost";
import { Button } from "_components/Button";
import { serverClient } from "_trpc/_important/serverClient";

export const FeaturedPost = async () => {
  const data = await serverClient.getAllPost(3);
  return dataAvailable(data);
};

function dataAvailable(
  validResponses: Awaited<ReturnType<(typeof serverClient)["getAllPost"]>>
) {
  return typeof validResponses === "boolean" ? <div>Error</div> : (
    <div className="flex flex-col w-full items-start justify-start gap-2">
      {validResponses.map((res, index) => (
        <CardForPost
          key={index}
          title={res.title}
          short_desc={res.short_desc}
          date={res.date}
          link={res.id.toString()}
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
