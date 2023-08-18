import React from "react";
import FactCard from "../Card/FactCard";
import prisma from "@/database/prismclient";

interface Myths {
  title: string;
  shrotsec: string;
  date: string;
  postcode: string;
}

const getlimitedmyths = async () => {
  // const myths = await fetch(`http://127.0.0.1/:3000/api/getlimitedmyths`, {
  //   next: { revalidate: 60 },
  // });
  // const res = (await myths.json()) as Myths[];

  const res = await prisma.myths.findMany({
    take: 5,
    orderBy: {
      created_at: "desc",
    },
    select:{
        title:true,
        shrotsec:true,
        date:true,
        postcode:true,
    }
  });
  return res;
};

const myth_busting = async () => {
  const myths = await getlimitedmyths();
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mb-2  w-fit px-5 text-start text-gray-800">
        Myths Busted
      </h1>

      <div className="flex flex-col p-4 items-center justify-center">
        {myths.map((data, index) => (
          <div key={index} className="w-full h-fit">
            <FactCard
              title={data.title}
              shortdesc={data.shrotsec}
              date={data.date?.getDate.toString()}
            />
            <hr className="w-full border-dashed border-t border-gray-600" />
          </div>
        ))}
      </div>
      <h1 className="text-base cursor-pointer select-none mb-2 w-fit self-end px-5 text-end text-blue-700">
        More...
      </h1>
    </div>
  );
};

export default myth_busting;
