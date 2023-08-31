"use client";
import Editor from "./Mantic_Editor";
import { useSession } from "next-auth/react";
import { RoleBasedCard } from "components/Cards/RoleBasedCard";

enum Role {
  USER,
  ADMIN,
  APPLIED,
  EDITOR,
  NOROLE,
}

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
      return <RoleBasedCard role={Role.USER} />;
    } else if (role === "APPLIED") return <RoleBasedCard role={Role.APPLIED} />;
  }

  if (!session) {
    return <RoleBasedCard role={Role.NOROLE} />;
  }
};

export default Post;
