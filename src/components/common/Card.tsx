import * as React from "react";
import { styled } from "@mui/material/styles";
import MyCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar, { AvatarClassKey } from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { Link, useNavigate } from "react-router-dom";
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
}: Props) {
  const navigate = useNavigate();
  if (description == undefined) {
    return (
      <MyCard>
        <Link className="card-link" to={`/albums/${albumId}`}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                <PhotoLibraryIcon></PhotoLibraryIcon>
              </Avatar>
            }
            title={title}
          />
        </Link>
        <CardContent sx={{paddingTop: 0}}>
        <Link className="card-link" to={`/user/${userId}`}>
              <Typography variant="caption" color="text.secondary">
                made by: @{userName}
              </Typography>
            </Link>
        </CardContent>
        <CardActions>{children}</CardActions>
      </MyCard>
    );
  } else
    return (
      <MyCard>
        <Link className="card-link" to={`/user/${userId}`}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                <PersonIcon></PersonIcon>
              </Avatar>
            }
            title={name}
            subheader={"@" + userName}
          />
        </Link>
        {image && (
          <CardMedia sx={{ height: 140 }} image={image} title="image" />
        )}
        {/* jesli image to wykonaj to co po && */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
        <CardActions>{children}</CardActions>
      </MyCard>
    );
}
