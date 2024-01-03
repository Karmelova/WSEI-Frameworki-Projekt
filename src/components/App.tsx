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
import Profile from './routes/Profile';
import NotFound from "./routes/NotFound";

export const App = () => {
  const ContentMargin = {
    height: '2em', // Set the height value as per your requirement
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Navbar />

          
          <Container>
            <div style={ContentMargin}></div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Posts" element={<Posts />}></Route>
              <Route path="/Albums" element={<Albums />}></Route>
              <Route path="/Users" element={<Users />}></Route>
              <Route path="/user/:id" element={<Profile />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <div style={ContentMargin}></div>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
    
  );
};
