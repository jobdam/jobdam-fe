/** @format */

import { Document, Page, pdfjs } from "react-pdf";

import { useEffect, useRef, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  resumeURL: string; // S3에서 받은 PDF URL
  // width?: number;
};
const PdfView = ({ resumeURL }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number | any>(null);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    resize(); // 초기 실행
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  //이건 직접보는거라 page

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col overflow-x-hidden overflow-y-auto items-center"
    >
      <Document
        file={resumeURL}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          // reset when document changes
        }}
        loading={<div>PDF 로딩 중...</div>}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading={
              <div
                style={{
                  width: width ?? undefined,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                }}
              >
                로딩 중...
              </div>
            }
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfView;
