type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string; // 퇴장할게요 (기본값 제공 가능)
  cancelText?: string; // 계속 참여할게요 (기본값 제공 가능)
  children?: React.ReactNode;
};

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  confirmText = "퇴장할게요",
  cancelText = "계속 참여할게요",
  children,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[600px] text-center">
        {children}
        {/* 버튼 */}
        <div className="flex justify-center gap-8">
          <button
            onClick={onCancel}
            className="bg-[#488FFF] text-white font-semibold px-18 py-3 rounded-md hover:bg-blue-500"
          >
            {cancelText
              .split("\n")
              .map((line, idx) =>
                idx === 0 ? line : [<br key={idx} />, line]
              )}
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#CFCFCF] text-white font-semibold px-14 py-3 rounded-md hover:bg-gray-400"
          >
            {confirmText
              .split("\n")
              .map((line, idx) =>
                idx === 0 ? line : [<br key={idx} />, line]
              )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
