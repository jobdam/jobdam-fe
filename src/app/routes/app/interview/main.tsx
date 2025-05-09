/** @format */

// import InterviewStart from "@/pages/interview/interviewStart";
import { paths } from "@/config/paths";
import { Link } from "react-router";

const Main = () => {
  return (
    // <div className="min-h-[100vh] w-[1980px] bg-[red]">
    <>
      <Link to={paths.interview.register.path}>매칭 페이지</Link>
      <br />
      <br />
      <Link to={paths.chatroom.main.path}>채팅방</Link>
    </>
    // </div>
  );
};

export default Main;
