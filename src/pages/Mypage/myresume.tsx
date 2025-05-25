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

type ResumeFormValues = {
  resumeFile: File | null;
};

const Myresume = () => {
  const form = useForm<ResumeFormValues>({
    defaultValues: {
      resumeFile: null,
    },
  });

  const { data } = useResume({});
  const resumeURL = data?.data?.resumeUrl;
  console.log(resumeURL);

  const file = form.watch("resumeFile");

  const registerResume = usePostResume({});
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
            <div className="  flex flex-col rounded-[20px]  justify-center items-center min-w-[915px] h-[580px]  p-[36px] bg-[white]">
              {/*pdf  업로드 버튼 누르면 모달창 나온다*/}

              <PDFUploadDialog
                file={file}
                setFile={(file) => form.setValue("resumeFile", file)}
              ></PDFUploadDialog>
              <div className="bg-[white] border-[1px] w-full border-[#cfcfcf] rounded-[20px]  h-full flex justify-center items-center">
                {!file && (
                  <PDFPreviewDropzoneWithIcon
                    content={
                      <div className="flex flex-col items-center justify-center h-full w-full text-center">
                        <img
                          className="mb-5"
                          src="/resume.svg"
                          alt="이력서모양"
                        />
                        이력서를 PDF로 첨부해 주세요. <br />
                        면접 참여 시 이 문서가 공유됩니다.
                      </div>
                    }
                    file={file}
                    setFile={(file) => form.setValue("resumeFile", file)}
                  ></PDFPreviewDropzoneWithIcon>
                )}

                {resumeURL ? (
                  <PdfView resumeURL={resumeURL}></PdfView>
                ) : (
                  <Pdfpreview
                    file={file}
                    setFile={(file) => form.setValue("resumeFile", file)}
                  ></Pdfpreview>
                )}
              </div>

              <div className="mr-auto pl-[20px] h-[20px] translate-y-[20px]">
                {file?.name && (
                  <>
                    <span>{file?.name}</span>
                    <button
                      onClick={() => form.setValue("resumeFile", null)}
                      className="pl-[5px] cursor-"
                      type="button"
                    >
                      X
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-row justify-between"></div>
            </div>
            <div className="flex justify-center w-1/2 mx-auto mt-[70px] mb-[20px] items-center">
              <Button type="submit">내용 저장하기</Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default Myresume;
