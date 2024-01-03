import { useGetAlbums } from "../../api/albums/useGetAlbums";
import { useGetUsers } from "../../api/users/useGetUsers";
import { Card } from "../common/Card";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import "./Posts.css";


export default function Posts() {
  const albums = useGetAlbums();
  const users = useGetUsers();
  const navigate = useNavigate();


  
  if (!albums) {
    return (
        <Box style={{display:"flex", justifyContent:"center", alignItems: "center"}}>
          <CircularProgress color="secondary" />
        </Box>
      );
  }
  
  async function onDelete(id: number) {
    await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  }
  return (
    <div className="posts">
      {albums.map((album) =>{
        const user = users?.find(user => Number(user.id) === Number(album.userId));
        return(
        <Card
          title={album.title}
          albumId={album.id}
          userId={album.userId}
          name={user?.name}
          userName={user?.username}
        >
        </Card>
      )})}
    </div>
  );
}
