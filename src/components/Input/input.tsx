import { InputHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "Lib/Utils/twClasses";

const inputVariant = cva("", {
  variants: {
    variant: {
      default:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
      select:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, variant, ...props }, ref) => {
   
    return (
      <div className="w-full">
        <label
          htmlFor={props.name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          className={cn(inputVariant({ variant, className }))}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);
Input.displayName = "Input";


export { Input };
