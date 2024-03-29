import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import InputPhone from './components/login/InputPhone';
import NotFound from "./components/error/NotFound";
import './App.css';
import ServerDown from './components/error/ServerDown';
import EnterOTP from './components/login/EnterOTP';
import DummyLogin from './components/login/DummyLogin';
import Scratch from './components/Scratch';
import Test from './components/Test';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/enterotp" element={<EnterOTP/>} />
        <Route path="/login" element={<InputPhone />} />
        <Route path="/down-for-maintainance" element={<ServerDown/>}/>
        <Route path="/test" element = {<Test/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
