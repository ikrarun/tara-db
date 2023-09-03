import React from "react";
import "Lib/styles/WYSIWYG.css";

const WYSIWYG = ({ data }: { data: string }) => {
  const pre_data = { __html: data };
  return (
    <div
      className="editor w-full whitespace-pre-wrap"
      dangerouslySetInnerHTML={pre_data}
    />
  );
};

export default WYSIWYG;
