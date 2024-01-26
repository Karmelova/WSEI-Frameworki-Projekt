import { useParams } from "react-router-dom";
import { useGetPhotosByAlbumId } from "../../api/photos/useGetPhotosByAlbumId";
import { Card } from "../common/Card";
import { useGetUser } from "../../api/users/useGetUser";
import { useGetAlbumById } from "../../api/albums/useGetAlbumById";
import { Box, CircularProgress } from "@mui/material";
import "./Posts.css";

export default function PhotosByAlbumId() {
  const { id }= useParams();
  const photos = useGetPhotosByAlbumId(id || "");
  const albumId = (photos && photos.length > 0 ? photos[0].albumId : '');
  const album = useGetAlbumById(String(albumId));
  const userId = ((album ? album.id : ''))
  const user = useGetUser(String(userId));


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

  if(photos[0]) return (
    <div className="posts">
      {photos.map((photo) => {
        return (
          <Card
            title={photo.title}
            userId={album?.userId}
            name={user?.name}
            userName={user?.username}
            description=""
            image={photo.url}
            photoId={photo.id}
          ></Card>
        );
      })}
    </div>
  );
  else return(
    <div> 
      This album does not contain any photos yet
    </div>
  )
}
