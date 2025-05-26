/** @format */

import { Document, Page, pdfjs } from "react-pdf";

import { useRef, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  resumeURL: string; // S3에서 받은 PDF URL
  // width?: number;
};
const ResumeViewer = ({ resumeURL }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPage(1);
  };
  const goToPrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPage((prev) => Math.min(prev + 1, numPages));
  return (
    <div
      ref={containerRef}
      className="max-w-[370px] max-h-full overflow-y-auto bg-white"
      style={{
        border: "1px solid #ddd",
      }}
    >
      <Document file={resumeURL} onLoadSuccess={handleDocumentLoadSuccess}>
        <Page
          pageNumber={page}
          scale={1.7}
          renderAnnotationLayer={false}
          renderTextLayer={true}
          loading={
            <div
              style={{
                minHeight: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              로딩 중...
            </div>
          }
        />
      </Document>
      {/* 페이지 이동 컨트롤러 */}
      <div className="flex items-center justify-center mt-2 gap-4 select-none">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-bold hover:bg-blue-300 disabled:opacity-40"
          onClick={goToPrevPage}
          disabled={page === 1}
        >
          &lt; 이전
        </button>
        <span className="text-base font-semibold">
          {page} / {numPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-bold hover:bg-blue-300 disabled:opacity-40"
          onClick={goToNextPage}
          disabled={page === numPages}
        >
          다음 &gt;
        </button>
      </div>
    </div>
  );
};

export default ResumeViewer;
