import WYSIWYG from "@/server/WYSIWYG";
import { prisma } from "@/server/db";
import InvalidRequest from "@/components/cards/invalidRequest";

const getData = async (id: string) => {
  var header;
  try {
    header = await prisma.myths.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        short_desc: true,
        date: true,
      },
    });
  } catch (error) {
    return error;
  }
  try {
    if (header?.id) {
      const result = await prisma.posts.findUnique({
        where: {
          postid: header.id,
        },
        select: {
          wysiwyg: true,
        },
      });
      const combinedJson: Data = Object.assign({}, header, result);
      return combinedJson;
    } else return "Invalid ID";
  } catch (error) {
    return error;
  }
};

interface Data {
  title: string;
  short_desc: string;
  wysiwyg: string;
  date: Date | null;
}

const page = async ({ params }: { params: { pid: string } }) => {
  const bid = params.pid;

  if (bid) {
    const data = await getData(bid);
    const values = data as Data;
    const date = values.date?.toDateString();
    if (values.title && values.short_desc && values.wysiwyg) {
      return (
        <div className="flex w-full flex-col">
          <h1 className="self-start text-3xl font-bold">{values.title}</h1>
          <h3 className="self-start p-1 text-base font-normal text-gray-600 border-b border-gray-700 border-dashed">
            {values.short_desc}
          </h3>
          <h3 className="self-start p-1 text-xs font-normal text-gray-600 border-b border-gray-700 border-dashed">
            {date}
          </h3>
          <div className="self-start w-full mt-12 overflow-x-auto my_style">
            <WYSIWYG data={values.wysiwyg} />
          </div>
        </div>
      );
    } else return <InvalidRequest />;
  } else return <InvalidRequest />;
};

export default page;
