/** @format */

import { Link } from "@/components/ui/link";
import { paths } from "@/config/paths";

const Main = () => {
  return (
    <>
      <Link to={paths.interview.register.path}>매칭 페이지</Link>
      <br />
      <br />
      <Link to={paths.chatroom.main.path}>채팅방</Link>
    </>
  );
};

export default Main;
