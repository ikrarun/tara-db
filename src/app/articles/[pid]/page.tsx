import { Button } from "components/Buttons/Button";
import WYSIWYG from "Editor/WYSIWYG";
import { get_all_post } from "Lib/apiPaths";

const page = async ({ params }: pageParams) => {
  const bid = params.pid;

  const data = await fetch(get_all_post, {
    headers: {
      post_id: bid,
      type: "full",
    },
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
  const result = data as Article;
  return showData(result);
};

function showData(data: Article) {
  return "code" in data ? (
    <div className="flex flex-col w-full justify-center bg-gray-400/30 rounded-md h-80 items-center">
      <div className="flex flex-col items-start justify-center gap-3 p-3 ">
        <h1 className="text-2xl font-semibold">
          Thanks for showing your interest.
        </h1>
        <h1 className="text-sm">Requested Content is Not Available</h1>
        <Button className="text-sm sm:text-base" href={"/"}>
          Home
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex w-full flex-col">
      <h1 className="self-start text-3xl font-bold">{data.title}</h1>
      <h3 className="self-start p-1 text-base font-normal text-gray-600 border-b border-gray-700 border-dashed">
        {data.short_desc}
      </h3>
      <h3 className="self-start p-1 text-xs font-normal text-gray-600 border-b border-gray-700 border-dashed">
        {data.date.toDateString()}
      </h3>
      <div className="self-start w-full mt-12 overflow-x-auto my_style">
        <WYSIWYG data={data.wysiwyg} />
      </div>
    </div>
  );
}

export default page;
