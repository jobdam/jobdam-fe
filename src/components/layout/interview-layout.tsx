/** @format */

import { Variant } from "../ui/form";

import { cn } from "@/utils/cn";
import InterviewSidebar from "./components/interview-sidebar";
export type LayoutProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  showIcon?: boolean;
  className?: string;
  matching?: boolean;
  variant?: Variant;
};
const InterviewLayout = ({
  title,
  children,
  matching = false,
}: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full justify-center p-[50px]">
      {/* 전체 컨텐츠 wrapper (sidebar + main) */}
      <div className="flex w-full min-w-[1200px] gap-6 flex-nowrap  ">
        {/* Sidebar */}
        <aside className="w-[232px]  shrink-0 mt-[100px]">
          <InterviewSidebar />
        </aside>

        {/* Main */}
        <main
          className={cn(
            "flex flex-col w-full min-w-0",
            matching
              ? "justify-center max-h-[650px]"
              : "items-start max-w-[1200px] min-w-[800px]"
          )}
        >
          {/* Title */}
          <div className="mb-[40px]">
            <h2 className="text-[32px] font-semibold text-gray-900 text-left">
              {title}
            </h2>
          </div>

          {/* Content Area */}
          <section
            className={cn(
              "p-6 w-full flex flex-col gap-[5px] bg-[#F5F5F5]",
              matching && "bg-white"
            )}
          >
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default InterviewLayout;
