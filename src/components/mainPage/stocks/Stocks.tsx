import React, { useEffect } from "react";
import { getStocks } from "../../../store/slices/stocksSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ReactComponent as GeoIcon } from "../../../assets/images/mainPage/geo-icon.svg";
import { ReactComponent as Like } from "../../../assets/images/mainPage/like.svg";
import Button from "../../ui/button/Button";
import s from "./stocks.module.css";

const Stocks: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store: RootState) => store.stocks);

  useEffect(() => {
    // @ts-ignore
    dispatch(getStocks());
  }, []);

  const calculatePercentageOfPrice = (price: number, percent: number) => {
    return Math.floor(price - (price / 100) * percent);
  };

  return (
    <section className={s.root}>
      <div className="container">
        <div className={s.head}>
          <h2>Все акции</h2>
          <Button padding="18px 24px" className={s.btn} link="/map">
            <GeoIcon />
            <span>Акции на карте</span>
          </Button>
        </div>
        <ul className={s.stock__items}>
          {data.map((stock) => (
            <li className={s.stock__item} key={stock.id}>
              <div
                style={{ background: `url(https://curious-bear-pea-coat.cyclic.app/${stock.image})` }}
                className={s.stock__photo}
              >
                <span className={s.stock__discount}>
                  -{stock.discountPercent}%
                </span>
                <div className={s.likes}>
                  <Like />
                  <span>{stock.likes}</span>
                </div>
              </div>
              <h3>{stock.title}</h3>
              <div className={s.prices}>
                <span className={s.initial__price}>от {stock.price} сом</span>
                <span className={s.price}>
                  от{" "}
                  {calculatePercentageOfPrice(
                    stock.price,
                    stock.discountPercent
                  )}{" "}
                  сом
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Stocks;
