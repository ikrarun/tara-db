"use client";
import React, { useEffect, useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import post_data from "./postData";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const content = `<p style={text-align:center}>Edit to Start</p>`;
const Mantic_Editor = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  useEffect(() => {
    if (editor) {
      const data = editor.getHTML();

      if (data) setPost(data);
    }
  }, [editor]);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Toaster position="bottom-left" />
      </div>
      <div className="p-1 border-b border-gray-700 border-dashed">
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
      <div className="p-1 border-b border-gray-700 border-dashed">
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
      <RichTextEditor
        className="w-full h-[60vh] overflow-auto "
        editor={editor}
      >
        <RichTextEditor.Toolbar className="sticky top-0">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <button
        className="px-4 py-2 text-white bg-blue-700 rounded-md w-fit"
        onClick={() => {
          toast.loading("Please wait");
          const data = new FormData();
          data.append("title", title);
          data.append("desc", desc);
          data.append("post", post);
          post_data(data).then((res) => {
            console.log(res);
            if (res.id === "INV_DATA") {
              toast.dismiss();
              toast.error("Please Fill All Fields");
              dismiss();
            }
            if (res.id === "CODE") {
              toast.dismiss();
              toast.error("Similar Post is already available (Duplicate)");
              dismiss();
            }
            if (res.id === "ERROR") {
              toast.dismiss();
              toast.error("Post Can't be submitted,");
              dismiss();
            }
            if (res.id === "SUCCESS") {
              toast.dismiss();
              toast.success("Thank for your submission");
              dismiss();
              router.replace("/profile");
            }
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Mantic_Editor;
function dismiss() {
  const promise = new Promise(() => {
    setTimeout(() => {}, 1000);
  });
  promise.then(() => {
    toast.dismiss();
  });
}
