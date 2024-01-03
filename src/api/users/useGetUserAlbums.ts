import { useEffect, useState } from "react";
import { User, getUser } from "./requests";

export function useGetUserAlbums(userId: string) {
  const [user, setUser] = useState<User>();

  useEffect(()=>{
    getUser(userId).then((data) => setUser(data));
  }, [userId]);

  return user;
}
