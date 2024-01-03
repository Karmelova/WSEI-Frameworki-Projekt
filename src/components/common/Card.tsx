import * as React from 'react';
import { styled } from '@mui/material/styles';
import MyCard from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar, { AvatarClassKey } from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useGetUser } from "../../api/users/useGetUser";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  statuses?: boolean;
  children?: React.ReactNode;
  userId: number;
}

export function Card({ description, title, image, children, userId }: Props) {

  const user = useGetUser(userId.toString());
  return (
    <MyCard sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={user?.name}
        subheader={user ? `@${user.username}` : ""}
      />
      {image && <CardMedia sx={{ height: 140 }} image={image} title="image" />}
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
