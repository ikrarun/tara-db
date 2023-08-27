import WYSIWYG from "Editor/WYSIWYG";
import { host } from "Lib/host";

interface pageParams {
  params: {
    pid: string;
  };
}

type Data =
  | {
      id: string;
      title: string;
      short_desc: string;
      wysiwyg: string;
      date: Date;
    }
  | {
      code: any;
      result: boolean;
    };

const page = async ({ params }: pageParams) => {
  const bid = params.pid;

  const data = await fetch(`${host}/api/get_all_post`, {
    headers: {
      post_id: bid,
      type: "full",
    },
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
  const result = data as Data;
  return showData(result);
};

function showData(data: Data) {
  return "code" in data ? (
    <div>Error</div>
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
