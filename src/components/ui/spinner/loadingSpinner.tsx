/** @format */

/** @format */

const InterviewSpinner = () => {
  return (
    <div>
      <img
        src={"/unscreen.gif"}
        width={"460px"}
        height={"260spx"}
        className="  z-[40] aspect-[234/131];"
      />
    </div>
  );
};

const LoadingGradient = () => {
  return (
    <div className="fixed inset-0 bg-gray-200 opacity-90 flex flex-col justify-center items-center z-[100]">
      <InterviewSpinner />
      <div
        className="w-[50vw] h-4 rounded-[10px] mt-4"
        style={{
          background:
            "linear-gradient(90deg, #FFF 0%, #488FFF 29.81%, #BFBFBF 62.98%, #999 100%)",
          backgroundSize: "400% 100%",
          animation: "gradientMove 16s linear infinite",
        }}
      />
      <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 400% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingGradient;
