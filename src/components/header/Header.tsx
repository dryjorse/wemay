import React, { useState, useEffect, useRef } from "react";
// @ts-ignore
import { Transition } from "react-transition-group";
import Menu from "../menu/Menu";
import Input from "../ui/input/Input";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ReactComponent as Stock } from "../../assets/images/header/stock.svg";
import { ReactComponent as Bell } from "../../assets/images/header/bell.svg";
import { ReactComponent as Smile } from "../../assets/images/header/smile.svg";
import { ReactComponent as Burger } from "../../assets/images/header/burger.svg";
import { ReactComponent as Logo } from "../../assets/images/common/logo.svg";
import { ReactComponent as LogoMobile } from "../../assets/images/common/logo-mobile.svg";
import { ReactComponent as Navigation } from "../../assets/images/header/navigation.svg";
import { ReactComponent as Person } from "../../assets/images/header/person.svg";
import { ReactComponent as ArrowDown } from "../../assets/images/header/arrow-down.svg";
import ava from "../../assets/images/common/ava.svg";
import { menuList } from "../../utillities/utillities";
import ProfileTooltip from "./profileTooltip/ProfileTooltip";
import s from "./header.module.css";

interface HeaderProps {
  openLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ openLogin }) => {
  const { isAuth, profile } = useSelector((state: RootState) => state.profile);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isAuthActive, setAuthActive] = useState(false);
  const authWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        authWrapperRef.current &&
        !event.composedPath().includes(authWrapperRef.current)
      ) {
        setAuthActive(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenuActive = () => {
    setIsMenuActive((bool) => {
      document.body.style.overflow = !bool ? "hidden" : "";
      return !bool;
    });
  };

  const toggleIsAuthActive = () => {
    setAuthActive((bool) => !bool);
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
          <div ref={authWrapperRef} className={s.auth__wrapper}>
            <button onClick={toggleIsAuthActive}>
              <Navigation />
            </button>
            <ProfileTooltip isActive={isAuthActive} />
          </div>
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
          {isAuth ? (
            <button className={s.profile}>
              <h3>{profile.name}</h3>
              <img
                className={s.ava}
                src={profile.profile_picture || ava}
                alt="ava"
              />
            </button>
          ) : (
            <button onClick={openLogin} className={`btn ${s.auth__button}`}>
              <div>
                <Person />
                <span>Войти</span>
              </div>
            </button>
          )}
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
      <Transition in={isMenuActive} timeout={500} mountOnEnter unmountOnExit>
        {(state: string) => <Menu isActive={isMenuActive} setIsActive={toggleMenuActive} animateKey={state}/>}
      </Transition>
    </header>
  );
};

export default Header;
