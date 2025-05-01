const kakaoRedirect = import.meta.env.VITE_KAKAO_REDIRECT 
const googleRedirect = import.meta.env.VITE_GOOGLE_REDIRECT

export const kakaoOauth = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

 

export const googleOauth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT}&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email&prompt=select_account`;