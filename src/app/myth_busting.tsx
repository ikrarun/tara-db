import React from "react";
import FactCard from "@/UI/Card/FactCard";
import host from "@/server/host";

interface Myths {
  title: string;
  shrotsec: string;
  date: string;
  id: string;
}

const getlimitedmyths = async () => {
  const myths = await fetch(`${host}/api/getlimitedmyths`, {
    next: { revalidate: 60 },
  });
  const pres = await myths.json();
  const res = pres.formattedRes as Myths[];
  return res;
};

const myth_busting = async () => {
  const myths = await getlimitedmyths();
  //const myths: any[] = []
  if(!(myths.length>0)){
    return (
      <div className="w-full flex flex-col">
        <h1 className="text-xl mb-2  w-fit px-5 text-start text-gray-800">
          Myths Busted
        </h1>
  
        <div className="flex flex-col animate-bounce duration-1000 p-4 items-center justify-center">
          <h1 className="text-red-500">No Myths Busted till Now!</h1>
        </div>
        
      </div>
    );
  }
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
                date={data.date}
                link={data.id}
              />
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
