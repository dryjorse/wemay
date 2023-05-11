import React, { useState, useEffect, useRef } from "react";
import ProfileMenu from "../profileMenu/ProfileMenu";
import Menu from "../menu/Menu";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import useMatchMedia from "use-match-media";
import { Link } from "react-router-dom";
import { ReactComponent as Stock } from "../../assets/images/header/stock.svg";
import { ReactComponent as Bell } from "../../assets/images/header/bell.svg";
import { ReactComponent as Smile } from "../../assets/images/header/smile.svg";
import { ReactComponent as Burger } from "../../assets/images/header/burger.svg";
import { ReactComponent as Logo } from "../../assets/images/common/logo.svg";
import { ReactComponent as LogoMobile } from "../../assets/images/common/logo-mobile.svg";
import { ReactComponent as Navigation } from "../../assets/images/header/navigation.svg";
import { ReactComponent as Person } from "../../assets/images/header/person.svg";
import { ReactComponent as ArrowDown } from "../../assets/images/header/arrow-down.svg";
import { ReactComponent as Profile } from "../../assets/images/header/profile.svg";
import { ReactComponent as Favourites } from "../../assets/images/header/favourites.svg";
import { ReactComponent as Logout } from "../../assets/images/header/logout.svg";
import { menuList } from "../../utillities/utillities";
import s from "./header.module.css";

const Header: React.FC = () => {
  const isTable = useMatchMedia("(max-width: 768px)");
  const isSmallTable = useMatchMedia("(max-width: 600px)");
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isAuthActive, setAuthActive] = useState(false);
  const [isProfileMenuActive, setIsProfileMenuActive] = useState(false);
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
    if (!isTable)
      setIsMenuActive((bool) => {
        document.body.style.overflow = !bool ? "hidden" : "";
        return !bool;
      });
  };

  const toggleIsAuthActive = () => {
    setAuthActive((bool) => !bool);
  };

  const toggleIsProfileMenuActive = () => {
    setIsProfileMenuActive((bool) => {
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
            <button
              onClick={
                isSmallTable ? toggleIsProfileMenuActive : toggleMenuActive
              }
            >
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
            <div className={`${s.auth__block} ${isAuthActive ? s.active : ""}`}>
              <Link to="/profile" className={s.auth__link}>
                <Profile />
                <span>Мой профиль</span>
              </Link>
              <Link to="/favourites" className={s.auth__link}>
                <Favourites />
                <span>Избранное</span>
              </Link>
              <button className={s.auth__link}>
                <Logout />
                <span>Выйти</span>
              </button>
            </div>
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
      {isSmallTable && (
        <ProfileMenu
          isActive={isProfileMenuActive}
          setIsActive={toggleIsProfileMenuActive}
        />
      )}
    </header>
  );
};

export default Header;
