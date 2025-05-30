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
  register?: boolean;
};
const InterviewLayout = ({
  title,
  children,
  matching = false,
  register = false,
}: LayoutProps) => {
  return (
    <div
      className={cn(
        "flex w-full justify-center p-[50px]",

        register && "h-[1600px] bg-[#E5F3FF]",
        matching && "h-full"
      )}
    >
      {/* 전체 컨텐츠 wrapper (sidebar + main) */}
      <div className="flex w-full min-w-[1200px] gap-6 flex-nowrap">
        {/* Sidebar */}
        <aside className="w-[232px]  shrink-0 mt-[130px] ml-[20px] pl-[50px]">
          <InterviewSidebar />
        </aside>

        {/* Main */}
        <main
          className={cn(
            "flex flex-col w-full min-w-0",
            matching
              ? "justify-center max-h-[650px]"
              : "items-start max-w-[1200px] min-w-[800px] mt-[30px] ml-[30px]"
          )}
        >
          {/* Title */}
          <div className="mb-[20px]">
            <h2 className="text-[32px] font-semibold text-gray-900 text-left">
              {title}
            </h2>
          </div>

          {/* Content Area */}
          <section
            className={cn(
              "p-6 w-full flex flex-col gap-[5px] rounded-[20px] bg-white",
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
