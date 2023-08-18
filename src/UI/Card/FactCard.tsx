import React from "react";
import {AiOutlineRead} from 'react-icons/ai'
const FactCard = ({title,shortdesc,date}:{title:string,shortdesc:string,date:string|undefined}) => {
  const ndate = date?.toString();
  return (
    <div className="w-full flex-row flex p-4">
      <div className="flex flex-col gap-2 w-11/12">

      <h1 className="text-lg text-gray-900">
        {title}
      </h1>
      <h1 className="text-sm text-gray-700">
        {shortdesc}
      </h1>
      <h1 className="text-xs text-gray-500">{ndate}</h1>
      </div>

      <button className="flex items-center text-gray-600 justify-center w-1/12">
        <AiOutlineRead size={25}/>
      </button>
    </div>
  );
};

export default FactCard;
