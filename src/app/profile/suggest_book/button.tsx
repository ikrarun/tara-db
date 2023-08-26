import { Button } from "_components/Button";
import { signIn } from "next-auth/react";
import React from "react";

const button = ({
  login,
  href,
  result,
}: {
  login?: boolean;
  href: string;
  result: string;
}) => {
  return login ? (
    <Button
      onClick={() => {
        signIn("google");
      }}
    >
      {result}
    </Button>
  ) : (
    <Button href={href}>{result}</Button>
  );
};

export default button;
