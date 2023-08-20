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
    <div className="w-full flex flex-col">
      <USERDATA allsession={allsession} />
    </div>
  );
};

export default Profile;
