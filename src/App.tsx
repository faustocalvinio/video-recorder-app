import { useEffect, useState } from "react";
import { IoPlayCircleSharp, IoStopCircleSharp } from "react-icons/io5";

const getDateAsString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const fileName = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  return fileName;
};

const App = () => {
  const [fileName, setFileName] = useState("");
  const [audioOption, setAudioOption] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  async function recordVideoHandler() {
    const stopBtn = document.getElementById("stop-btn");
    const media = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 60 } },
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
      link.download = `${fileName === "" ? "capture" : fileName}.webm`;
      link.click();
    });
  }

  function onSetHourFile() {
    const fileName = getDateAsString();
    setFileName(fileName);
  }
  useEffect(() => {
    // console.log(navigator.mediaDevices);
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl text-white">Web Video Recorder</h1>
      <main className="flex aspect-square w-fit min-w-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-purple-950 bg-gray-900 px-4 py-2 text-white">
        <h2>Want audio?</h2>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            checked={audioOption}
            onChange={() => setAudioOption(!audioOption)}
            disabled={isPlaying}
          />
          <div className="group peer h-12 w-24  rounded-full bg-red-600 shadow-md outline-none ring-0 duration-300  after:absolute after:left-1  after:top-1  after:flex  after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-gray-50 after:outline-none after:duration-300 after:content-['✖️'] peer-checked:bg-emerald-500 peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-focus:outline-none"></div>
        </label>
        <h2>Filename:</h2>
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full flex-grow rounded-xl border border-white bg-transparent p-2 text-white"
            placeholder="File name"
          />
          <button
            onClick={() => setFileName("")}
            className="rounded-xl bg-gray-700 px-4 py-2 transition-all hover:bg-gray-600"
            disabled={isPlaying}
          >
            Clear
          </button>
        </div>
        <button
          onClick={onSetHourFile}
          type="button"
          className="w-full rounded-xl bg-blue-900 px-4 py-2 transition-all hover:bg-blue-800"
          disabled={isPlaying}
        >
          Set date and hour as filename
        </button>

        <IoStopCircleSharp
          size={130}
          id="stop-btn"
          color="#9194ff"
          className={`${!isPlaying ? "h-0 w-0" : "cursor-pointer transition-all hover:scale-105"}`}
        />

        <IoPlayCircleSharp
          size={130}
          color="#9194ff"
          onClick={recordVideoHandler}
          className={`${isPlaying ? "h-0 w-0" : "cursor-pointer transition-all hover:scale-105"}`}
        />
      </main>
    </>
  );
};

export default App;
