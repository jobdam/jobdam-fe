/** @format */

import ProfileCard from "./components/profilecard";

//role을 정해서

const InterviewMatchingWaiting = () => {
  //role을 나눠서 guest는 아래쪽에, me는 보기쉽게 위쪽에 배치
  return (
    <div className="flex flex-col items-center gap-y-8 p-8 bg-gray-100 min-h-screen">
      {/* 내 프로필 (위쪽) */}
      <div className="text-center">
        <h2 className="text-lg font-bold mb-2">내 프로필</h2>
        <ProfileCard name="나" role="면접자" image="/me.jpg" />
      </div>

      {/* 나머지 사람들 프로필 (아래쪽) */}
      <div className="flex flex-row items-center gap-y-6">
        <ProfileCard
          name="오태식"
          role="UX/UI 디자이너 지원"
          image="/user1.jpg"
        />
        <ProfileCard
          name="김진남"
          role="UX/UI 디자이너 지원"
          image="/user2.jpg"
        />
        <ProfileCard
          name="임한식"
          role="UX/UI 디자이너 지원"
          image="/user3.jpg"
        />
      </div>
    </div>
  );
};
export default InterviewMatchingWaiting;

{
  /* {data.map((el) => {
        //여기 me일때는 위에 존재하고 아래 guest일때는 아래로 나누는 방법
        if (el.role === "me") {
          return (
            <div className="text-center">
              <div key={el.id}>
                <div>{el.profile}</div>
              </div>
              <div>
                <div>{el.name}</div>
                <div>{el.job}</div>
                <div>이력서 요약 보기</div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex flex-row gap-y-6">
              <div className="grid grid-cols-3" key={el.id}>
                <div>
                  <div>{el.profile}</div>
                </div>
                <div>
                  <div>{el.name}</div>
                  <div>{el.job}</div>
                  <div>이력서 요약 보기</div>
                </div>
              </div>
            </div>
          );
        }
      })} */
}
