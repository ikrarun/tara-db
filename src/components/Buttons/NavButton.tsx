import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "Lib/utils";
import Link from "next/link";

const navbuttonVariants = cva(
  "inline-flex rounded-full py-3 px-5 items-center justify-center gap-2 text-xl",
  {
    variants: {
      variant: {
        default: "hover:bg-gray-700/30 text-black",
        dark: "hover:bg-gray-700/30 text-white",
        blue: "bg-blue-700 text-white hover:bg-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navbuttonVariants> {
  href?: string;
}

const NavButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(navbuttonVariants({ variant, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(navbuttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
NavButton.displayName = "NavButton";

export { navbuttonVariants };
export default NavButton;
