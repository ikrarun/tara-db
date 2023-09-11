"use client";
import React, { useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, FloatingMenu } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "components/Buttons/Button";
import { Session } from "next-auth";
import { trpc } from "TRPC/client";
import { TRPCClientError } from "@trpc/client";

function ManticEditor({ session }: { session: Session }) {
  const pushData = trpc.create_Article.useMutation();
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [shortDesc, setShortDesc] = useState("");
  const [titleLen, setTitleLen] = useState<number>(0);
  const [descLen, setDescLen] = useState<number>(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  });

  const router = useRouter();

  async function submit() {
    const wysiwyg = editor?.getHTML().toString();
    if (!wysiwyg || !title || !shortDesc) {
      toast.dismiss();
      toast.error("Fill All Details");
      return;
    }
    toast.dismiss();
    toast.loading("Kindly wait");

    try {
      const res = await pushData.mutateAsync({
        title: title,
        short_desc: shortDesc,
        wysiwyg: wysiwyg,
        creator: session.user.id,
      });

      if ("error" in res) {
        toast.dismiss();
        toast.error(res.error);
      } else if ("code" in res) {
        toast.dismiss();
        toast.error("Failed to Post");
      } else if ("message" in res) {
        toast.dismiss();
        toast.success("Your Submission Successful");
        router.replace("/");
      }
      setIsPending(false);
    } catch (error) {
      // zodError will be inferred
      if (error instanceof TRPCClientError) {
        toast.dismiss();
        toast.error("Fill Fields Correctly");
        setIsPending(false);
        return null;
      }
       toast.dismiss();
       toast.error("Un-Expected Error");
       setIsPending(false);
       return null;
    }
  }

  return (
    <form
      className="flex flex-col w-full gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        toast.loading("Kindly wait");
        setIsPending(true);
        submit();
      }}
    >
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
            e.preventDefault();
            setTitle(e.target.value);
            setTitleLen(e.target.value.length);
          }}
          id="title"
        />
        <h1 className="text-xs text-gray-500">{titleLen}/80</h1>
      </div>
      <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
        <input
          type="text"
          placeholder="Desc"
          className="outline-none grow w-full ring-0"
          name="desc"
          autoComplete={"false"}
          maxLength={120}
          value={shortDesc}
          onChange={(e) => {
            e.preventDefault();
            setShortDesc(e.target.value);
            setDescLen(e.target.value.length);
          }}
          id="desc"
        />
        <h1 className="text-xs text-gray-500">{descLen}/120</h1>
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
        className="w-fit self-center text-xs sm:text-sm"
        disabled={isPending}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default ManticEditor;
