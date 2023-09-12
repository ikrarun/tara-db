"use client";
import { useSession } from "next-auth/react";
import { Role } from "enum";
import dynamic from "next/dynamic";



const RoleBasedCard = dynamic(() =>
  import("components/Cards/RoleBasedCard").then((res) => res.RoleBasedCard)
);
const SuggestionForm = dynamic(() => import("./SuggestionForm"), {
  ssr: false,
});


const Post = () => {
  const { data: session, status } = useSession();
  const role = session?.user.role;

  if (status === "authenticated") {
    if (role === "ADMIN" || role === "EDITOR") {
      return (
        <div className=" flex flex-col w-full mt-10 h-[90vh] items-center gap-4 justify-start">
          <div className="flex flex-col h-[4vh] items-start justify-center w-full gap-3">
            <h1 className="text-xl font-semibold select-none">
              Create a post.
            </h1>
          </div>
          <div className="w-full h-[60vh] my_style">
              <SuggestionForm />
          </div>
        </div>
      );
    }

    if (role === "USER") {
      return <RoleBasedCard role={Role.USER} />;
    }
  }

  if (status === "unauthenticated") {
    return <RoleBasedCard role={Role.NOROLE} />;
  }
  if (status === "loading") {
    return (
      <div className="flex  animate-pulse duration-200 flex-col w-full">
        <div className="flex flex-col gap-4">
          {/* s1 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">
              Thanks for showing intreset in our Project.
            </h1>
            <h1 className="text-base text-gray-900/90">Please wait.....</h1>
          </div>
        </div>
        <div className="my-4 border-b border-gray-900" />
      </div>
    );
  }
};

export default Post;
