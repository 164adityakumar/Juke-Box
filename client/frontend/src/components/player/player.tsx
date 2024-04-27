import { AudioPlayer } from "./audio_player";
import { CurrentSongState } from "./atom";
import { useRecoilState } from "recoil";

export function Player() {
  const [currentSong, setCurrentSong] = useRecoilState<any>(CurrentSongState);

  // Add a null check before accessing the 'image' property
  const imageSrc = currentSong?.image?.[2] || "/cd.png";
 
  return (
    <div style={{background:
      "linear-gradient(132deg, rgba(69, 69, 69, 0.25) 0%, rgba(238, 238, 238, 0.168) 20%, rgba(202, 202, 202, 0.148) 70%, rgba(171, 171, 171, 0.024) 100%)",
    border: "solid rgba(185, 159, 255, 0.06)"
    }} className=" md:px-14 h-full py-3 border-2 border-indigo-300 border-opacity-50 rounded-xl  player"><div className="artwork flex flex-col items-center border border-indigo-400 border-opacity-30">
    <img src={imageSrc} className="cover rounded-full " />

  </div></div>
      
  );
}
