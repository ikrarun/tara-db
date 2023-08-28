"use client";
import Editor from "./Mantic_Editor";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import ConditionalButton from "_components/ConditionalButton";
import { ConditionalCard } from "_components/ConditionalCard";
const Post = () => {
  const { data: session } = useSession();
  const role = session?.user.role;

  if (role === "ADMIN" || role === "EDITOR") {
    return (
      <div className=" flex flex-col w-full h-[90vh] items-center gap-4 justify-start">
        <div className="flex flex-col h-[4vh] items-start justify-center w-full gap-3">
          <h1 className="text-xl font-semibold select-none">Create a post.</h1>
          <h1 className="text-base select-none">
            Thanks for choosing to contribute by submitting a busted myth.
          </h1>
        </div>
        <div className="w-full h-[60vh] my_style">
          <Editor />
        </div>
      </div>
    );
  }

  if (role === "USER" || role === "APPLIED") {
    if (role === "USER") {
      return (
        <ConditionalCard role={"USER"} href={"/join_us"} result={"Join Us"} />
      );
    } else if (role === "APPLIED")
      return <ConditionalCard role={"APPLIED"} href={"/"} result={"Home"} />;
  }

  if (!session) {
    return <ConditionalCard role={"USER"} login={true} result={"Sign In"} />;
  }
};

export default Post;
