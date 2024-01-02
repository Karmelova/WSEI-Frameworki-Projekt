import { useEffect, useState } from "react";
import { Albums, getAlbums } from "./requests";

export function useGetAlbums() {
  const [albums, setAlbums] = useState<Albums[]>();
  
  useEffect(()=>{
    getAlbums().then((data) => setAlbums(data));
  }, []);

  return albums;
}
