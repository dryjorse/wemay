import React from "react";
import { ReactComponent as Like } from "../../assets/images/mainPage/like.svg";
import s from "./stockCard.module.css";

interface StockCardProps {
  title: string;
  image: string;
  discountPercent: number;
  likes: number;
  price: number;
}

const StockCard: React.FC<StockCardProps> = ({
  title,
  image,
  discountPercent,
  likes,
  price,
}) => {
  const calculatePercentageOfPrice = (price: number, percent: number) => {
    return Math.floor(price - (price / 100) * percent);
  };

  return (
    <div className={s.stock__item}>
      <div
        style={{ background: `url(${image}) center no-repeat` }}
        className={s.stock__photo}
      >
        <span className={s.stock__discount}>-{discountPercent}%</span>
        <div className={s.likes}>
          <Like />
          <span>{likes}</span>
        </div>
      </div>
      <div className={s.content}>
        <h3>{title}</h3>
        <div className={s.prices}>
          <span className={s.initial__price}>от {price} сом</span>
          <span className={s.price}>
            от {calculatePercentageOfPrice(price, discountPercent)} сом
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
