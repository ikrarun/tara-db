"use client";
import Editor from "./Mantic_Editor";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import Button from "_components/ConditionalButton";
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
        <ConditionalCard role={"USER"} href={"/join_form"} result={"Join Us"} />
      );
    } else if (role === "APPLIED")
      return <ConditionalCard role={"APPLIED"} href={"/"} result={"Home"} />;
  }

  if (!session) {
    return <ConditionalCard role={"USER"} login={true} result={"Sign In"} />;
  }
};

const ConditionalCard = ({
  role,
  href,
  login,
  result,
}: {
  role: Role;
  login?: boolean;
  href?: string;
  result: string;
}) => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col items-start justify-center gap-3 p-3 border rounded-md border-gray-700/50">
        <h1 className="text-2xl font-semibold">
          Thanks for showing your interest.
        </h1>
        <h1 className="text-sm">
          But you have to join us, before posting anything to platform.
        </h1>
        <h1 className="text-xs text-gray-500">
          {role === "APPLIED" &&
            "If you&apos;ve already applied for joining please wait for a moment."}
        </h1>
        <Button href={href ?? ""} login={login} result={result} />
      </div>
    </div>
  );
};

export default Post;
