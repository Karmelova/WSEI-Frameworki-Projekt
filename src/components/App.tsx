import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import ErrorBoundary from "./common/ErrorBoundary";
import Posts from "./routes/Posts";
import Albums from "./routes/Albums";
import Home from "./routes/Home";
import Users from "./routes/Users";
import Navbar from "./common/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./common/Theme";
import ProfileId from './routes/ProfileId';
import AlbumsIdPhotos from './routes/AlbumsIdPhotos';
import NotFound from "./routes/NotFound";
import PostById from "./routes/PostById"
import Login from "./routes/Login"

export const App = () => {
  const ContentMargin = {
    height: '2em', // Set the height value as per your requirement
  };
  useEffect(() => {
    document.title = 'SocialHub';
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Navbar />
          <Container >
            <div style={ContentMargin}></div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Posts" element={<Posts />}></Route>
              <Route path="/Albums" element={<Albums />}></Route>
              <Route path="/Users" element={<Users />}></Route>
              <Route path="/user/:id" element={<ProfileId />}></Route>
              <Route path="/albums/:id" element={<AlbumsIdPhotos />}></Route>
              <Route path="/posts/:id" element={<PostById />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="*" element={<NotFound />} />
              
            </Routes>
            <div style={ContentMargin}></div>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
    
  );
};
