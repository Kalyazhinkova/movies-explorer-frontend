// import Promo from './Promo/Promo';
// import NavTab from './NavTab/NavTab';
// import AboutProject from './AboutProject/AboutProject';
// import Techs from './Techs/Techs';
// import AboutMe from './AboutMe/AboutMe';
// import Portfolio from './Portfolio/Portfolio';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Main.css';
import Movies from '../Movies/Movies';

function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Movies />
        {/* <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Register />
      <Login />
      <Profile /> */}
      </main>
      <Footer />
    </>
  );
}

export default Main;
