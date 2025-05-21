/** @format */

import { Button } from "@/components/ui/button";

import PDFPreviewDropzoneWithIcon from "./components/pdfdrag&drop";
import PDFUploadDialog from "./components/pdfuploadfile";
import Pdfpreview from "./components/pdfpreview";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

type ResumeFormValues = {
  resumeFile: File | null;
};

const Myresume = () => {
  const form = useForm<ResumeFormValues>({
    defaultValues: {
      resumeFile: null,
    },
  });

  const file = form.watch("resumeFile");
  console.log(file);

  return (
    <>
      <Form
        form={form}
        onSubmit={(value) => {
          console.log(value);
        }}
        className="relative "
      >
        {({}) => (
          <>
            <div className="  flex flex-col  justify-center items-center min-w-[915px] h-[617px]  p-[36px] bg-[#f3f3f3]">
              {/*pdf  업로드 버튼 누르면 모달창 나온다*/}

              <PDFUploadDialog
                file={file}
                setFile={(file) => form.setValue("resumeFile", file)}
              ></PDFUploadDialog>
              <div className="bg-[white] w-full h-full flex justify-center items-center">
                {!file && (
                  <PDFPreviewDropzoneWithIcon
                    file={file}
                    setFile={(file) => form.setValue("resumeFile", file)}
                  ></PDFPreviewDropzoneWithIcon>
                )}
                <Pdfpreview
                  file={file}
                  setFile={(file) => form.setValue("resumeFile", file)}
                ></Pdfpreview>
                {/* <Pdfupload file={"/리뷰데이 6주차.pdf"}></Pdfupload> */}
              </div>

              <div></div>
              <div className="flex flex-row justify-between"></div>
            </div>
            <div className="flex justify-center w-1/2 items-center">
              <Button>작성완료</Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default Myresume;
