import { FC } from "react";
import {Routes, Route} from 'react-router-dom'
// import Profile from 'Profile';

export const App: FC = () =>{
  return (
    <Routes>
      <>tutaj będzie strona "logowania" gdzie trzeba będzie wpisać istniejący adres email, lub też będzie formularz rejestracji dynamicznie przęłączany w obrębie app. po "zalogowaniu" użytkownikowi wyświetli się blog z postami od różnych użytkowników. Bardzo minimalistyczna kopia facebooka/pinterest "Your-story"</>
      {/* <Route path="/" element={<Profile />}></Route> */}
    </Routes>
    
  );
}

export default App;
