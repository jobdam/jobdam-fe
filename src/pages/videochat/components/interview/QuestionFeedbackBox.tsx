/** @format */
import { RootState } from "@/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostFeedBackMutation } from "../../api/post-feedBack";
import { usePostQuestionMutation } from "../../api/post-question";
import { addInterviewQuestion } from "@/store/slices/videoChatInterview";
import AlertDialog from "@/components/ui/alertdialog/alertdialog";

interface Props {
  questionId?: number | null;
  interviewId: number;
  context?: string | null;
  onNewQuestionCreated: (newId: number) => void;
}

const QuestionFeedbackBox = ({
  questionId,
  interviewId,
  context,
  onNewQuestionCreated,
}: Props) => {
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState("");
  const [question, setQuestion] = useState("");

  const selectedUserId = useSelector(
    (state: RootState) => state.videoChatInterview.selectedUserId
  );

  const [alertModal, setAlertModal] = useState<{
    open: boolean;
    title: string;
  }>({ open: false, title: "" });

  const enterPressed = useRef(false); //맥북엔터키중복해결
  const { mutate: submitFeedback } = usePostFeedBackMutation({
    mutationConfig: {
      onSuccess: () => {
        setAlertModal({
          open: true,
          title: "피드백 전송에 성공하였습니다.",
        });
        setFeedback("");
      },
      onError: (err) => {
        setAlertModal({
          open: true,
          title: "피드백 전송에 실패하였습니다. 다시 전송 해주세요.",
        });
        console.error(err);
      },
    },
  });

  const { mutate: submitQuestion } = usePostQuestionMutation({
    mutationConfig: {
      onSuccess: (newQuestionId) => {
        setAlertModal({
          open: true,
          title: "질문 추가에 성공하였습니다.",
        });
        dispatch(
          addInterviewQuestion({
            userId: selectedUserId!,
            question: {
              interviewQuestionId: newQuestionId,
              context: question,
            },
          })
        );
        onNewQuestionCreated(newQuestionId);
        setQuestion("");
      },
      onError: (err) => {
        setAlertModal({
          open: true,
          title: "질문 추가에 실패하였습니다. 다시 전송 해주세요.",
        });
        console.error(err);
      },
    },
  });

  const handleFeedBackSubmit = async () => {
    if (!questionId) {
      setAlertModal({
        open: true,
        title: "질문을 먼저 선택해주세요",
      });
      return;
    }
    if (!feedback.trim() || !selectedUserId) return;

    submitFeedback({
      questionId,
      payload: {
        targetUserId: selectedUserId,
        content: feedback,
      },
    });
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim() || !selectedUserId) return;
    submitQuestion({
      interviewId,
      payload: {
        context: question,
      },
    });
  };

  return (
    <>
      {/* 피드백 입력창 */}
      <div className="rounded-xl h-[55%] overflow-hidden border border-[#E0E0E0] shadow-sm">
        {/* 질문 헤더 */}
        <div className="bg-[#488FFF] px-4 py-2 flex justify-center items-center">
          <span className="inline-flex items-center">
            <span className="text-xl mr-3">💬</span>
            <span className="text-white font-semibold text-sm">
              {context ? context : "질문을 선택해주세요."}
            </span>
          </span>
        </div>

        {/* 피드백 입력 영역 */}
        <div className="relative bg-white px-4 py-3">
          <textarea
            value={feedback}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return; // 한글 입력 중이면 무시
              if (e.key === "Enter" && !e.shiftKey) {
                if (enterPressed.current) return;
                enterPressed.current = true;
                setTimeout(() => (enterPressed.current = false), 300); // 0.3초 후 리셋
                e.preventDefault();
                handleFeedBackSubmit();
              }
            }}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="피드백을 작성해주세요."
            maxLength={500}
            className="w-full pr-8 resize-none min-h-[100px] max-h-[220px] pr-8 text-base placeholder-gray-400 text-gray-800 outline-none scrollbar-none"
          />
          <button
            onClick={handleFeedBackSubmit}
            className="absolute right-5 ml-2"
          >
            <img src="/send.svg" alt="send" className="w-4 h-4 opacity-40" />
          </button>
        </div>
      </div>

      {/* 추가질문 입력창 */}
      <div className="rounded-xl h-[45%] overflow-hidden border border-[#E0E0E0] shadow-sm">
        <div className="relative bg-white px-4 py-3">
          <textarea
            value={question}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return; // 한글 입력 중이면 무시
              if (e.key === "Enter" && !e.shiftKey) {
                if (enterPressed.current) return;
                enterPressed.current = true;
                setTimeout(() => (enterPressed.current = false), 300); // 0.3초 후 리셋
                e.preventDefault();
                handleQuestionSubmit();
              }
            }}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="추가 질문을 작성해주세요"
            maxLength={200}
            className="w-full min-h-[100px] max-h-[220px] resize-none pr-8 text-base placeholder-gray-400 text-gray-800 outline-none scrollbar-none"
          />
          <button
            onClick={handleQuestionSubmit}
            className="absolute right-5 ml-2"
          >
            <img src="/send.svg" alt="send" className="w-4 h-4 opacity-40" />
          </button>
        </div>
      </div>
      <AlertDialog
        open={alertModal.open}
        onOpenChange={(open) => setAlertModal((a) => ({ ...a, open }))}
        title={alertModal.title}
        className={""}
        contents={<span style={{ display: "none" }} />}
      >
        <span style={{ display: "none" }} />
      </AlertDialog>
    </>
  );
};

export default QuestionFeedbackBox;
