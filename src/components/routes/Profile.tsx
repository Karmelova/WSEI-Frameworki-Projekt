import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet, useParams } from "react-router-dom";
import { useGetUser } from "../../api/users/useGetUser";
import { Button, CircularProgress, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { Card } from "../common/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import { useGetUserAlbums } from "../../api/users/useGetUserAlbums";
import "./Profile.css";

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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const user = useGetUser(id || "");
  const albums = useGetUserAlbums(id || "");

  if (!user) {
    return <CircularProgress color="secondary" />;
  }

  if (user.id)
    return (
      <Grid
        container
        spacing={2}
        sx={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 10,
          padding: 2,
          marginLeft: "-8px",
        }}
      >
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            {...stringAvatar(user.name)}
            sx={{
              height: 250,
              width: 250,
              marginBottom: 5,
              alignSelf: "center",
            }}
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
              {user.address.zipcode + "/" + user.address.city}
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
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab icon={<ArticleIcon />} label="POSTS" {...a11yProps(0)} />
            <Tab icon={<PhotoAlbumIcon />} label="ALBUMS" {...a11yProps(1)} />
            <Tab icon={<PhotoLibraryIcon />} label="PHOTOS" {...a11yProps(2)} />
          </Tabs>
          <Box>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              {albums && (
                <div className="profile-cards">
                  {albums.map((album) => {
                    return (
                      <Card
                        title={album.title}
                        albumId={album.id}
                        userId={album.userId}
                        name={user?.name}
                        userName={user?.username}
                      ></Card>
                    );
                  })}
                </div>
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    );
  else return <div> There is no such user</div>;
}
