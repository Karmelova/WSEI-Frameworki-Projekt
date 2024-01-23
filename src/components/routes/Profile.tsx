import { Link, Outlet, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useGetUser } from "../../api/users/useGetUser";
import { Button, CircularProgress, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

function stringAvatar(name: string) {
  return {
    children: (
      <span style={{ fontSize: "8rem" }}>
        {`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
      </span>
    ),
    textAlign: "center",
  };
}

export default function Profile() {
  const { id } = useParams();
  const user = useGetUser(id || "");

  if (!user) {
    return <CircularProgress color="secondary" />;
  }

  if (user.id)
    return (
      <Grid container spacing={2} sx={{background: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: 10, padding: 2, marginLeft: "-8px"}}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            
          }}
        >
          <Avatar
            {...stringAvatar(user.name)}
            sx={{ height: 250, width: 250, marginBottom: 5 }}
            aria-label="recipe"
          />
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h6" gutterBottom>
            @{user.username}
          </Typography>
          {user.email && (
            <Typography
              variant="body2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EmailOutlinedIcon />
              {user.email}
            </Typography>
          )}
          {user.address.city && (
            <Typography
              variant="body2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <PlaceOutlinedIcon />
              {user.address.zipcode+"/"+ user.address.city}
            </Typography>
          )}
          {user.company.name && (
            <Typography
              variant="body2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <BusinessIcon />
              {user.company.name}
            </Typography>
          )}
          
          {user.website && (
            <a
              className="card-link"
              href={"https://www." + user.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                variant="body2"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <LanguageIcon />
                {user.website}
              </Typography>
            </a>
          )}
        </Grid>
        <Grid item xs={12} md={9}></Grid>
      </Grid>
    );
  else return <div> There is no such user</div>;
}
