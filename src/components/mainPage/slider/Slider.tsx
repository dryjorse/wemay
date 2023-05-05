import React from "react";
import Button from "../../ui/button/Button";
import SlidePhoto from "../../../assets/images/mainPage/slide-photo.png";
import Carousel, { RenderArrowProps } from "react-elastic-carousel";
import { ReactComponent as ArrowLeft } from "../../../assets/images/mainPage/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/images/mainPage/arrow-right.svg";
import s from "./slider.module.css";

const Slider: React.FC = () => {
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
      <div className={s.container}>
        {/*@ts-ignore*/}
        <Carousel
          itemPadding={[0, 15.5]}
          renderArrow={myArrow}
          itemsToShow={1}
          pagination={false}
          enableAutoPlay
          autoPlaySpeed={3000}
        >
          {[...new Array(5)].map((slide, key) => (
            <div key={key} className={s.slide}>
              <div className={s.slide__wrapper}>
                <div className={s.slide__content}>
                  <h3>Поддарки для неё и для него</h3>
                  <span>Покупай прямо сейчас</span>
                  <Button link="/" padding="14px 49px">
                    Подробнее
                  </Button>
                </div>
                <div className={s.slide__photo}>
                  <img src={SlidePhoto} alt="slide" />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Slider;
