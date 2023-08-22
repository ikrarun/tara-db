import React from "react";

const NoDataCard = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 my-4">
      <div className="flex flex-col items-center justify-center w-full gap-3 p-4 border rounded-lg border-gray-600/40">
        <h1 className="w-full text-sm text-center text-gray-900">
          {message ?? "Data Unavailable"}
        </h1>
      </div>
    </div>
  );
};

export default NoDataCard;
