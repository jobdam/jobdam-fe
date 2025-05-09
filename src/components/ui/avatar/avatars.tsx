/** @format */

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
//이미지는 저장해놓은걸 불러온다. db

type User = {
  name: string;
  image?: string;
  size?: "default" | "sm" | "lg";
  rounded?: boolean;
};

//128 167 57(ronded)
type AvatarsProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof avatarVariants> & {
    users: User[];
    className?: string;
    showName?: boolean;
  };

const avatarVariants = cva(
  "inline-flex w-[128px] h-[128px] select-none rounded-2xl items-center justify-center overflow-hidden bg-blackA1 align-middle",
  {
    variants: {
      size: {
        default: "  w-[128px] h-[128px]",
        lg: " w-[167px] h-[167px]",
        sm: " w-[57px] h-[57px] rounded-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

//이름이 필요할때 쓸수있도록 만들어놓기
const Avatars = ({ users = [], className, size }: AvatarsProps) => (
  <div className="flex gap-3">
    {users.map((user, index) => (
      <>
        <AvatarPrimitive.Root
          key={index}
          className={cn(avatarVariants({ size }), className)}
        >
          {user.image && (
            <AvatarPrimitive.Image
              className="size-full object-cover"
              src={user.image}
              alt={user.name}
            />
          )}
        </AvatarPrimitive.Root>
      </>
    ))}
  </div>
);

export default Avatars;
