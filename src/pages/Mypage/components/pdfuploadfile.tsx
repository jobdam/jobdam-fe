/** @format */

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X } from "lucide-react"; // 아이콘은 선택사항
import DocumentImage from "../../../components/ui/images/documents";

type Props = {
  setFile: (file: File | null) => void;
  file: File | null;
};

const PDFUploadDialog = ({ setFile, file }: Props) => {
  console.log("pdfuploadfile에서 빌드때매 잠시씀", file);
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (selected?.type === "application/pdf") {
      console.log(selected);
      setPreview(selected);
    } else {
      alert("PDF 파일만 업로드할 수 있습니다.");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setPreview(null);
    }
  };

  const handleRegister = () => {
    setFile(preview);
  };

  return (
    <Dialog.Root modal={false} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button
          className=" inline-flex relative
        cursor-pointer bottom-[95px] left-[400px] 
        px-4 py-2 bg-[#488FFF] rounded-[20px] text-white"
        >
          PDF 업로드
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {open && (
          <div className="fixed inset-0 bg-black/40  pointer-events-none" />
        )}
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          onPointerDownOutside={(e) => e.preventDefault()}
          className="fixed top-1/2 left-1/2 w-[90vw] h-[400px] max-w-md -translate-x-1/2 
        -translate-y-1/2 bg-white rounded-xl p-[40px] shadow-xl z-[100]
        
        "
        >
          <div className="flex justify-between items-center mb-3">
            <Dialog.Title className="text-xl font-bold">파일 첨부</Dialog.Title>

            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <X />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="text-[14px] text-gray-500 font-normal mb-4">
            첨부파일은 아래의 확장자로 파일 업로드(10mb)가 가능합니다.
          </Dialog.Description>

          {/* 파일 선택 */}
          <label className="mb-4 flex flex-row">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />

            <span className="px-4 py-2 mr-[10px] bg-blue-500 text-white rounded cursor-pointer">
              파일 선택
            </span>
            <div className=" flex items-center pl-[20px]  h-[40px] w-[250px] rounded-[4px] border-[1px] border-gray-300 bg-[#eaedf4]">
              <div className="flex text-[14px] leading-[20px] text-gray-900 flex-row gap-[10px] items-center">
                {/* 여기에 파일이름이 들어가야한다. */}
                <DocumentImage></DocumentImage>
                {preview ? (
                  <span>{preview.name}</span>
                ) : (
                  <span>선택된 파일이 없음</span>
                )}
              </div>
            </div>
          </label>
          <Dialog.Description className="text-[14px] text-[#67738e] font-normal mt-[8px]">
            *불필요한 개인정보가 포함되지 않도록 확인 후 첨부하세요.{" "}
          </Dialog.Description>

          <Dialog.Description className="text-[14px] text-[#67738e] border-t-[1px] mt-[24px] border-[#67738e] font-normal pt-[24px]">
            {/* <div className="w-full h-[1px] "></div> */}
            등록가능한 파일 형식 및 확장자 : PDF
          </Dialog.Description>
          {/* 닫기 버튼 */}
          <div className="mt-6 h-[40px] text-right gap-[10px] flex justify-center fixed bottom-[10%] left-[50%] translate-x-[-50%] ">
            <Dialog.Close asChild>
              <button className="px-4 py-2 w-[100px] bg-gray-400 text-white  cursor-pointer hover:bg-gray-300 rounded">
                닫기
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                onClick={handleRegister}
                // disabled={!preview}
                className="
                disabled:bg-blue-200 disabled:cursor-auto
                px-4 py-2 bg-blue-500 w-[100px] text-white cursor-pointer hover:bg-blue-400 rounded"
              >
                등록
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PDFUploadDialog;
