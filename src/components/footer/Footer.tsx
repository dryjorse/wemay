import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/common/logo.svg";
import { ReactComponent as Instagram } from "../../assets/images/footer/instagram.svg";
import { ReactComponent as Telegram } from "../../assets/images/footer/telegram.svg";
import { ReactComponent as WhatsApp } from "../../assets/images/footer/whatsapp.svg";
import { ReactComponent as VK } from "../../assets/images/footer/vk.svg";
import { ReactComponent as Facebook } from "../../assets/images/footer/facebook.svg";
import s from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={s.root}>
      <div className="container">
        <Logo />
        <span className={`descr ${s.descr}`}>
          Сервис скидок и выгодных предложений
        </span>
        <div className={s.items}>
          <div className={s.item}>
            <h3>О сервисе</h3>
            <ul>
              <li><Link to="/contacts">Контакты</Link></li>
              <li><Link to="/how_to_buy">Как купить</Link></li>
              <li><Link to="/reqs">Реквизиты</Link></li>
            </ul>
          </div>
          <div className={s.item}>
            <h3>Оплата и доставка</h3>
            <ul>
              <li><Link to="/payment">Оплата</Link></li>
              <li><Link to="/delivery">Доставка</Link></li>
              <li><Link to="/credit">Покупка в кредит</Link></li>
            </ul>
          </div>
          <div className={s.item}>
            <h3>Мы в соцсетях</h3>
            <ul className={s.social__list}>
              <li>
                <Link to="/">
                  <Instagram />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Telegram />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <WhatsApp />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <VK />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Facebook />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className={s.copyright}>© wemay 2022 </p>
      </div>
    </footer>
  );
};

export default Footer;
