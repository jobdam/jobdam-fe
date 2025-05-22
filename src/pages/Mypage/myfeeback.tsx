/** @format */

import { useEffect, useRef } from "react";
import { useInterviewGroupsInfinite } from "./api/get-interviews";
import InterviewCard from "./components/interviewCard";

const MyFeedback = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInterviewGroupsInfinite();

  // 무한스크롤 옵저버 ref
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 무한스크롤 pages 평탄화
  const groups = data?.pages.flat() ?? [];
  return (
    <div className="flex flex-col min-w-[915px] max-h-[600px] overflow-auto scrollbar-none items-stretch ">
      {groups.map((group, idx) => {
        const [month, date, day] = group.displayDate.split(" ");
        const lineHeight = group.interviews.length * 600;
        return (
          <div
            key={group.displayDate + "_" + idx}
            className="flex flex-row gap-x-6 mb-15"
          >
            <div className="relative w-[70px] text-xs font-medium leading-5 flex flex-col items-center">
              <div
                className="absolute top-0 left-18 -translate-x-1/2 w-[2px] flex-1 bg-[#488FFF] mt-2"
                style={{
                  height: `${lineHeight}px`,
                }}
              >
                &nbsp;
              </div>
              <span className="absolute top-[-6px] left-18 -translate-x-1/2 w-[15px] h-[15px] rounded-full bg-[#488FFF] mt-2 mb-2" />
              {month + " " + date}
              <br />
              {day}
            </div>
            {/* 카드 */}
            <div className="flex flex-col gap-y-15 w-full">
              {group.interviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
            {/* 옵저버 (무한스크롤용) */}
            <div ref={observerRef}></div>
            {isFetchingNextPage && (
              <div className="absolute inset-0 flex items-center justify-center">
                로딩중...
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyFeedback;
