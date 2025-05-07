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

// const users = [
//   {
//     name: "Colm Tuite",
//     image:
//       "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
//   },
//   {
//     name: "Jane Doe",
//     initials: "JD",
//     image:
//       "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
//     size: "45px",
//     rounded: true,
//   },
//   {
//     name: "Pedro Duarte",
//     initials: "PD",
//     image: "",
//     size: "45px",
//     rounded: true,
//   },
// ];

//이름이 필요할때 쓸수있도록 만들어놓기
const Avatars = ({
  users = [],
  className,
  size /*showName*/,
}: AvatarsProps) => (
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
