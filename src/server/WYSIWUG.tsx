import React from "react";
// import 'bootstrap/dist/css/bootstrap.css'
//import "./WYSIWUG.css";
import "./quill.css";

const WYSIWUG = ({ data }: { data: string }) => {
  const xata = { __html: `${data}` };
  return <div className="mystyle" dangerouslySetInnerHTML={xata} />;
};

export default WYSIWUG;
