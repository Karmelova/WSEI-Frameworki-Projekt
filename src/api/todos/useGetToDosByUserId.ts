import { useEffect, useState } from "react";

import { ToDos, getToDos } from "./requests";

export function useGetToDos(postId: string) {
  const [toDos, setToDos] = useState<ToDos[]>();

  useEffect(()=> {
    getToDos(postId).then((data) => setToDos(data));
  }, [postId]);

  return toDos;
}
