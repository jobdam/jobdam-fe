/** @format */

// 하이픈 자동 삽입 함수
export const formatBirthday = (value: string) => {
  // 숫자만 추출
  const digitsOnly = value.replace(/\D/g, "");

  // yyyy-mm-dd 형식으로 자르기
  const year = digitsOnly.slice(0, 4);
  const month = digitsOnly.slice(4, 6);
  const day = digitsOnly.slice(6, 8);

  let result = year;
  if (month) result += `-${month}`;
  if (day) result += `-${day}`;

  return result;
};

export const randomImageUrl = "https://picsum.photos/200/300";
async function fetchImageAsFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url); // 이미지 URL을 fetch로 요청
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const blob = await response.blob(); // 응답을 Blob으로 변환
  return new File([blob], filename, { type: blob.type }); // Blob을 File 객체로 변환
}

// async 함수 내에서 await 사용
export async function fetchAndLogImage() {
  try {
    const randomImageUrl = "https://picsum.photos/200/300"; // 예시 이미지 URL
    const file = await fetchImageAsFile(randomImageUrl, "image1.jpg");
    console.log(file);
    return file;
  } catch (error) {
    console.error("Error fetching image:", error); // 에러 처리
  }
}
