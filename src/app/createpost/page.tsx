"use client";

import dynamic from "next/dynamic";
import React from "react";

const Post = () => {
  const Editor = dynamic(() => import("../../Editor/Editor"), { ssr: false });
  return <Editor />;
};

export default Post;
