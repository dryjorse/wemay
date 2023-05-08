import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useMatchMedia from "use-match-media";
import { ReactComponent as ArrowLeft } from "../../../assets/images/mainPage/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/images/mainPage/arrow-right.svg";
import Carousel, { RenderArrowProps } from "react-elastic-carousel";
import { getCompanies } from "../../../store/slices/companiesSlice";
import { RootState, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import CompanyCard from "../../companyCard/CompanyCard";
import SkeletonCompanyCard from "../../companyCard/SkeletonCompanyCard";
import s from "./companies.module.css";

const Companies: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useSelector((store: RootState) => store.companies);
  const isSmallDesktop = useMatchMedia("(max-width: 1300px)");
  const isTablet = useMatchMedia("(max-width: 768px)");
  const isLargeMobile = useMatchMedia("(max-width: 555px)");
  const itemsToShowInSlider = isLargeMobile ? 1 : isTablet ? 2 : isSmallDesktop ? 3 : 5

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const myArrow = ({ type, onClick, isEdge }: RenderArrowProps) => {
    const pointer = type === "PREV" ? <ArrowLeft /> : <ArrowRight />;
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  };

  const companies = [...data, ...data].map((company, key) => (
    <CompanyCard key={key} {...company} />
  ));
  const skeletons = [...new Array(5)].map((_, key) => (
    <SkeletonCompanyCard key={key} />
  ));

  return (
    <section className={s.root}>
      <div className="container">
        <h2>Компании</h2>
      </div>
      <div className={s.container}>
        {status === "error" ? (
          <h3>Что-то пошло не так</h3>
        ) : (
          <>
            {/*@ts-ignore*/}
            <Carousel
              renderArrow={myArrow}
              itemPadding={[20, 15.5]}
              itemsToShow={itemsToShowInSlider}
              pagination={false}
            >
              {status === "success" ? companies : skeletons}
            </Carousel>
            <Link className={s.link} to="/companies">
              Показать все
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Companies;
