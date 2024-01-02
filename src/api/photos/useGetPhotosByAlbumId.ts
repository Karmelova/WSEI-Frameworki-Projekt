import { useEffect, useState } from "react";
import { Photos, getPhotosById } from "./requests";

export function useGetPhotosByAlbumId(albumId: string) {
  const [photos, setPhotos] = useState<Photos[]>();

  useEffect(()=> {
    getPhotosById(albumId).then((data) => setPhotos(data));
  }, [albumId]);

  return photos;
}
