/** @format */

import { useSpeakingDetection } from "@/services/webSockect/videoChat/useSpeakingDetection";

export const SpeakingIndicator = ({
  stream,
}: {
  stream: MediaStream | null;
}) => {
  const isSpeaking = useSpeakingDetection(stream);
  return (
    <span className="absolute top-2 right-3 z-50 text-xl">
      {isSpeaking && (
        <span className="inline-block w-3 h-3 rounded-full bg-green-500 shadow" />
      )}
    </span>
  );
};
