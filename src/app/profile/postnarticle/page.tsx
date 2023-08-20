import NAV from "@/UI/nav";
import Footer from "@/UI/footer";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("@/app/profile/postnarticle/Editor").then((module) => module.default),
  { ssr: false }
);
const Post = () => {
  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5  p-2 flex">
        <div className="max-w-[900px] mx-auto w-full mt-14 flex flex-col gap-2  items-center justify-center">
          <Editor />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
