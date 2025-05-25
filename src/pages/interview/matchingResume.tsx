/** @format */

import { useForm } from "react-hook-form";
import { useResume } from "../Mypage/api/get-resume";
// import { usePostResume } from "../Mypage/api/post-resume";
import { Form } from "@/components/ui/form";
import PDFUploadDialog from "../Mypage/components/pdfuploadfile";
import PDFPreviewDropzoneWithIcon from "../Mypage/components/pdfdrag&drop";
import Pdfpreview from "../Mypage/components/pdfpreview";
import Filetext from "@/components/ui/images/filetext";
import { useLocation, useNavigate } from "react-router";
import { paths } from "@/config/paths";
type ResumeFormValues = {
  resumeFile: File | null;
};

const MatchingResume = () => {
  const form = useForm<ResumeFormValues>({
    defaultValues: {
      resumeFile: null,
    },
  });
  PDFUploadDialog;

  const location = useLocation();
  const formData = location.state;

  const { data } = useResume({});
  const resumeURL = data?.data?.resumeUrl;
  console.log(resumeURL);

  const file = form.watch("resumeFile");

  //   const registerResume = usePostResume({});
  //작성 완료시 url로 띄우기. preview는 실제 url이있다면 없어지도록
  const navigate = useNavigate();
  return (
    <>
      <Form
        form={form}
        onSubmit={() => {
          navigate(`${paths.interview.matching.path}`, {
            state: formData,
          });
        }}
        className="relative spacey-y-0"
      >
        {({}) => (
          <>
            <div className="  flex flex-col rounded-[20px]  justify-center items-center min-w-[915px] h-[617px] p-[24px] pb-[0px]   bg-[white]">
              {/*pdf  업로드 버튼 누르면 모달창 나온다*/}

              <PDFUploadDialog
                className="top-[-13%]"
                file={file}
                setFile={(file) => form.setValue("resumeFile", file)}
              ></PDFUploadDialog>
              <div className="bg-[white] border-[1px] w-full border-[#cfcfcf] rounded-[20px]  h-full flex justify-center items-center">
                {!file && (
                  <PDFPreviewDropzoneWithIcon
                    content={
                      <div className="flex justify-center flex-col items-center">
                        <Filetext></Filetext>
                        이력서를 PDF로 첨부해 주세요.<br></br>
                        면접 참여 시 이 문서가 공유됩니다.
                      </div>
                    }
                    file={file}
                    setFile={(file) => form.setValue("resumeFile", file)}
                  ></PDFPreviewDropzoneWithIcon>
                )}

                {/* {resumeURL ? (
                      <PdfView resumeURL={resumeURL}></PdfView>
                    ) : ( */}
                <Pdfpreview
                  file={file}
                  setFile={(file) => form.setValue("resumeFile", file)}
                ></Pdfpreview>
                {/* )} */}
              </div>

              <div className="mr-auto pl-[20px] h-[20px] translate-y-[10px]">
                {file?.name && (
                  <>
                    <span className="text-[18px] text-[#cfcfcf] font-semibold leading-[150%]">
                      {`[` + file?.name + "]"}
                    </span>
                    <button
                      onClick={() => form.setValue("resumeFile", null)}
                      className=" text-[#cfcfcf] pl-[10px] cursor-pointer"
                      type="button"
                    >
                      X
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-row justify-between"></div>
            </div>
            <div className="flex justify-end w-full rounded-[20px] translate-y-[-30px] items-end">
              <button
                className=" cursor-pointer
                inlined-flex  px-[29px] py-[12px]
                bg-[#488fff] w-[100px] text-[18px] rounded-[20px] text-[white] "
                type="submit"
              >
                저장
              </button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default MatchingResume;
