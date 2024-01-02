import { useEffect, useState } from "react";
import { Photos, getPhotos } from "./requests";

export function useGetPhotos() {
  const [photos, setPhotos] = useState<Photos[]>();

  useEffect(()=>{
    getPhotos().then((data) => setPhotos(data));
  }, []);

  return photos;
}
