import { single_Response_Schema } from "@/lib/ApiSafety";
import WYSIWYG from "@/server/Document/WYSIWYG";
import host from "@/server/Database/host";

const getData = async (bid: string) => {
  return await fetch(`${host}/api/get_unique`, {
    headers: {
      id: bid,
    },
    next: { revalidate: 30 },
  }).then((res) => res.json());
};

const page = async ({ params }: { params: { pid: string } }) => {
  const bid = params.pid;

  const data = await getData(bid);
  try {
    const { title, date, short_desc, wysiwyg } =
      single_Response_Schema.parse(data);
    return (
      <div className="flex w-full flex-col">
        <h1 className="self-start text-3xl font-bold">{title}</h1>
        <h3 className="self-start p-1 text-base font-normal text-gray-600 border-b border-gray-700 border-dashed">
          {short_desc}
        </h3>
        <h3 className="self-start p-1 text-xs font-normal text-gray-600 border-b border-gray-700 border-dashed">
          {date}
        </h3>
        <div className="self-start w-full mt-12 overflow-x-auto my_style">
          <WYSIWYG data={wysiwyg ?? ""} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex w-full flex-col">
        <h1 className="self-start text-3xl font-bold">{`404`}</h1>
        <h3 className="self-start p-1 text-base font-normal text-gray-600 border-b border-gray-700 border-dashed">
          {`Your request is invalid`}
        </h3>
        <h3 className="self-start p-1 text-base font-normal text-gray-600 border-b border-gray-700 border-dashed">
          {`Try again after a while`}
        </h3>
      </div>
    );
  }
};

export default page;
