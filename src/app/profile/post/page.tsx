import NAV from "@/UI/nav";
import Footer from "@/UI/footer";
import dynamic from "next/dynamic";
import { getServerAuthSession } from "@/server/auth";
import host from "@/server/host";
import { redirect } from "next/navigation";
import USERDATA from "../userData";
const Editor = dynamic(
  () => import("@/app/profile/post/Editor").then((module) => module.default),
  { ssr: false }
);
const Post = async () => {
  const session = await getServerAuthSession();
  if (session != null) {
    return <Editor />;
  } else {
    return <USERDATA />;
  }
};

export default Post;
