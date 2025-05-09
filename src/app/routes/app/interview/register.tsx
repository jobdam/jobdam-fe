/** @format */

import InterviewLayout from "@/components/layout/interview-layout";
import InterviewRegister from "@/pages/interview/mathcingregister";

const InterviewRegisterRoute = () => {
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const redirectTo = searchParams.get("redirectTo");

  // const onValid = (data: any) => {
  //   console.log("폼 데이터:", data);

  //   navigate("/interview/matching"); // 제출 성공 후 이동
  // };

  return (
    <>
      <InterviewLayout
        title={
          <>
            가입을 위해
            <br />
            약관에 동의해주세요
          </>
        }
        showIcon={true}
      >
        <InterviewRegister></InterviewRegister>
      </InterviewLayout>
    </>
  );
};

export default InterviewRegisterRoute;
