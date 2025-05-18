/** @format */
import { Input } from "@/components/ui/form";
import { RootState } from "@/store";
import { Send } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePostFeedBackMutation } from "../../api/post-feedBack";

interface Props {
  questionId: number;
  context: string;
}

const QuestionFeedbackBox = ({ questionId, context }: Props) => {
  const [feedback, setFeedback] = useState("");
  const [question, setQuestion] = useState("");

  const selectedUserId = useSelector(
    (state: RootState) => state.videoChatInterview.selectedUserId
  );

  const { mutate: submitFeedback } = usePostFeedBackMutation({
    mutationConfig: {
      onSuccess: () => {
        alert("피드백 전송에 성공하였습니다.");
      },
      onError: (err) => {
        alert("피드백 전송에 실패하였습니다. 다시 전송 해주세요.");
        console.error(err);
      },
    },
  });

  //   const { mutate: submitQuestion } = usePostQuestionMutation({
  //     mutationConfig: {
  //       onSuccess: () => {
  //         alert("질문 추가에 성공하였습니다.");
  //       },
  //       onError: (err) => {
  //         alert("질문 추가에 실패하였습니다. 다시 추가 해주세요.");
  //         console.error(err);
  //       },
  //     },
  //   });

  const handleFeedBackSubmit = async () => {
    if (!feedback.trim() || !selectedUserId) return;

    submitFeedback({
      questionId,
      payload: {
        targetUserId: selectedUserId,
        content: feedback,
      },
    });

    setFeedback("");
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim() || !selectedUserId) return;

    setQuestion("");
  };

  return (
    <div className="mt-[19px]">
      <div className="text-[#488FFF] text-sm mb-2 font-semibold">
        질문: {context}
      </div>
      {/* 피드백 입력창 */}
      <div className="relative mb-4">
        <Input
          className="w-[495px] h-[120px]"
          placeholder="피드백을 작성해주세요"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          onClick={handleFeedBackSubmit}
          className="absolute right-2 top-2"
        >
          <Send className="w-5 h-5 text-[#488FFF]" />
        </button>
      </div>
      {/* 추가질문 입력창 */}
      <div className="relative">
        <Input
          className="w-[495px] h-[120px] mt-2"
          placeholder="질문을 작성해주세요"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleQuestionSubmit}
          className="absolute right-2 top-2"
        >
          <Send className="w-5 h-5 text-[#488FFF]" />
        </button>
      </div>
    </div>
  );
};

export default QuestionFeedbackBox;
