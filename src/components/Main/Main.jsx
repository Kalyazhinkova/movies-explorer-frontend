import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile"
import "./Main.css";

function Main () {
  return (
    <main className="main">
      {/* <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Register />
      <Login /> */}
      <Profile />
    </main>
  )
}

export default Main;