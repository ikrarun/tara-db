import React from "react";
import USERDATA from "./userData";
import Footer from "@/UI/footer";
import Nav from "@/UI/nav";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
const Profile = async () => {
  const session = await getServerAuthSession();
  var allsession;
  if (session) {
    allsession = await prisma.session.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        sessionToken: true,
      },
    });
  }



  return (
    <div className="flex flex-col">
      <Nav />
      <div className="w-full my-5 h-screen p-2 flex">
        <div className="max-w-[900px] mx-auto w-full flex flex-col gap-2  items-center justify-center">
          <USERDATA allsession={allsession} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
