/** @format */
import { Document, Page, pdfjs } from "react-pdf";

import React, { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Pdfupload = ({ file }: { file: any }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  console.log(file);
  return (
    <div className="p-4">
      <Document
        file={file}
        onLoadError={console.error}
        onLoadSuccess={onLoadSuccess}
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page key={`page_${i + 1}`} pageNumber={i + 1} />
        ))}
      </Document>
    </div>
  );
};

export default Pdfupload;
