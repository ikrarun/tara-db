import { single_Response_Schema } from "_lib/ApiSafety";
import WYSIWYG from "_editor/WYSIWYG";

const getData = async (bid: string) => {
  return await fetch(`${process.env.HOST}/api/get_unique`, {
    headers: {
      id: bid,
    },
    next: { revalidate: 30 },
  }).then((res) => res.json());
};

interface pageParams {
  params: {
    pid: string;
  };
}

interface PostData {
  title: string;
  short_desc: string;
  date: string;
  wysiwyg: string;
}

const page = async ({ params }: pageParams) => {
  const bid = params.pid;
  const data = await getData(bid);

  try {
    const { title, date, short_desc, wysiwyg } =
      single_Response_Schema.parse(data);
    return showData({ title, short_desc, date, wysiwyg });
  } catch (error) {
    return showError();
  }
};

function showError() {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-2 mx-auto">
      <div className="flex flex-col items-center justify-center w-full p-4 my-4">
        <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
          <h1 className="w-full text-sm text-center text-gray-900">
            404!
          </h1>
          <h1 className="w-full text-sm text-center text-gray-900">
            Page Not Found!
          </h1>
        </div>
      </div>
    </div>
  );
}

function showData({ title, short_desc, date, wysiwyg }: PostData) {
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
}

export default page;
