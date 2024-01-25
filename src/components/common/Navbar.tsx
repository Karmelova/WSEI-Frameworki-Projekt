import * as React from "react";
import { ReactSVG } from "react-svg";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { useGetUsers } from "../../api/users/useGetUsers";
import { useGetPhoto } from "../../api/photos/UserGetPhoto";
import "./Navbar.css";
import { useGetAlbumById } from "../../api/albums/useGetAlbumById";
import { Link, useNavigate } from "react-router-dom";

const pages: string[] = ["Posts", "Albums", "Users"];
const settings: string[] = ["Profile", "Logout"];

const CustomTypography = styled(Typography)`
  font-family: "Olga-Regular", sans-serif;
  font-weight: 700;
  letter-spacing: 0.3rem;
  color: inherit;
  text-decoration: none;
  font-size: 1.5rem;
` as typeof Typography;
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

function Navbar() {
  const isUserLoggedIn = {
    userId: localStorage.getItem("userId"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear localStorage data
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    console.log("dane usunięto");

    // Redirect to the login page or any other appropriate page
    navigate("/Login");
  };
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null);
    if (pages.includes(page)) {
      window.location.href = `/${page}`;
    }
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    if (setting == "Profile") {
      window.location.href = `/user/${localStorage.getItem("userId")}`;
    } else if (setting == "Logout") {
      handleLogout();
      window.location.href = `/Login`;
    }
  };
  const handleOpenSearchResults = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setIsSearchFocused(true);
  };
  const handleGetSearchResults = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  function SearchResultsHandler() {
    const userSearch = useGetUsers();
    const photoSearch = useGetPhoto(searchText);
    const matchingPhoto = photoSearch?.id;
    const albumSearch = useGetAlbumById(searchText);
    const matchingAlbum = albumSearch?.id;
    const matchingUsers = userSearch?.filter((user) =>
      user.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
    console.log(matchingUsers);

    if (searchText.length == 0) {
      return <div className="search-results"></div>;
    } else {
      return (
        <div className={`search-results ${isSearchFocused ? "focused" : ""}`}>
          {matchingUsers?.[0] && (
            <div className="search-results-result">
              {matchingUsers?.map((matchingUser) => (
                <Link to={`/user/${matchingUser.id}`} key={matchingUser.id}>
                  <div className="searchbar-result">
                    <PersonIcon sx={{ marginRight: 1 }}></PersonIcon>
                    {matchingUser.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {matchingPhoto != undefined && (
            <div className="search-results-result">
              <Link
                to={`/photo/${matchingPhoto.toString()}`}
                key={matchingPhoto}
              >
                <div className="searchbar-result">
                  <PhotoLibraryIcon sx={{ marginRight: 1 }}></PhotoLibraryIcon>
                  {photoSearch?.title}
                </div>
              </Link>
            </div>
          )}
          {matchingAlbum != undefined && (
            <div className="search-results-result">
              <Link
                to={`/photo/${matchingAlbum.toString()}`}
                key={matchingAlbum}
              >
                <div className="searchbar-result">
                  <PhotoAlbumIcon sx={{ marginRight: 1 }}></PhotoAlbumIcon>
                  {albumSearch?.title}
                </div>
              </Link>
            </div>
          )}

          {matchingAlbum == undefined &&
            matchingPhoto == undefined &&
            matchingUsers?.length == 0 && (
              <div className="searchbar-result">
                No results found for {searchText}
              </div>
            )}
        </div>
      );
    }
  }

  const handleBlurSearch = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      !event.relatedTarget ||
      !event.relatedTarget.closest(".search-results")
    ) {
      setIsSearchFocused(false);
    }
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 500);
  };
  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add("logo");
            }}
            desc="Logo"
            evalScripts="always"
            onError={(error) => {
              console.error(error);
            }}
            renumerateIRIElements={false}
            src="https://karmelova.github.io/WSEI-Frameworki-Projekt/public/icons/triangular-logo-svgrepo-com.svg"
          />
          <CustomTypography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            SocialHub
          </CustomTypography>
          <Search sx={{ flexGrow: { sm: 8, md: 2, xl: 1 }, display: "flex" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleGetSearchResults}
              onFocus={handleOpenSearchResults}
              onBlur={handleBlurSearch}
            />
            <SearchResultsHandler></SearchResultsHandler>
          </Search>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page: string) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 3,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
            }}
          >
            {pages.map((page: string) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 0, flexShrink: 3 }}>
            {isUserLoggedIn.email ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar(isUserLoggedIn.name ? isUserLoggedIn.name : "N A")}
                aria-label="recipe" />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting: string) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") {
                      handleLogout();
                      handleCloseUserMenu(setting);
                    } else {
                      handleCloseUserMenu(setting);
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
