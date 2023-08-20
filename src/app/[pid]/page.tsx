import WYSIWUG from "@/server/WYSIWUG";
import { prisma } from "@/server/db";
import InvalidRequest from "@/UI/Card/invalidRequest";

const getData = async (id: number) => {
  var header;
  try {
    header = await prisma.myths.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        shrotsec: true,
        date: true,
      },
    });
  } catch (error) {
    return error;
  }
  try {
    if (header?.id) {
      const ress = await prisma.posts.findUnique({
        where: {
          postid: header.id,
        },
        select: {
          wysiwyg: true,
        },
      });
      const combinedJson: Data = Object.assign({}, header, ress);
      return combinedJson;
    } else return "Invalid ID";
  } catch (error) {
    return error;
  }
};

interface Data {
  title: string;
  shrotsec: string;
  wysiwyg: string;
  date: Date | null;
}

const page = async ({ params }: { params: { pid: string } }) => {
  const bid = parseInt(params.pid);

  if (!Number.isNaN(bid)) {
    const data = await getData(bid);
    const values = data as Data;
    const date = values.date?.toDateString();
    if (values.title && values.shrotsec && values.wysiwyg) {
      return (
        <div className="flex flex-col">
          <h1 className="self-start text-3xl font-bold">{values.title}</h1>
          <h3 className="self-start p-1 border-b border-gray-700 border-dashed text-gray-600 text-base font-normal">
            {values.shrotsec}
          </h3>
          <h3 className="self-start p-1 border-b border-gray-700 border-dashed text-gray-600 text-xs font-normal">
            {date}
          </h3>
          <div className="self-start mystyle w-full overflow-x-auto mt-12">
            <WYSIWUG data={values.wysiwyg} />
          </div>
        </div>
      );
    } else return <InvalidRequest />;
  } else return <InvalidRequest />;
};

export default page;
