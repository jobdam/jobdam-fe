/** @format */

//각종 api 주소가 들어있음.

//getHref = 사용자가 접근하면 안되는곳에 접근할때 redirect 하도록 만드는것.
//예를 들어 로그인을 하지 않는경우 login으로 보내고 쿼리트스링을남겨 로그인한경우
//내가 진입하려고 했던곳으로 보내준다.

export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    root: {
      path: "/auth",
    },
    oauth: {
      path: "/oauth-redirect",
      getHref: (redirectTo?: string | null | undefined) =>
        `/oauth-redirect${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },

    entry: {
      path: "/auth/authEntry",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/authEntry${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },
  interview: {
    main: { path: "/interview", getHref: "/interview" },
    register: {
      path: "/interview/register",
      getHref: "/interview/register",
    },
    matching: { path: "/interview/matching" },
    waiting: {
      path: "/interview/waiting",
    },
  },
  chatroom: {
    main: {
      path: "/chatroom/:roomId",
      getHref: (roomId?: string | number) =>
        roomId != null
          ? `/chatroom/${encodeURIComponent(roomId.toString())}`
          : "/",
    },
  },

  emailverify: {
    error: {
      path: "/verify/error",
    },
    success: {
      path: "/verify/success",
    },
    verifycheck: {
      path: "/verify",
      getHref: (redirectTo?: string | null | undefined) =>
        `/verify${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    already: {
      path: "/verify/already",
    },
    expired: {
      path: "/verify/expired",
    },
  },

  mypage: {
    root: {
      path: "/mypage",
    },
    postdata: {
      path: "/mypage/post-profile",
    },
    editdata: {
      path: "/mypage/edit",
    },
    feedback: {
      path: "/mypage/feedback",
    },
    feedbackdetail: {
      path: "/mypage/feedback/detail",
    },
    resume: {
      path: "/mypage/resume",
    },
  },
  videochat: {
    root: {
      path: "/videoChat",
    },

    main: {
      path: "/videoChat/:roomId",
      getHref: (roomId?: string | number) =>
        roomId != null
          ? `/videoChat/${encodeURIComponent(roomId.toString())}`
          : "/",
    },
  },
};
