/** @format */

const naverRedirect = import.meta.env.VITE_NAVER_REDIRECT;
const googleRedirect = import.meta.env.VITE_GOOGLE_REDIRECT;
const STATE = "RANDOM_STRING";
const naverClient = import.meta.env.VITE_NAVER_CLIENT;
const googleClient = import.meta.env.VITE_GOOGLE_CLIENT;
export const naverOauth = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClient}&redirect_uri=${naverRedirect}&state=${STATE}`;

export const googleOauth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClient}&response_type=code&redirect_uri=${googleRedirect}&scope=https://www.googleapis.com/auth/userinfo.email&prompt=select_account`;
