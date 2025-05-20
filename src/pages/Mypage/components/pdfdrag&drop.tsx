/** @format */

import React, { useState, useCallback } from "react";

const dragIconUrl = "https://cdn-icons-png.flaticon.com/512/724/724933.png";
type Props = {
  setFile: (file: File | null) => void;
  file: File | null;
};
const PDFPreviewDropzoneWithIcon = ({ setFile, file }: Props) => {
  const [dragActive, setDragActive] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const pdfFile = droppedFiles[0];
      console.log(pdfFile);
      if (pdfFile.type === "application/pdf") {
        setFile(pdfFile);
      } else {
        alert("PDF 파일만 업로드 가능합니다.");
      }
    }
  }, []);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative h-full w-full flex justify-center items-center transition-all duration-200 rounded-lg  ${
        dragActive &&
        "border-dashed border-4 border-blue-500 bg-blue-50 text-blue-500"
      }`}
    >
      {/* 드래그 중일 때 오버레이 */}
      {dragActive && !file && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
          <img
            src={dragIconUrl}
            alt="Drag icon"
            className="w-20 h-20 mb-3 opacity-70"
          />
          <p className="text-lg font-bold text-center">
            PDF 파일을 여기로 드래그하세요
          </p>
        </div>
      )}

      {/* 기본 안내 문구 */}
      {!file && !dragActive && (
        <span className="text-[#cfcfcf] text-center font-semibold text-[18px] leading-[150%] px-4">
          자기소개서 또는 이력서 내용을 입력해주세요. <br /> 준비해둔 글이
          있다면 그대로 붙여넣어 주세요.
        </span>
      )}
    </div>
  );
};

export default PDFPreviewDropzoneWithIcon;
