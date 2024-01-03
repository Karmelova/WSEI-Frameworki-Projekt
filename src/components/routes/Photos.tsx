import { useGetPhotos } from "../../api/photos/UserGetPhotos";
import { useGetUsers } from "../../api/users/useGetUsers";
import { Card } from "../common/Card";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import "./Posts.css";


export default function Posts() {
  const photos = useGetPhotos();
  const users = useGetUsers();
  const navigate = useNavigate();


  
  if (!photos) {
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
      {photos.map((photos) =>{
        return(
        <Card
          title={photos.title}
          key={photos.id}

        >
        </Card>
      )})}
    </div>
  );
}
