import { useEffect, useState } from "react";
import { Photos, getPhoto } from "./requests";

export function useGetPhoto(id: string) {
  const [photo, setPhoto] = useState<Photos>();

  useEffect(()=>{
    getPhoto(id).then((data) => setPhoto(data));
  }, [id]);

  return photo;
}
