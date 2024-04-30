import { AudioPlayer } from "./audio_player";
import { CurrentSongState } from "./atom";
import { useRecoilState } from "recoil";

export function Player() {
  const [currentSong, setCurrentSong] = useRecoilState<any>(CurrentSongState);


  return (
    <div 
    // style={{
    //   background: "linear-gradient(132deg, rgba(69, 69, 69, 0.25) 0%, rgba(238, 238, 238, 0.168) 20%, rgba(202, 202, 202, 0.148) 70%, rgba(171, 171, 171, 0.024) 100%)",
    //   border: "solid rgba(185, 159, 255, 0.06)"
    // }} 
    className=" ">
      {/* <div className="flex flex-col items-center p-2 ">
        {currentSong?.image?.[2] ? (
          <img src={currentSong?.image?.[2]} className=" rounded-full border-2 border-indigo-300 border-opacity-30 w-[88%]" />
        ) : (
          <img src="/cd.png" className=" rounded-full border-2 border-indigo-300 border-opacity-30 w-[7%]" />
        )}
      </div> */}
      <div className="flex flex-row justify-center items-center h-[81vh] w-[80vh] scale-[0.85] pb-20 artwork ">
      {currentSong?.image?.[2] ? (
          <img src={currentSong?.image?.[2]} className=" rounded-full border-2 border-[#98989844] border-opacity-30  cover" />
        ) : (
          <img src="/vinyl-record.png" className=" rounded-full border-2 border-[#9898982d] border-opacity-30 cover opacity-70" />
        )}
      </div>
    </div>
  );
}
