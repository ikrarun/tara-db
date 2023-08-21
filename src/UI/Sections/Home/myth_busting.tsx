import React from "react";
import FactCard from "@/UI/Card/FactCard";
import host from "@/server/host";

interface Myths {
  title: string;
  short_desc: string;
  date: string;
  id: string;
}

const get_myths = async () => {
  const myths = await fetch(`${host}/api/get_myths`, {
    next: { revalidate: 60 },
  });
  const pres = await myths.json();
  const res = pres.formattedRes as Myths[];
  return res;
};

const myth_busting = async () => {
  const myths = await get_myths();
  //const myths: any[] = []
  if(!(myths.length>0)){
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
                date={data.date}
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
