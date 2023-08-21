import React from "react";
import FactCard from "@/UI/Card/FactCard";
import { prisma } from "@/server/db";

const get_myths = async () => {
  const myths = await prisma.myths
    .findMany({
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
  if (typeof myths === "string") {
    return (
      <div className="flex flex-col items-start justify-center  w-full gap-2 mx-auto">
        <div className="flex flex-col w-full">
          <h1 className="px-5 mb-2 text-xl text-gray-800 w-fit text-start">
            Myths Busted
          </h1>

          <div className="flex flex-col items-center justify-center p-4 duration-1000 animate-bounce">
            <h1 className="text-red-500">No Myths Busted till Now!</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 mx-auto">
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
      </div>
    </div>
  );
};

export default myth_busting;
