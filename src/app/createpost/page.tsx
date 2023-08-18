"use client";
import Footer from "@/UI/footer";
import NAV from "@/UI/nav";

import { useEffect, useState, useRef } from "react";

const Post = () => {
  const [imageDataURL, setImageDataUrl] = useState("");
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(true);

  const editToggle = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    // console.log(imageDataURL);
    console.log(content);
  }, [imageDataURL, content]);

  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5  p-2 flex">
        <div className="max-w-[900px] mx-auto w-full mt-14 flex flex-col gap-2  items-center justify-center">
          <div className="flex w-full gap-2 flex-col">
            <div className="p-1 border-b border-gray-700">
              <input
                type="text"
                placeholder="Title"
                className="outline-none ring-0"
                name="title"
                id="title"
              />
            </div>
            <div className="p-1 border-b border-gray-700">
              <input
                type="text"
                placeholder="Desc"
                className="outline-none ring-0"
                name="desc"
                id="desc"
              />
            </div>
            {/* <div className="p-2 border border-gray-800 rounded-md">
              <input
                type="file"
                className="outline-none ring-0"
                name="image"
                accept="image/*"
                id="image"
                onChange={handleFileChange}
              />
            </div> */}
            <div id="editorjs"></div>
            <button
              className="bg-blue-700 w-fit rounded-md text-white px-4 py-2"
              onClick={editToggle}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
