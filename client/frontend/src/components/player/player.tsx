import { AudioPlayer } from "./audio_player";
import { CurrentSongState } from "./atom";
import { useRecoilState } from "recoil";

export function Player() {
  const [currentSong, setCurrentSong] = useRecoilState<any>(CurrentSongState);

  // Add a null check before accessing the 'image' property
  const imageSrc = currentSong?.image?.[2] || "";
 
  return (
    <div className=" md:px-14 "><div className="artwork flex flex-col items-center border border-indigo-400 border-opacity-30">
    <img src={imageSrc} className="cover rounded-full " />

  </div></div>
      
  );
}
