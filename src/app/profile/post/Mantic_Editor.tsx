"use client";
import React, { useEffect, useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, FloatingMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import post_data from "./postData";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "_components/Button";
const content = `<p style={text-align:center}>Edit to Start</p>`;
const Mantic_Editor = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [title_len, setTitle_len] = useState<number>();
  const [desc_len, setDesc_len] = useState<number>();
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

  const router = useRouter();
  return (
    <div className="flex flex-col w-full gap-1">
      <div>
        <Toaster position="bottom-left" />
      </div>
      <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
        <input
          type="text"
          placeholder="Title"
          className="outline-none w-full ring-0"
          name="title"
          autoComplete={"false"}
          maxLength={80}
          value={title}
          onChange={(e) => {
            e.preventDefault;
            setTitle(e.target.value);
            setTitle_len(e.target.value.length);
          }}
          id="title"
        />
        <h1 className="text-xs text-gray-500">{title_len}/80</h1>
      </div>
      <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
        <input
          type="text"
          placeholder="Desc"
          className="outline-none grow w-full ring-0"
          name="desc"
          autoComplete={"false"}
          maxLength={120}
          value={desc}
          onChange={(e) => {
            e.preventDefault;
            setDesc(e.target.value);
            setDesc_len(e.target.value.length);
          }}
          id="desc"
        />
        <h1 className="text-xs text-gray-500">{desc_len}/120</h1>
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
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
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

        {editor && (
          <FloatingMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.BulletList />
            </RichTextEditor.ControlsGroup>
          </FloatingMenu>
        )}

        <RichTextEditor.Content />
      </RichTextEditor>

      <Button
        onClick={() => {
          toast.loading("Please wait");
          const post = editor?.getHTML().toString();
          const data = new FormData();
          if (!post || !title || !desc) {
            toast.dismiss();
            toast.error("Fill All Details");
            return;
          }
          toast.dismiss();
          toast.success("Please wait");
          data.append("title", title);
          data.append("desc", desc);
          data.append("post", post);
          post_data(data).then((res) => {
            if (res.id === "INV_DATA") {
              toast.dismiss();
              toast.error("Please Fill All Fields");
              setTimeout(() => {
                toast.dismiss();
              }, 2000);
            }
            if (res.id === "CODE") {
              toast.dismiss();
              toast.error("Similar Post is already available (Duplicate)");
              setTimeout(() => {
                toast.dismiss();
              }, 2000);
            }
            if (res.id === "ERROR") {
              toast.dismiss();
              toast.error("Post Can't be submitted,");
              setTimeout(() => {
                toast.dismiss();
              }, 2000);
              return;
            }
            if (res.id !== "SUCCESS") {
              return;
            }
            toast.dismiss();
            toast.success("Thank for your submission");
            setTimeout(() => {
              toast.dismiss();
            }, 2000);

            router.replace("/profile");
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Mantic_Editor;
