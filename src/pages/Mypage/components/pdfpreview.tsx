/** @format */
import { Document, Page, pdfjs } from "react-pdf";

import { useEffect, useRef, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  setFile: (file: File | null) => void;
  file: File | null;
};
const Pdfpreview = ({ file }: Props) => {

  // const [numPages, setNumPages] = useState<number | null>(null);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [scale, setScale] = useState(1.0); // 기본 배율

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

  if (!file) {
    return null; // 또는 return <p className="text-gray-500 text-center">파일을 업로드해주세요.</p>;
  }
  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <Document file={file}>
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

export default Pdfpreview;
