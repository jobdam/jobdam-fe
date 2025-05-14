/** @format */
interface SystemMessageProps {
  content: string;
}
const SystemMessage = ({ content }: SystemMessageProps) => {
  return (
    <div className="text-center my-4 text-xs text-gray-500">{content}</div>
  );
};

export default SystemMessage;
