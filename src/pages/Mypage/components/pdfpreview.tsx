/** @format */
import { Document, Page, pdfjs } from "react-pdf";

import { useRef } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  setFile?: (file: File | null) => void;
  file: File | null;
};
const Pdfpreview = ({ file }: Props) => {
  // const [numPages, setNumPages] = useState<number | null>(null);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [scale, setScale] = useState(1.0); // 기본 배율

  const containerRef = useRef<HTMLDivElement>(null);

  if (!file) {
    return null; // 또는 return <p className="text-gray-500 text-center">파일을 업로드해주세요.</p>;
  }

  // const getScale = () => {
  //   if (!pdfPageSize.width || !pdfPageSize.height) return 1;
  //   const widthScale = containerSize.width / pdfPageSize.width;
  //   const heightScale = containerSize.height / pdfPageSize.height;
  //   return Math.min(widthScale, heightScale);
  // };
  return (
    <div
      ref={containerRef}
      className=" 
    w-[850px] h-[510px]
    rounded-[20px] overflow-hidden"
    >
      <Document file={file}>
        <Page
          renderAnnotationLayer={false}
          // width={width ?? undefined}
          pageNumber={1}
          scale={1}
          loading={
            <div
              style={{
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
