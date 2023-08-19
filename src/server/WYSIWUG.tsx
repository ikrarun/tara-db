import React from "react";
// import 'bootstrap/dist/css/bootstrap.css'
import "./WYSIWUG.css";

const WYSIWUG = ({ data }: { data: string }) => {
  const xata = { __html: `${data}` };
  return <div dangerouslySetInnerHTML={xata} />;
};

export default WYSIWUG;
