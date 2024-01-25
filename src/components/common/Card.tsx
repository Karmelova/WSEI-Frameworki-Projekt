import * as React from "react";
import { styled } from "@mui/material/styles";
import MyCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import Typography from "@mui/material/Typography";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import { Link, useNavigate } from "react-router-dom";
import "./Card.css";
import { Button } from "@mui/material";

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
  key?: number;
  postId?: number;
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
  key,
  postId,
}: Props) {
  const navigate = useNavigate();
  if (userId == undefined && description) {
    return (
      <MyCard sx={{ boxShadow: 22 }}>
        <CardContent>
        <Typography variant="subtitle1" sx={{fontWeight: "bold"}}>
            {email}:
          </Typography>
          <Typography variant="subtitle2" >
            {title}
          </Typography>
          <Typography variant="caption">
            {description}
          </Typography>
        </CardContent>
      </MyCard>
    );
  }
  if (description == undefined && !email) {
    return (
      <MyCard sx={{ boxShadow: 22 }}>
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
        <CardActions>{children}</CardActions>
      </MyCard>
    );
  }
  if (description == undefined) {
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
      <MyCard sx={{ boxShadow: 22, display: "flex", flexDirection: "column" }}>
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
        <CardActions sx={{ height: 30 }}>
          {postId != undefined && (
            <Button
              size="small"
              component={Link}
              to={`/posts/${postId}`}
              color="secondary"
            >
              Comments
            </Button>
          )}
        </CardActions>
      </MyCard>
    );
}
