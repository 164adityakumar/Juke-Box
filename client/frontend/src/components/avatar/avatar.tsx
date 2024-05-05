import { useMemo } from "react";
import { createAvatar } from '@dicebear/core';
import { username } from './atom';
import { useRecoilState } from 'recoil';

import { micah, adventurerNeutral, avataaarsNeutral, bigEarsNeutral, botttsNeutral, loreleiNeutral, notionistsNeutral, pixelArt, pixelArtNeutral, adventurer,avataaars,bigEars,bottts,lorelei,notionists,identicon } from '@dicebear/collection';

const styles: { [key: string]: any } = {micah, adventurerNeutral, avataaarsNeutral, bigEarsNeutral, botttsNeutral, loreleiNeutral, notionistsNeutral, pixelArt, pixelArtNeutral, adventurer,avataaars,bigEars,bottts,lorelei,notionists,identicon
};

export const Avatar = () => {
  const [Username] = useRecoilState(username);

  const randomStyle = Object.keys(styles)[Math.floor(Math.random() * Object.keys(styles).length)];
  const avatar = useMemo(() => {
    return createAvatar(styles[randomStyle], {
      seed: Username,
      width: 100,
      height: 100,
    }).toDataUriSync();
  }, [Username]);

  return  <img src={avatar} alt="Avatar"  className="w-20 h-20 rounded-md "/>
  ;
};
