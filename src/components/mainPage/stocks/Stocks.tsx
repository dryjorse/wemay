import React, { useEffect, useState } from "react";
import useMatchMedia from "use-match-media";
import {
  getStocks,
  setLimit,
  setOffset,
} from "../../../store/slices/stocksSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { ReactComponent as GeoIcon } from "../../../assets/images/mainPage/geo-icon.svg";
import StockCard from "../../stockCard/StockCard";
import SkeletonStockCard from "../../stockCard/SkeletonStockCard";
import Pagination from "../../ui/pagination/Pagination";
import StocksMap from "../stocksMap/StocksMap";
import s from "./stocks.module.css";

const Stocks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, count, offset, limit } = useSelector(
    (store: RootState) => store.stocks
  );
  const [isMapActive, setIsMapActive] = useState(false);
  const isTablet = useMatchMedia("(max-width: 768px)");

  useEffect(() => {
    dispatch(getStocks());
  }, [dispatch, offset, limit]);

  const getPagesCount = () => Math.ceil(count / limit);

  const stocks = data.map((stock, key) => (
    <li key={key}>
      <StockCard {...stock} />
    </li>
  ));
  const skeletons = [...new Array(6)].map((_, key) => (
    <SkeletonStockCard key={key} />
  ));

  const onChangePage = (page: number) => {
    dispatch(setOffset(page));
  };

  const toggleMapActive = () => {
    setIsMapActive((bool) => !bool);
  };

  const increaseLimit = () => {
    dispatch(setLimit(limit + 2));
  };

  return (
    <section className={s.root}>
      <div className="container">
        <StocksMap isActive={isMapActive} setIsActive={toggleMapActive} />
        <div className={s.head}>
          <h2>Все акции</h2>
          <button onClick={toggleMapActive} className={`btn ${s.btn}`}>
            <GeoIcon />
            <span>Акции на карте</span>
          </button>
        </div>
        <div className={s.content}>
          {status === "error" ? (
            <h3>Что-то пошло не так</h3>
          ) : (
            <ul className={s.stock__items}>
              {status === "success" ? stocks : skeletons}
              {/* {skeletons} */}
              {/* <SkeletonStockCard /> */}
              {/* <StockCard id={1} name={'eded'} description="eded" price={500} discount={50} image={''} get_likes={3} /> */}
            </ul>
          )}
        </div>
        <div className={s.pagination__block}>
          <button onClick={increaseLimit} className={`btn ${s.btn2}`}>
            Показать еще
          </button>
          <div className={s.pagination}>
            <Pagination
              initialVisiblePages={5}
              page={Math.ceil((offset + 1) / 6)}
              limit={getPagesCount()}
              change={onChangePage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stocks;
