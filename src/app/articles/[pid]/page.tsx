import { Button } from "components/Buttons/Button";
import WYSIWYG from "components/Editor/WYSIWYG";
import { serverClient } from "TRPC/serverClient";

export default async function Page({ params }: pageParams) {
  const id = params.pid;
  const data = await serverClient.get_Detail_Post(id);

  if (typeof data !== "undefined" && data !== null) {
    return (
      <div className="flex  w-full flex-col">
        <h1 className="self-start text-3xl font-bold">{data.title}</h1>
        <h3 className="self-start p-1 text-base font-normal text-gray-600 border-b border-gray-700 border-dashed">
          {data.short_desc}
        </h3>
        <h3 className="self-start p-1 text-xs font-normal text-gray-600 border-b border-gray-700 border-dashed">
          {data.date.toDateString()}
        </h3>
        <div className="self-start w-full mt-12  editor">
          <WYSIWYG data={data.wysiwyg} />
        </div>
      </div>
    );
  } else
    return (
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
    );
}
