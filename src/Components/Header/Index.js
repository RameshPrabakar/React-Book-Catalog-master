import React from "react";
import Menuoption from "../Menuoption";
import Logo from "../Logo/Index";
import "./Header.css";

const Header = () => (
  <header className="appHeader">
    <Logo />
    <Menuoption url="/home" characters="Books" />
    <Menuoption url="/logout" characters="Logout" />
  </header>
);

export default Header;
