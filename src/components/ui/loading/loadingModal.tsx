/** @format */
import "./loadingBar.css";

interface loadingModalProps {
  title: string;
}
const LoadingModal = ({ title }: loadingModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div
          className="w-[600px] h-[400px]
      border-[1px] border-[#d9d9d9] shadow-custom
      bg-white rounded-[20px] pt-[28px] pb-[28px]"
        >
          <div>
            <img src="/loading.svg" alt="통통" className="animate-bounce" />
          </div>
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
        </div>
        <p className="text-center mt-[40px] text-[30px] font-bold">{title}</p>
      </div>
    </>
  );
};

export default LoadingModal;
