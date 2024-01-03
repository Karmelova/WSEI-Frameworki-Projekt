import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import ErrorBoundary from "./common/ErrorBoundary";
import Posts from "./routes/Posts";
import Navbar from "./common/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./common/Theme";
import Profile from './routes/Profile';

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
              <Route path="/Posts" element={<Posts />}></Route>
              <Route path="/users/:id" element={<Profile />}></Route>
              <Route path="*" element={<div>404</div>} />
            </Routes>
            <div style={ContentMargin}></div>
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
    
  );
};
