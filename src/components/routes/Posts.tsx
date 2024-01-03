import { useGetPosts } from "../../api/posts/useGetPosts";
import { Card } from "../common/Card";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import "./Posts.css";


export default function Posts() {
  const posts = useGetPosts();
  const navigate = useNavigate();


  
  if (!posts) {
    return <CircularProgress color="secondary" />;
  }
  
  async function onDelete(id: number) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  }
  return (
    <div className="posts">
      {posts.map((post) =>{
        return(
        <Card
          description={post.body}
          title={post.title}
          key={post.id}
          userId={post.userId}
        >
        </Card>
      )})}
    </div>
  );
}
