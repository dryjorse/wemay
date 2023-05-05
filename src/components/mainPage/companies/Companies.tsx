import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../../assets/images/mainPage/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/images/mainPage/arrow-right.svg";
import { companiesList } from "../../../utillities/utillities";
import Carousel, { RenderArrowProps } from "react-elastic-carousel";
import Cart from "../../ui/cart/Cart";
import s from "./companies.module.css";

const Companies: React.FC = () => {
  const myArrow = ({ type, onClick, isEdge }: RenderArrowProps) => {
    const pointer = type === "PREV" ? <ArrowLeft /> : <ArrowRight />;
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  };

  return (
    <section className={s.root}>
      <div className="container">
        <h2>Компании</h2>
      </div>
      <div className={s.container}>
        {/*@ts-ignore*/}
        <Carousel
          renderArrow={myArrow}
          itemPadding={[20, 15.5]}
          itemsToShow={5}
          pagination={false}
        >
          {[...companiesList, ...companiesList].map((company, key) => (
            <div key={key} className={s.cart}>
              <Cart option={1}>
                <img src={company.photo} alt="company" />
                <div className={s.cart__content}>
                  <span>
                    Акция: <b>{company.stocks}</b>
                  </span>
                  <span>
                    Скидки до <b>{company.discountPercentage}%</b>
                  </span>
                </div>
              </Cart>
            </div>
          ))}
        </Carousel>
        <Link className={s.link} to="/companies">Показать все</Link>
      </div>
    </section>
  );
};

export default Companies;
