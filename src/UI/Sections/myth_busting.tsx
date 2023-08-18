import React from "react";
import FactCard from "../Card/FactCard";

interface Myths {
  title: string;
  shrotsec: string;
  date: string;
  postcode: string;
}

const getlimitedmyths = async () => {
  const myths = await fetch(`https://taradb.vercel.app/api/getlimitedmyths`, {
    next: { revalidate: 60 },
  });
  const pres = await myths.json();
  const res = pres.res as Myths[];
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
        {myths.map((data, index) => {
          return (
            <div key={index} className="w-full h-fit">
              <FactCard
                title={data.title}
                shortdesc={data.shrotsec}
                date={data.date} link={data.postcode}              />
              <hr className="w-full border-dashed border-t border-gray-600" />
            </div>
          );
        })}
      </div>
      <h1 className="text-base cursor-pointer select-none mb-2 w-fit self-end px-5 text-end text-blue-700">
        More...
      </h1>
    </div>
  );
};

export default myth_busting;
