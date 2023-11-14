import './App.css';
import Login from './pages/Authentication/Login';
import Public from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home'
import Register from './pages/Authentication/Register';
import path from './utils/path';

import { Routes, Route } from "react-router-dom";
import Authentication from './pages/Authentication/Authentication';

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.AUTHENTICATION} element={<Authentication />}>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.REGISTER} element={<Register />}></Route>
        </Route>
        <Route path={path.PUBLIC} element={<Public />}></Route>
        <Route path={path.MYHOME} element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
