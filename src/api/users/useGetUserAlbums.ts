import { useEffect, useState } from "react";
import { User, getUser } from "./requests";

export function useGetUserAlbums(userId: number) {
  const [user, setUser] = useState<User>();

  useEffect(()=>{
    getUser(userId.toString()).then((data) => setUser(data));
  }, [userId]);

  return user;
}
