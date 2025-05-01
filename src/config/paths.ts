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
    register: {
      path: "/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    login: {
      path: "/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },

    entry: {
      path: "/authEntry",
      getHref: (redirectTo?: string | null | undefined) =>
        `/authEntry${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    TermsAgreement: {
      path: "/termsAgreement",
    },
  },
  interview: {
    register: {
      path: "interview/register",
      getHref: "interview/register",
    },
    matching: { path: "interview/matching" },
    waiting: {
      path: "interview/waiting",
    },
  },
  chatroom: {
    main: {
      path: "/chatroom",
    },
  },

  emailverify: {
    pending: {
      path: "verify-email-pending",
    },
    verifycheck: {
      path: "verify-email-check",
    },
  },

  mypage: {
    postdata: {
      path: "post-profile",
    },
    editdata: {
      path: "",
    },
  },
};
