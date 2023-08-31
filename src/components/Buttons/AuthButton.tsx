"use client";
import { Button } from "components/Buttons/Button";
import { signIn, signOut } from "next-auth/react";
import React from "react";

enum Login {
  SIGNIN,
  SIGNOUT,
}

const AuthButton = ({
  login,
  classes,
}: {
  login: Login;
  classes?: string;
}) => {
  return login === Login.SIGNIN ? (
    <Button
      className={classes}
      onClick={() => {
        signIn("google");
      }}
    >
      Sign IN
    </Button>
  ) : (
    <Button
      className={classes}
      onClick={() => {
        signOut();
      }}
    >
      Sing Out
    </Button>
  );
};

export default AuthButton;
