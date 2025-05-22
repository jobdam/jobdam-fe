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

  console.log(resumeURL, "pdfViewer");

  return (
    <div ref={containerRef} className="  w-full h-full overflow-hidden">
      <Document
        // file="https://jobdam-bucket.s3.ap-northeast-2.amazonaws.com/resume/37/940c1d22-bb5f-4483-9123-1bdfac8578df_37_resume.pdf"

        file={resumeURL}
      >
        <Page
          renderAnnotationLayer={false}
          width={width ?? undefined}
          pageNumber={1}
          scale={0.5}
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
      </Document>
    </div>
  );
};

export default PdfView;
