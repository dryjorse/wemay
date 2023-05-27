import React from "react";
import { ICompany } from "../../store/slices/companiesSlice";
import s from "./companyCard.module.css";

const CompanyCard: React.FC<ICompany> = ({ stock_count, discount, image }) => {
  return (
    <div className={s.cart}>
      <div className={s.cart__img}>
        <img src={image} alt="company" />
      </div>
      <div className={s.cart__content}>
        <span>
          Акция: <b>{stock_count}</b>
        </span>
        <span>
          Скидки до <b>{Math.floor(discount)}%</b>
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
