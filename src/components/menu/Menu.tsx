import React from "react";
import { Link } from "react-router-dom";
import { menuSecondList } from "../../utillities/utillities";
import { ReactComponent as Cross } from "../../assets/images/menu/cross.svg";
import s from "./menu.module.css";

interface MenuProps {
  isActive: boolean;
  setIsActive: () => void;
}

const Menu: React.FC<MenuProps> = ({isActive, setIsActive}) => {
  return (
    <div className={`${isActive ? s.active : ''} ${s.root}`}>
      <div className={s.content}>
        <nav className={s.menu}>
          <ul className={s.top__list}>
            <li>
              <Link className={s.link} to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link className={s.link} to="/about-us">
                О нас
              </Link>
            </li>
            <li>
              <Link className={s.link} to="/auth">
                Войти
              </Link>
            </li>
          </ul>
          <ul className={s.bottom__list}>
            {menuSecondList.map((elem, key) => (
              <li key={key}>
                <Link
                  style={{ background: `${elem.background}` }}
                  className={s.link}
                  to=""
                >
                  <h3>{elem.title}</h3>
                  <span>{elem.stocks} акций</span>
                  <div className={s.photo}>
                    <img src={elem.photo} alt="menu" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={setIsActive} className={s.cross}>
          <Cross />
        </button>
      </div>
      <div className={s.back}></div>
    </div>
  );
};

export default Menu;
