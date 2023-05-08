import React, { useEffect } from "react";
import useMatchMedia from "use-match-media";
import { getStocks, setOffset } from "../../../store/slices/stocksSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ReactComponent as GeoIcon } from "../../../assets/images/mainPage/geo-icon.svg";
import Button from "../../ui/button/Button";
import StockCard from "../../stockCard/StockCard";
import SkeletonStockCard from "../../stockCard/SkeletonStockCard";
import Pagination from "../../ui/pagination/Pagination";
import s from "./stocks.module.css";

const Stocks: React.FC = () => {
  const dispatch = useDispatch();
  const { data, status, limit, count, offset } = useSelector(
    (store: RootState) => store.stocks
  );
  const isTablet = useMatchMedia("(max-width: 768px)");

  useEffect(() => {
    // @ts-ignore
    dispatch(getStocks());
  }, [dispatch, offset]);

  const getPagesCount = () => Math.ceil(count / 6);

  const stocks = data.map((stock) => (
    <li key={stock.id}>
      <StockCard {...stock} />
    </li>
  ));
  const skeletons = [...new Array(6)].map((_, key) => (
    <SkeletonStockCard key={key} />
  ));

  const onChangePage = (page: number) => {
    dispatch(setOffset(page));
  };

  return (
    <section className={s.root}>
      <div className="container">
        <div className={s.head}>
          <h2>{isTablet ? "Популярное" : "Все акции"}</h2>
          <Button padding="18px 24px" className={s.btn} link="/map">
            <GeoIcon />
            <span>Акции на карте</span>
          </Button>
        </div>
        {status === "error" ? (
          <h3>Что-то пошло не так</h3>
        ) : (
          <ul className={s.stock__items}>
            {status === "success" ? stocks : skeletons}
          </ul>
        )}
        <div className={s.pagination}>
          <Pagination
            initialVisiblePages={5}
            page={Math.ceil((offset + 1) / 6)}
            limit={getPagesCount()}
            change={onChangePage}
          />
        </div>
      </div>
    </section>
  );
};

export default Stocks;
