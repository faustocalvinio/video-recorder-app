import { useState } from "react";
import { getDateAsString } from "../helpers/getDateAsString";

export const useVideo = () => {
  const [fileName, setFileName] = useState("");
  const [audioOption, setAudioOption] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  async function recordVideoHandler() {
    const stopBtn = document.getElementById("stop-btn");
    const media = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 } },
      audio: audioOption,
    });
    const mediarecorder = new MediaRecorder(media, {
      mimeType: "video/webm;codecs=vp8,opus",
    });

    mediarecorder.start();
    setIsPlaying(true);
    const [video] = media.getVideoTracks();
    video.addEventListener("ended", () => {
      console.log("ended event success");

      setIsPlaying(false);
      mediarecorder.stop();
    });
    console.log(stopBtn);

    stopBtn?.addEventListener("click", () => {
      console.log("must stop");

      setIsPlaying(false);
      mediarecorder.stop();
      video.dispatchEvent(new Event("ended"));
    });

    mediarecorder.addEventListener("dataavailable", (e) => {
      console.log(e);
      setIsPlaying(false);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(e.data);
      link.download = `${fileName === "" ? `capture-${getDateAsString()}` : fileName}.webm`;
      link.click();
    });
  }

  return {
    fileName,
    setFileName,
    audioOption,
    setAudioOption,
    isPlaying,
    setIsPlaying,
    recordVideoHandler,
  };
};
