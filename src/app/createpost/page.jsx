"use client";
import Footer from "@/UI/footer";
import NAV from "@/UI/nav";
import { useEffect } from "react";

const Post = () => {
  var editor;
  useEffect(() => {
    const init = async () => {
      const Editor = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const InlineCode = (await import("@editorjs/code")).default;
      editor = new Editor({
        tools: {
          // ... your tools
          header: Header,
          inlineCode: InlineCode,
        },
      });
    };
    init();

    return editor?.destroy();
  }, []);

  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5  p-2 flex">
        <div className="max-w-[900px] mx-auto w-full mt-14 flex flex-col gap-2  items-center justify-center">
          <div className="flex w-full gap-2 flex-col">
            <div className="p-2 border rounded-md border-gray-700/40">
              <input
                type="text"
                placeholder="Title"
                className="outline-none ring-0"
                name="title"
                id="title"
              />
            </div>
            <div className="p-2 border rounded-md border-gray-700/40">
              <input
                type="text"
                placeholder="Desc"
                className="outline-none ring-0"
                name="desc"
                id="desc"
              />
            </div>
            <h1 className="border-b border-dashed my-4 border-gray-700/40" />
            <div
              id="editorjs"
              className="p-2 border border-gray-700/40  rounded-md "
            />
            <button className="bg-blue-700 w-fit rounded-md text-white px-4 py-2">
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
