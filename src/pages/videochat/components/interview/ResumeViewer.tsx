/** @format */
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js";

const ResumeViewer = ({ resumeUrl }: { resumeUrl: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="border rounded-lg w-full max-h-[400px] overflow-y-auto">
      <Document
        file={resumeUrl}
        onLoadSuccess={handleLoadSuccess}
        onLoadError={(err) => {
          console.error("PDF load error:", err);
        }}
        loading={<p>📄 이력서를 불러오는 중입니다...</p>}
        error={<p>❌ 이력서를 불러올 수 없습니다.</p>}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={480}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
};

export default ResumeViewer;
