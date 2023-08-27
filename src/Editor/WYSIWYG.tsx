import React from "react";
import "./WYSIWYG.css";

const WYSIWYG = ({ data }: { data: string }) => {
  const pre_data = { __html: data };
  return <div className="my_style whitespace-pre-wrap [&>*]:whitespace-pre-wrap flex flex-col max-w-[900px] gap-2 break-before-all [&>*]:break-before-auto" dangerouslySetInnerHTML={pre_data} />;
};

export default WYSIWYG;
