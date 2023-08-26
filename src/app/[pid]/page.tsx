import { TRPCError } from "@trpc/server";
import WYSIWYG from "_editor/WYSIWYG";
import { serverClient } from "_trpc/_important/serverClient";

interface pageParams {
  params: {
    pid: string;
  };
}

type Data = {
  id: string;
  title: string;
  short_desc: string;
  wysiwyg: string;
  date: Date;
};

const page = async ({ params }: pageParams) => {
  const bid = params.pid;
  const data = await serverClient.getUnique(bid);
  return showData(data);
};

function showData(
  data: Awaited<ReturnType<(typeof serverClient)["getUnique"]>>
) {
  return typeof data === "boolean" ? <div>Error</div> : (
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
