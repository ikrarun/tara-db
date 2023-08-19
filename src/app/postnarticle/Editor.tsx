"use client";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState("");

  const clearData = () => {
    setTitle("");
    setDesc("");
    setPost("");
  };
  const submit = async () => {
    const res = await fetch("https://taradb.vercel.app/api/createnarticle", {
      method: "POST",
      headers: {
        title: title,
        desc: desc,
        post: post,
      },cache:'no-cache'
    });
    const rres = await res.json();
    console.log(rres.res);
    // clearData();
  };

  return (
    <div className="flex w-full gap-2 flex-col">
      <div className="p-1 border-b border-dashed border-gray-700">
        <input
          type="text"
          placeholder="Title"
          className="outline-none ring-0"
          name="title"
          value={title}
          onChange={(e) => {
            e.preventDefault;
            setTitle(e.target.value);
          }}
          id="title"
        />
      </div>
      <div className="p-1 border-b border-dashed border-gray-700">
        <input
          type="text"
          placeholder="Desc"
          className="outline-none ring-0"
          name="desc"
          value={desc}
          onChange={(e) => {
            e.preventDefault;
            setDesc(e.target.value);
          }}
          id="desc"
        />
      </div>
      <div className="my-2">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={post}
          onChange={setPost}
        />
      </div>
      <button
        className="bg-blue-700 w-fit rounded-md text-white px-4 py-2"
        type="button"
        onClick={submit}
      >
        Submit Post
      </button>
    </div>
  );
};

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

export default Editor;
