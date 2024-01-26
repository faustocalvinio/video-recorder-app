import { useState } from "react";
import { IoPlayCircleSharp, IoStopSharp } from "react-icons/io5";

const App = () => {
  const [fileName, setFileName] = useState("");
  const [audioOption, setAudioOption] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  async function recordVideoHandler() {
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
      setIsPlaying(false);
      mediarecorder.stop();
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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const fileName = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
    setFileName(fileName);
  }

  //   useEffect(() => {
  //   }, [audioOption]);

  return (
    <div className="flex aspect-square w-fit min-w-[400px] flex-col justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2">
      <h1>Video recorderer</h1>
      <h2>Format</h2>
      <select
        name=""
        id=""
        className="border border-white bg-transparent p-2 text-white"
      >
        <option value="">webm</option>
        <option value="">mp4</option>
      </select>
      <h2>Want audio?</h2>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          className="peer sr-only"
          checked={audioOption}
          onChange={() => setAudioOption(!audioOption)}
        />
        <div className="group peer h-12 w-24  rounded-full bg-red-600 shadow-md outline-none ring-0 duration-300  after:absolute after:left-1  after:top-1  after:flex  after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-gray-50 after:outline-none after:duration-300 after:content-['✖️'] peer-checked:bg-emerald-500 peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-focus:outline-none"></div>
      </label>
      <h2>Filename:</h2>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="border border-white bg-transparent p-2 text-white"
        placeholder="File name"
      />
      <button onClick={onSetHourFile} type="button">
        set date and hour
      </button>
      {isPlaying ? (
        <IoStopSharp
          size={200}
          color="red"
          onClick={() => {}}
          className="cursor-pointer transition-all hover:scale-110"
        />
      ) : (
        <IoPlayCircleSharp
          size={200}
          color="red"
          onClick={recordVideoHandler}
          className="cursor-pointer transition-all hover:scale-110"
        />
      )}
    </div>
  );
};

export default App;
