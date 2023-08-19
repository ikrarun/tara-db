"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const userData = () => {
  const { data: session } = useSession();
  if (session) {
    console.log(session.user);
    return (
      <>
        Signed in as {session.user.email} and role is {session.user.role} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default userData;
