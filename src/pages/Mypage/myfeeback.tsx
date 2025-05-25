/** @format */

import { useEffect, useRef, useState } from "react";
import { useInterviewGroupsInfinite } from "./api/get-interviews";
import InterviewCard from "./components/interviewCard";
import { InterviewDateGroup } from "@/types/interview";

const MyFeedback = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInterviewGroupsInfinite();

  // 무한스크롤 옵저버 ref
  const observerRef = useRef<HTMLDivElement | null>(null);
  //타임라인길이때문에 상세보기한것(배열로)만 길이체크
  const [openedInterviewIds, setOpenedInterviewIds] = useState<number[]>([]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 카드 열기 토글 핸들러
  const handleToggleOpen = (id: number) => {
    setOpenedInterviewIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // 무한스크롤 pages 평탄화
  const groups = data?.pages.flat() ?? [];
  //날짜별로 합치기 위한 머지
  const mergeGroups = (groups: InterviewDateGroup[]): InterviewDateGroup[] => {
    if (groups.length === 0) return [];

    const merged: InterviewDateGroup[] = [];
    for (const group of groups) {
      const prev = merged[merged.length - 1];
      if (prev && prev.displayDate === group.displayDate) {
        // 같은 날짜면 인터뷰 배열을 합침
        prev.interviews = [...prev.interviews, ...group.interviews];
      } else {
        merged.push({ ...group });
      }
    }
    return merged;
  };

  const mergedGroups = mergeGroups(groups);

  return (
    <div className="flex flex-col min-w-[915px] max-h-[600px] overflow-auto scrollbar-none items-stretch ">
      {mergedGroups.length === 0 && (
        <div className="rounded-[10px] bg-white p-[25px] w-[807px] mt-[30px] h-[240px] items-center justify-center translate-x-[10px] shadow flex flex-col">
          <span className="text-[18px] text-black/50 font-medium tracking-tight">
            아직 받은 피드백이 없어요.
          </span>
        </div>
      )}
      {mergedGroups.map((group, idx) => {
        // 오픈된/닫힌 카드 계산
        const openCount = group.interviews.filter((i) =>
          openedInterviewIds.includes(i.id)
        ).length;
        const closeCount = group.interviews.length - openCount;
        const [month, date, day] = group.displayDate.split(" ");
        const lineHeight = openCount * 600 + closeCount * 300;
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
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  opened={openedInterviewIds.includes(interview.id)}
                  onToggleOpen={() => handleToggleOpen(interview.id)}
                />
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
