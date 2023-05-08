import React, { useState } from "react";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { Link } from "react-router-dom";
import useMatchMedia from "use-match-media";
import { ReactComponent as Stock } from "../../assets/images/header/stock.svg";
import { ReactComponent as Bell } from "../../assets/images/header/bell.svg";
import { ReactComponent as Smile } from "../../assets/images/header/smile.svg";
import { ReactComponent as Burger } from "../../assets/images/header/burger.svg";
import { ReactComponent as Logo } from "../../assets/images/common/logo.svg";
import { ReactComponent as LogoMobile } from "../../assets/images/common/logo-mobile.svg";
import { ReactComponent as Navigation } from "../../assets/images/header/navigation.svg";
import { ReactComponent as Person } from "../../assets/images/header/person.svg";
import { ReactComponent as ArrowDown } from "../../assets/images/header/arrow-down.svg";

import { menuList } from "../../utillities/utillities";
import Menu from "../menu/Menu";
import s from "./header.module.css";

const Header: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const isTable = useMatchMedia("(max-width: 768px)");

  const toggleMenuActive = () => {
    if(!isTable) setIsMenuActive((bool) => {
      document.body.style.overflow = !bool ? "hidden" : "";
      return !bool;
    });
  };

  return (
    <header>
      <div className={s.route}>
        <div className={s.top}>
          <Link to="/products" className={`${s.top__link} ${s.fiolet}`}>
            <Stock />
            <span>Акции дня</span>
          </Link>
          <Link to="/products" className={`${s.top__link} ${s.red}`}>
            <Bell />
            <span>Скоро заканчивается</span>
          </Link>
          <Link to="/products" className={`${s.top__link} ${s.green}`}>
            <Smile />
            <span>Бесплатно</span>
          </Link>
        </div>
        <div className={s.top__mobile}>
          <div className={s.logo__mobile}>
            <button onClick={toggleMenuActive}>
              <Burger />
            </button>
            <Link to="/">
              <LogoMobile />
            </Link>
          </div>
          <button>
            <Navigation />
          </button>
        </div>
        <div className={s.line__one}></div>
        <div className={s.middle}>
          <div className={`${s.logo} ${isMenuActive ? s.hidden : ""}`}>
            <button onClick={toggleMenuActive}>
              <Burger />
            </button>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className={s.search}>
            <Input option="search" placeholder="Поиск" />
          </div>
          <Button className={s.auth__button} link="/auth">
            <div>
              <Person />
              <span>Войти</span>
            </div>
          </Button>
        </div>
      </div>
      <ul className={s.menu__list}>
        {menuList.map((item, key) => (
          <li key={key}>
            <span>{item.name}</span>
            <ArrowDown />
          </li>
        ))}
      </ul>
      <Menu isActive={isMenuActive} setIsActive={toggleMenuActive} />
    </header>
  );
};

export default Header;
