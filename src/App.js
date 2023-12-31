import "./App.css";
import Login from "./pages/Authentication/Login";
import Content from "./pages/LandingPage/components/Content";
import Home from "./pages/Home/Home";
import Register from "./pages/Authentication/Register";
import Profile from "./pages/LandingPage/Profile";

import path from "./utils/path";

import { Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication/Authentication";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainContent from "./pages/Home/components/MainContent";
import { useSelector } from "react-redux";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import ChangePassword from "./pages/LandingPage/ChangePassword";
import DetailClass from "./pages/Home/components/DetailClass/DetailClass";
import JoinClassByLink from "./pages/Home/components/JoinClassByLink/JoinClassByLink";
function App() {
  const { isLoggin, mes } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.AUTHENTICATION} element={<Authentication />}>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.REGISTER} element={<Register />}></Route>
          <Route
            path={path.FORGET_PASSWORD}
            element={<ForgetPassword />}
          ></Route>
        </Route>
        <Route
          path={path.PUBLIC}
          element={isLoggin || mes ? <Home /> : <LandingPage />}
        >
          {isLoggin || mes ? (
            <Route path={path.HOME} element={<MainContent />}></Route>
          ) : (
            <Route path={path.HOME} element={<Content />}></Route>
          )}
        </Route>
        <Route path={path.PUBLIC} element={<Home />}>
          <Route
            path={path.DETAILS_CLASS + "/:name"}
            element={<DetailClass />}
          ></Route>
          <Route
            path={path.JOIN_CLASS_BY_LINK + "/:name"}
            element={<JoinClassByLink />}
          ></Route>
        </Route>

        <Route path={path.PUBLIC} element={<LandingPage />}>
          <Route path={path.PROFILE} element={<Profile />}></Route>
          <Route
            path={path.CHANGE_PASSWORD}
            element={<ChangePassword />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
