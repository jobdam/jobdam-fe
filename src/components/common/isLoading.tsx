/** @format */

type LoadingVideoProps = {
  width?: number;
  height?: number;
};

const Loading = ({ width = 300, height = 300 }: LoadingVideoProps) => {
  return (
    <div className="fixed inset-0 bg-[gray] opacity-50 flex items-center justify-center z-50">
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center ",
        }}
        className="bg-[#000]"
      >
        <video
          src={"/잡담 로딩 1.mp4"}
          width={width}
          height={height}
          autoPlay
          loop
          muted
          playsInline
          className=" object-contain "
        />
      </div>
    </div>
  );
};
export default Loading;
