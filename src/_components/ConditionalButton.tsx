'use client'
import { Button } from "_components/Button";
import { signIn } from "next-auth/react";
import React from "react";

const ConditionalButton = ({
  login,
  href,
  classes,
  result,
}: {
  login?: boolean;
  href: string;
  classes?:string;
  result: string;
}) => {
  return login ? (
    <Button
    className={classes}
      onClick={() => {
        signIn("google");
      }}
    >
      {result}
    </Button>
  ) : (
    <Button className={classes} href={href}>{result}</Button>
  );
};

export default ConditionalButton;
