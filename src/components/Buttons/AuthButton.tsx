"use client";
import { signIn, signOut } from "next-auth/react";
import { AuthEnums } from "enum";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "Lib/Utils/twClasses";

const authButtonVariant = cva(
  "inline-flex rounded-full py-3 px-5 items-center justify-center gap-2 text-xl",
  {
    variants: {
      variant: {
        default: "bg-blue-700 text-white hover:bg-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof authButtonVariant> {
  authFunction: AuthEnums;
}

const AuthButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, authFunction, ...props }, ref) => {
    return authFunction === AuthEnums.SIGNIN ? (
      <button
        className={cn(authButtonVariant({ className }))}
        {...props}
        onClick={() => {
          signIn("google");
        }}
      >
        Sign IN
      </button>
    ) : (
      <button
        className={cn(authButtonVariant({ className }))}
        {...props}
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    );
  }
);
AuthButton.displayName = "AuthButton";

export { authButtonVariant };
export default AuthButton;
