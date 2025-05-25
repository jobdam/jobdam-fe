/** @format */

import { NavigationMenu } from "radix-ui";
import { Link } from "../link";
import { paths } from "@/config/paths";
import { useLogout } from "@/lib/auth";
import { useNavigate } from "react-router";
import { clearTokens } from "@/lib/authSerivices";
type Props = { title: string };

const Menu = ({ title }: Props) => {
  const navigate = useNavigate();

  const logout = useLogout({
    onSuccess: () => {
      //   navigate(paths.auth.login.getHref(location.pathname), { replace: true });
      clearTokens();
      //   navigate(paths.auth.login.getHref(location.pathname));
    },

    onError: () => {
      clearTokens();

      //   queryClient.setQueryData(["authenticated-user"], null);
    },
    onSettled: () => {
      //   queryClient.setQueryData(["authenticated-user"], null);
      //   queryClient.removeQueries({ queryKey: ["authenticated-user"] });
      //   queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
      navigate(paths.auth.login.getHref(location.pathname), { replace: true });

      //성공하든 실패하든. 클라이언트단에서는 로그아웃을 진행한다.
    },
  });
  return (
    <NavigationMenu.Root className="relative  z-10 ">
      <NavigationMenu.List className="  m-0 flex  text-[#488fff]  text-[16px] font-semibold w-full h-full ">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className=" flex bg-white rounded-[20px] items-center justify-center w-[106px] h-[36px] leading-none ">
            {title}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="
		 absolute rounded-[10px] bg-[#e5f3ff] border-[1px] border-[#488fff] right-0 left-0  top-0 w-auto data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft "
          >
            <ul className="  m-0 t place-items-center grid grid-cols-1 text-[16px] font-semibold r w-[106px] h-[80px]">
              <Link
                className="
						  transition-all duration-200 ease-in-out hover:bg-blue-100 hover:rounded-tr-[10px] hover:rounded-tl-[10px] hover:opacity-70

				text-[#488fff] flex justify-center items-center font-semibold leading-normal 
				border-b h-full text-[16px]  border-[#488fff] w-full text-center"
                to={paths.mypage.root.path}
              >
                <span className="hover:opacity-70">내 프로필</span>
              </Link>
              <button
                onClick={() => logout.mutate({})}
                className="
				
										  transition-all duration-200 ease-in-out hover:bg-blue-100 hover:rounded-br-[10px] hover:rounded-bl-[10px] hover:opacity-70

				w-full h-full cursor-pointer leading-normal text-[#488fff]
 "
                type="button"
              >
                로그아웃
              </button>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="absolute  flex w-full justify-center">
        <NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden  transition-[width,_height] duration-100 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn" />
      </div>
    </NavigationMenu.Root>
  );
};

export default Menu;
