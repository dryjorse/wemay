import React from "react";
import s from "./companyCard.module.css";

interface CompanyCardProps {
  photo: string;
  stocks: number;
  discountPercentage: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  photo,
  stocks,
  discountPercentage,
}) => {
  return (
    <div className={s.cart}>
      <img src={photo} alt="company" />
      <div className={s.cart__content}>
        <span>
          Акция: <b>{stocks}</b>
        </span>
        <span>
          Скидки до <b>{discountPercentage}%</b>
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
