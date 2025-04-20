/** @format */

import { cn } from "@/utils/cn";

type ImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  rounded?: boolean;
  onClick?: () => void; // 추가됨
};

export const CustomImage = ({
  src,
  alt = "이미지",
  width = "100%",
  height = "auto",
  className = "",
  onClick,
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("", className)}
      onClick={onClick}
    />
  );
};
