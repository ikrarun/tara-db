import React, { useEffect } from "react";
import Footer from "@/UI/footer";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import NAV from "@/UI/nav";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Editor = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");

  const submit = async () => {
    console.log(title);
    console.log(desc);
    console.log(value);
    setTitle('');
    setDesc('');
    setValue('');
  };

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
                value={title}
                onChange={(e)=>{e.preventDefault;setTitle(e.target.value)}}
                id="title"
              />
            </div>
            <div className="p-1 border-b border-gray-700">
              <input
                type="text"
                placeholder="Desc"
                className="outline-none ring-0"
                name="desc"
                value={desc}
                onChange={(e)=>{e.preventDefault;setDesc(e.target.value)}}
                id="desc"
              />
            </div>
            <div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={setValue}
              />
            </div>
            <button
              className="bg-blue-700 w-fit rounded-md text-white px-4 py-2"
              type="button"
              onClick={submit}
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

export default Editor;
