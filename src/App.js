import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import './App.css';
import ServerDown from './components/ServerDown';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/down-for-maintainance" element={<ServerDown/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
