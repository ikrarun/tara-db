import React from "react";
import FactCard from "@/UI/Card/FactCard";
import { prisma } from "@/server/db";

interface Myths {
  title: string;
  short_desc: string;
  date: string;
  id: string;
}
[];

const get_myths = async () => {
  const myths = await prisma.myths
    .findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      select: {
        title: true,
        short_desc: true,
        id: true,
        date: true,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      const resCode = e.code as string;
      return resCode;
    });

  return myths;
};

const myth_busting = async () => {
  const myths = await get_myths();
  //const myths: any[] = []
  if (typeof myths === "string") {
    return (
      <div className="flex flex-col w-full">
        <h1 className="px-5 mb-2 text-xl text-gray-800 w-fit text-start">
          Myths Busted
        </h1>

        <div className="flex flex-col items-center justify-center p-4 duration-1000 animate-bounce">
          <h1 className="text-red-500">No Myths Busted till Now!</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <h1 className="px-5 mb-2 text-xl text-gray-800 w-fit text-start">
        Myths Busted
      </h1>

      <div className="flex flex-col items-center justify-center p-4">
        {myths.map((data, index) => {
          return (
            <div key={index} className="w-full h-fit">
              <FactCard
                title={data.title}
                short_desc={data.short_desc}
                date={data.date.toISOString()}
                link={data.id}
              />
              <hr className="w-full border-t border-gray-600 border-dashed" />
            </div>
          );
        })}
      </div>
      <h1 className="self-end px-5 mb-2 text-base text-blue-700 cursor-pointer select-none w-fit text-end">
        More...
      </h1>
    </div>
  );
};

export default myth_busting;
