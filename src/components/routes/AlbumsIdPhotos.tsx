import { useParams } from "react-router-dom";
import { useGetPhotosByAlbumId } from "../../api/photos/useGetPhotosByAlbumId";
import { Card } from "../common/Card";
import { useGetUser } from "../../api/users/useGetUser";
import { useGetAlbumById } from "../../api/albums/useGetAlbumById";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import "./Posts.css";

export default function PhotosByAlbumId() {
  const { id }= useParams();
  const photos = useGetPhotosByAlbumId(id || "");
  const albumId = (photos && photos.length > 0 ? photos[0].albumId : '');
  const album = useGetAlbumById(String(albumId));
  const userId = ((album ? album.id : ''))
  const user = useGetUser(String(userId));

  const navigate = useNavigate();

  if (!photos) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  async function onDelete(id: number) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  }
  return (
    <div className="posts">
      {photos.map((photo) => {
        return (
          <Card
            title={photo.title}
            key={photo.id}
            userId={album?.userId}
            name={user?.name}
            userName={user?.username}
          ></Card>
        );
      })}
    </div>
  );
}
