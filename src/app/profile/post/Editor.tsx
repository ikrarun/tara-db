"use client";
import host from "@/server/host";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
interface response {
  message: any;
  success: boolean;
}

const Editor = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState("");

  const clearData = () => {
    setTitle("");
    setDesc("");
    setPost("");
  };
  const submit = async () => {
    const body = JSON.stringify(post);
    const result = await fetch(`${host}/api/createnarticle`, {
      method: "POST",
      headers: {
        title: title,
        desc: desc,
      },
      body: body,
      cache: "no-cache",
    });
    const res: response = await result.json();
    if (res.success) {
      clearData();
    }
    return res;
  };

  useEffect(() => {
    setResult("");
  }, [title, desc, post]);

  const [reload, setReload] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState("");
  const redirectx = () => {
    setTimeout(function () {
      router.replace(`${host}/profile`);
    }, 1000);
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
        onClick={() => {
          submit().then((res) => {
            if (res.success) {
              setResult("Your Submission is Successful");
              setRedirect(true);
              redirectx();
            }
            if (!res.success) {
              if (res.message.code) {
                setResult(
                  `Can't submit your article right now, maybe you're submitting duplicate article`
                );
                setRedirect(true);
              } else {
                setResult("Some Error Occured During Submission");
                setReload(true);
              }
            }
          });
        }}
      >
        Submit Post
      </button>
      <h1 className="animate-pulse text-black my-1">{result}</h1>
      <h1 className={reload ? `animate-pulse flex text-black my-1` : `hidden`}>
        Please reload the page to fix the issue.
      </h1>
      <h1
        className={redirect ? `animate-pulse flex text-black my-1` : `hidden`}
      >
        You will be redirected to profile page.
      </h1>
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
