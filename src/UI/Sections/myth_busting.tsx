import React from "react";
import FactCard from "../Card/FactCard";

const myth_busting = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mb-2  w-fit px-5 text-start text-gray-800">
        Myths Busted
      </h1>
      <div className="flex flex-col p-4 items-center justify-center">
        <FactCard />
        {
          //  index < bookData.length - 1
          true && (
            <hr className="w-full border-dashed border-t border-gray-600/40" />
          )
        }
        <FactCard />
      </div>
      <h1 className="text-base cursor-pointer select-none mb-2 w-fit self-end px-5 text-end text-blue-700">
        More...
      </h1>
    </div>
  );
};

export default myth_busting;
