import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import ErrorBoundary from "./common/ErrorBoundary";
import Home from "./routes/Home";
import Navbar from "./common/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./common/Theme";
import Profile from './routes/Profile';

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Navbar />

          
          <Container>
            <Routes>
              <Route path="/Home" element={<Home />}></Route>
              <Route path="/users/:id" element={<Profile />}></Route>
            </Routes>
          
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
    // <Routes>
    //   <>tutaj będzie strona "logowania" gdzie trzeba będzie wpisać istniejący adres email, lub też będzie formularz rejestracji dynamicznie przęłączany w obrębie app. po "zalogowaniu" użytkownikowi wyświetli się blog z postami od różnych użytkowników. Bardzo minimalistyczna kopia pinterest "Your-story"</>
    //   { <Route path="/" element={<Profile />}></Route> }
    // </Routes>
  );
};
