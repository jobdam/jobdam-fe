/** @format */
import { RootState } from "@/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostFeedBackMutation } from "../../api/post-feedBack";
import { usePostQuestionMutation } from "../../api/post-question";
import { addInterviewQuestion } from "@/store/slices/videoChatInterview";

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

  const { mutate: submitFeedback } = usePostFeedBackMutation({
    mutationConfig: {
      onSuccess: () => {
        alert("피드백 전송에 성공하였습니다.");
        setFeedback("");
      },
      onError: (err) => {
        alert("피드백 전송에 실패하였습니다. 다시 전송 해주세요.");
        console.error(err);
      },
    },
  });

  const { mutate: submitQuestion } = usePostQuestionMutation({
    mutationConfig: {
      onSuccess: (newQuestionId) => {
        alert("질문 추가에 성공하였습니다.");
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
        alert("질문 추가에 실패하였습니다. 다시 추가 해주세요.");
        console.error(err);
      },
    },
  });

  const handleFeedBackSubmit = async () => {
    if (!questionId) {
      alert("질문을 먼저 선택해주세요");
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
  //질문추가 핸들러인데 상단에도 보여줘야함 리턴받아서 설정해야함
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
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="피드백을 작성해주세요."
            className="w-full pr-8 resize-none pr-8 text-sm placeholder-gray-400 text-gray-800 outline-none"
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
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="추가 질문을 작성해주세요"
            className="w-full resize-none pr-8 text-sm placeholder-gray-400 text-gray-800 outline-none"
          />
          <button
            onClick={handleQuestionSubmit}
            className="absolute right-5 ml-2"
          >
            <img src="/send.svg" alt="send" className="w-4 h-4 opacity-40" />
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionFeedbackBox;
