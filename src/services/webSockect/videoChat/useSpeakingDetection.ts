/** @format */

import { useEffect, useState } from "react";
//소리체크해서 말하는거 확인해주는 훅
export function useSpeakingDetection(
  stream: MediaStream | null,
  threshold = 0.03
) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!stream) return;
    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) return;

    const audioContext = new window.AudioContext();
    const mediaStreamSource = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    mediaStreamSource.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);

    let speaking = false;
    let rafId: number;

    const checkSpeaking = () => {
      analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const normalized = (dataArray[i] - 128) / 128;
        sum += normalized * normalized;
      }
      const rms = Math.sqrt(sum / dataArray.length);

      if (rms > threshold) {
        if (!speaking) {
          speaking = true;
          setIsSpeaking(true);
        }
      } else {
        if (speaking) {
          speaking = false;
          setIsSpeaking(false);
        }
      }
      rafId = requestAnimationFrame(checkSpeaking);
    };
    checkSpeaking();

    return () => {
      cancelAnimationFrame(rafId);
      audioContext.close();
    };
  }, [stream, threshold]);

  return isSpeaking;
}
