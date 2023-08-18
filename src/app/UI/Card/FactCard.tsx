import React from "react";
import {AiOutlineRead} from 'react-icons/ai'
const FactCard = () => {
  return (
    <div className="w-full flex-row flex p-4">
      <div className="flex flex-col w-11/12">

      <h1 className="text-base">
        Title
      </h1>
      <h1 className="text-xs">
        Desc
      </h1>
      <h1 className="text-xs">Date</h1>
      </div>

      <button className="flex items-center justify-center w-1/12">
        <AiOutlineRead size={25}/>
      </button>
    </div>
  );
};

export default FactCard;
