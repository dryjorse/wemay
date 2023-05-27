import React from "react";
import { ReactComponent as Like } from "../../assets/images/mainPage/like.svg";
import { Stock, setStockLike } from "../../store/slices/stocksSlice";
import { useAppDispatch } from "../../store/store";
import s from "./stockCard.module.css";


const StockCard: React.FC<Stock> = ({
  id,
  name,
  price,
  image,
  discount,
  get_likes,
}) => {
  const dispatch = useAppDispatch()
  const calculatePercentageOfPrice = (price: number, percent: number) => {
    return Math.floor(price - (price / 100) * percent);
  };

  const setLikeFunc = () => {
    dispatch(setStockLike(id))
  }

  return (
    <div className={s.stock__item}>
      <div
        style={{ background: `url(${image}) center no-repeat` }}
        className={s.stock__photo}
      >
        <span className={s.stock__discount}>-{discount}%</span>
        <button onClick={setLikeFunc} className={s.likes}>
          <Like />
          <span>{get_likes}</span>
        </button>
      </div>
      <div className={s.content}>
        <h3>{name}</h3>
        <div className={s.prices}>
          <span className={s.initial__price}>от {Math.floor(price)} сом</span>
          <span className={s.price}>
            от {calculatePercentageOfPrice(price, discount)} сом
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
