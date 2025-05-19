/** @format */

import { useEffect, useRef, useState } from "react";

export const useEdgeAutoScroll = (threshold = 70, speed = 4) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState<null | "up" | "down">(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - bounds.top;
    const height = bounds.height;

    if (y < threshold) {
      setScrolling("up");
    } else if (y > height - threshold) {
      setScrolling("down");
    } else {
      setScrolling(null);
    }
  };

  const handleMouseLeave = () => {
    setScrolling(null);
  };

  useEffect(() => {
    let frame: number;

    const scroll = () => {
      if (!scrollRef.current) return;

      if (scrolling === "up") {
        scrollRef.current.scrollTop -= speed;
      } else if (scrolling === "down") {
        scrollRef.current.scrollTop += speed;
      }

      frame = requestAnimationFrame(scroll);
    };

    if (scrolling) {
      frame = requestAnimationFrame(scroll);
    }

    return () => cancelAnimationFrame(frame);
  }, [scrolling, speed]);

  return {
    scrollRef,
    handleMouseMove,
    handleMouseLeave,
  };
};
