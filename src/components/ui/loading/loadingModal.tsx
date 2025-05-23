/** @format */
import "./loadingBar.css";

interface loadingModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
const LoadingModal = ({ children, onClose }: loadingModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div
          className="relative w-[600px] h-[400px] flex flex-col items-center
      border-[1px] border-[#d9d9d9] shadow-custom
      bg-white rounded-[20px] pt-[28px] pb-[28px]"
        >
          <button
            className="absolute right-6 top-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold"
            onClick={onClose}
          >
            닫기
          </button>
          <video
            src={"/잡담 로딩 1.mp4"}
            width={"234px"}
            height={"131px"}
            autoPlay
            loop
            muted
            playsInline
            className=" object-contain mt-[45px] mb-[10px]"
          />
          <div className="relative w-full h-[13px] bg-gradient-to-r from-white via-gray-200 to-gray-300 overflow-hidden">
            <div
              className="absolute top-0 h-full w-4/5"
              style={{
                left: 0,
                animation: "loading-bar-shimmer 2s linear infinite",
                background:
                  "linear-gradient(90deg, rgba(72,143,255,0) 0%, #488FFF 50%, rgba(72,143,255,0) 100%)",
              }}
            />
          </div>
          <div className="text-center mt-[60px] text-[16px] font-bold">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingModal;
