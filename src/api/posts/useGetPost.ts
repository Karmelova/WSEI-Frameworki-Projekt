import { useEffect, useState } from "react";
import { Post, getPost } from "./requests";

export function useGetPost(postId: string) {
  const [post, setPost] = useState<Post>();

  useEffect(()=>{
    getPost(postId).then((data) => setPost(data));
  }, [postId]);

  return post;
}
