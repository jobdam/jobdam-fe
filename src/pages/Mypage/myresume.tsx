/** @format */

import { Button } from "@/components/ui/button";

import PDFPreviewDropzoneWithIcon from "./components/pdfdrag&drop";
import PDFUploadDialog from "./components/pdfuploadfile";
import Pdfpreview from "./components/pdfpreview";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { usePostResume } from "./api/post-resume";
import { useResume } from "./api/get-resume";
import PdfView from "./components/pdfview";
import { store } from "@/store";
import { addNotification } from "@/store/slices/notifications";
import { useState } from "react";

type ResumeFormValues = {
  resumeFile: File | null;
};

const Myresume = () => {
  const form = useForm<ResumeFormValues>({
    defaultValues: {
      resumeFile: null,
    },
  });
  const [isLoding, setIsLoading] = useState<boolean>(false);

  const { data, refetch } = useResume({});
  const resumeURL = data?.data?.resumeUrl;
  console.log(resumeURL);

  const file = form.watch("resumeFile");
  //업로드할때 loading 표시하기

  //작성 완료시 url로 띄우기. preview는 실제 url이있다면 없어지도록

  return (
    <>
      <Form
        form={form}
        onSubmit={(value) => {
          console.log(value.resumeFile);

          const formData = new FormData();

          if (value.resumeFile) {
            formData.append("pdfFile", value.resumeFile); // File 객체
          }
          registerResume.mutate(formData);
        }}
        className="relative "
      >
        {({}) => (
          <>
            <div className="  flex flex-col rounded-[20px]  justify-center items-center w-[915px] h-[617px]  p-[36px] pb-[40px] bg-[white]">
              {/*pdf  업로드 버튼 누르면 모달창 나온다*/}

              <PDFUploadDialog
                file={file}
                setFile={(file) => form.setValue("resumeFile", file)}
              ></PDFUploadDialog>
              <div className="bg-[white]  border-[1px] w-full border-[#cfcfcf] rounded-[20px]  h-full flex justify-center items-center">
                {!file && (
                  <PDFPreviewDropzoneWithIcon
                    content={
                      <div className="flex flex-col items-center justify-center w-full h-full py-10 text-gray-400">
                        <img
                          src="/resume.svg"
                          alt="이력서"
                          className="w-24 h-24 mb-4"
                        />
                        <div className="text-center">
                          <p className="text-base font-medium">
                            이력서를 PDF로 첨부해 주세요.
                            <br />
                            면접 참여 시 이 문서가 공유됩니다.
                          </p>
                        </div>
                      </div>
                    }
                    file={file}
                    setFile={(file) => form.setValue("resumeFile", file)}
                  ></PDFPreviewDropzoneWithIcon>
                )}
                {/* resume url과 preview는 동시에 존재 하고, 오른쪽엔 view 왼쪽엔 preview배치 */}
                <Pdfpreview
                  file={file}
                  setFile={(file) => form.setValue("resumeFile", file)}
                ></Pdfpreview>
                <div className="mx-[5px] w-[1px] bg-[#cfcfcf] h-full"></div>
                <PdfView resumeURL={resumeURL}></PdfView>
              </div>

              <div className="mr-auto pl-[20px] h-[20px] translate-y-[10px]">
                <div></div>
                {file?.name ? (
                  <>
                    <span>{file.name}</span>
                    <button
                      onClick={() => form.setValue("resumeFile", null)}
                      className="pl-[8px] cursor-pointer"
                      type="button"
                    >
                      X
                    </button>
                  </>
                ) : (
                  // 빈 공간을 유지하기 위한 placeholder
                  <div className="h-[30px] w-[100px]"></div>
                )}
              </div>
              <div className="flex flex-row justify-between"></div>
            </div>
            <div className="flex justify-center cursor-pointer w-/10 mt-[70px] mb-[70px] items-center">
              <Button
                isLoading={registerResume.isPending}
                className="cursor-pointer "
                type="submit"
              >
                내용 저장하기
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default Myresume;
