import * as React from "react";
import MyCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import Typography from "@mui/material/Typography";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import { Link} from "react-router-dom";
import { Button } from "@mui/material";
import "./Card.css";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  statuses?: boolean;
  children?: React.ReactNode;
  userId?: number;
  name?: string;
  userName?: string;
  albumId?: number;
  website?: string;
  companyName?: string;
  email?: string;
  postId?: number;
  photoId?: number;
}

function stringAvatar(name: string) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export function Card({
  description,
  title,
  image,
  children,
  userId,
  name,
  userName,
  albumId,
  email,
  companyName,
  website,
  postId,
  photoId,
}: Props) {
  const loggedInUserId = localStorage.getItem("userId");
  const isCurrentUser = () => {
    return loggedInUserId === userId?.toString();
  };

  async function onDelete(id: number, type: string) {
    try {
      if (type === "post") {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: "DELETE",
        });
      } else if (type === "album") {
        await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
          method: "DELETE",
        });
      } else if (type === "photo") {
        await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
          method: "DELETE",
        });
      }
      const postElement = document.getElementById(`post${id}`);
      const albumElement = document.getElementById(`album${id}`);
      const photoElement = document.getElementById(`photo${id}`);
      if (postElement) {
        postElement.classList.add("hidden");
      }
      if (albumElement) {
        albumElement.classList.add("hidden");
      }
      if (photoElement) {
        photoElement.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  if (userId === undefined && description) {
    return (
      <MyCard sx={{ boxShadow: 22 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {email}:
          </Typography>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="caption">{description}</Typography>
        </CardContent>
      </MyCard>
    );
  }
  if (description === undefined && !email) {
    return (
      <MyCard
        sx={{ boxShadow: 22 }}
        id={`album${albumId !== undefined ? albumId : "undefined"}`}
      >
        <Link className="card-link" to={`/albums/${albumId}`}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                <PhotoAlbumIcon></PhotoAlbumIcon>
              </Avatar>
            }
            title={title}
          />
        </Link>
        <CardContent sx={{ paddingTop: 0 }} className="madeby">
          <Link className="card-link" to={`/user/${userId}`}>
            <Typography variant="caption" color="text.secondary">
              made by: @{userName}
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          {isCurrentUser() && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => onDelete(Number(albumId), "album")}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </MyCard>
    );
  }
  if (description === undefined) {
    return (
      <MyCard sx={{ boxShadow: 22 }}>
        <Link className="card-link" to={`/user/${userId}`}>
          <CardHeader
            avatar={
              <Avatar
                {...stringAvatar(name ? name : "N A")}
                aria-label="recipe"
              ></Avatar>
            }
            title={name}
            subheader={"@" + userName}
          />
        </Link>
        <CardContent>
          {email && (
            <Link className="card-link" to={`/user/${userId}`}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <EmailOutlinedIcon />
                {email}
              </Typography>
            </Link>
          )}
          {companyName && (
            <Link className="card-link" to={`/user/${userId}`}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <BusinessIcon />
                {companyName}
              </Typography>
            </Link>
          )}
          {website && (
            <a
              className="card-link"
              href={"https://www." + website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <LanguageIcon />
                {website}
              </Typography>
            </a>
          )}
        </CardContent>
        <CardActions>{children}</CardActions>
      </MyCard>
    );
  } else
    return (
      <MyCard
        sx={{ boxShadow: 22, display: "flex", flexDirection: "column" }}
        id={
          postId !== undefined
            ? String("post" + postId)
            : String("photo" + photoId)
        }
      >
        <Link className="card-link" to={`/user/${userId}`}>
          <CardHeader
            avatar={
              <Avatar
                {...stringAvatar(name ? name : "N A")}
                aria-label="recipe"
              ></Avatar>
            }
            title={name}
            subheader={"@" + userName}
          />
        </Link>
        {image && (
          <a
            className="card-link"
            href={image}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CardMedia sx={{ height: 140 }} image={image} title="image" />
          </a>
        )}
        {/* jesli image to wykonaj to co po && */}
        <CardContent sx={{ alignItems: "strech", flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            height: 30,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {postId !== undefined && (
            <Button
              size="small"
              component={Link}
              to={`/posts/${postId}`}
              color="secondary"
            >
              Comments
            </Button>
          )}
          {isCurrentUser() && (
            <Button
              variant="outlined"
              size="small"
              onClick={() =>
                onDelete(
                  photoId ? Number(photoId) : Number(postId),
                  photoId ? "photo" : "post"
                )
              }
            >
              Delete
            </Button>
          )}
        </CardActions>
      </MyCard>
    );
}
