/** @format */

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "../spinner";
// import { buttonVariants } from "../../../lib/variants";

//cva Tailwind CSS 클래스를 **"변형(variant)"과 "조합"**을 기반으로 구성할 수 있게 도와주는 유틸리티입니다.
//특히 버튼, 배지 등 다양한 스타일 변형이 필요한 컴포넌트에 유용하다.
//이 값을 설정한것을 토대로

//storybook에 서 controls 요소

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-[#488fff] ",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[65px] w-full",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    size?: "default" | "sm" | "lg" | "icon";

    isLoading?: boolean;
    icon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "default",
      asChild = false,
      children,
      isLoading,
      icon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={props.disabled}
        {...props}
      >
        <>
          {isLoading && <Spinner size="sm" className="text-current" />}
          {!isLoading && icon && <span className="mr-2">{icon}</span>}
          <span className={cn("text-[white] text-[24px]sss ", className)}>
            {children}
          </span>
        </>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
