type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string; // 퇴장할게요 (기본값 제공 가능)
  cancelText?: string; // 계속 참여할게요 (기본값 제공 가능)
};

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  confirmText = "퇴장할게요",
  cancelText = "계속 참여할게요",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[600px] text-center">
        <img
          src="/exclamation mark.svg"
          alt="느낌표 아이콘"
          className="w-25 h-25 mx-auto mt-8 mb-8"
        />

        {/* 메시지 */}
        <p className="text-lg font-semibold mb-1">정말 나가시겠어요?</p>
        <p className="text-sm text-gray-600 mb-20">
          지금 나가면 이 모의면접에는 참여할 수 없어요.
        </p>

        {/* 버튼 */}
        <div className="flex justify-center gap-8">
          <button
            onClick={onCancel}
            className="bg-[#488FFF] text-white font-semibold px-18 py-3 rounded-md hover:bg-blue-500"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#CFCFCF] text-white font-semibold px-14 py-3 rounded-md hover:bg-gray-400"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
