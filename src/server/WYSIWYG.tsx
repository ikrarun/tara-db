import React from "react";
// import 'bootstrap/dist/css/bootstrap.css'
import "./quill.css";

const WYSIWYG = ({ data }: { data: string }) => {
  const pre_data = { __html: `${data}` };
  return <div className="my_style" dangerouslySetInnerHTML={pre_data} />;
};

export default WYSIWYG;
