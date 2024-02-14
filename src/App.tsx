import { IoPlayCircleSharp, IoStopCircleSharp } from "react-icons/io5";
import { getDateAsString } from "./helpers/getDateAsString";
import { useVideo } from "./hooks/useVideo";

const App = () => {
  const {
    audioOption,
    fileName,
    isPlaying,
    recordVideoHandler,
    setAudioOption,
    setFileName,
  } = useVideo();

  function onSetHourFile() {
    const fileName = getDateAsString();
    setFileName(fileName);
  }

  return (
    <>
      <main className="flex aspect-square w-fit min-w-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-purple-950 bg-gray-900 px-10 py-2 text-white">
        <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
            Video Recorder
          </span>{" "}
          App
        </h1>
        {/* <p class="text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p> */}

        <h2 className="text-2xl">Want audio?</h2>
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
        <h2 className="text-2xl">Filename:</h2>
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full flex-grow rounded-xl border border-white bg-transparent p-2 text-xl text-white"
            placeholder="File name"
          />
          <button
            onClick={() => setFileName("")}
            className="rounded-xl bg-gray-700 px-4 py-2 text-xl transition-all hover:bg-gray-600"
            disabled={isPlaying}
          >
            Clear
          </button>
        </div>
        <button
          onClick={onSetHourFile}
          type="button"
          className="w-full rounded-xl bg-blue-900 px-4 py-2 text-xl transition-all hover:bg-blue-800"
          disabled={isPlaying}
        >
          Set date and hour as filename
        </button>

        <IoStopCircleSharp
          size={200}
          id="stop-btn"
          color="#9194ff"
          className={`${!isPlaying ? "h-0 w-0" : "cursor-pointer transition-all hover:scale-105"}`}
        />

        <IoPlayCircleSharp
          size={200}
          color="#9194ff"
          onClick={recordVideoHandler}
          className={`${isPlaying ? "h-0 w-0" : "cursor-pointer transition-all hover:scale-105"}`}
        />
      </main>
    </>
  );
};

export default App;
