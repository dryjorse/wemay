import React, { useEffect, useState } from "react";
import { ReactComponent as LeftArrow } from "../../../assets/images/pagination/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/images/pagination/right-arrow.svg";
import s from "./pagination.module.css";

interface PaginationProps {
  page: number;
  limit: number;
  initialVisiblePages?: number;
  change: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  change,
  initialVisiblePages = 4,
}) => {
  const symbol = "...";
  const [pages, setPages] = useState<(number | string)[]>([]);

  const createNumbersArray: (min: number, max: number) => number[] = (
    min,
    max
  ) => {
    const numbers = [];

    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }

    return numbers;
  };

  useEffect(() => {
    let currPages: (string | number)[] = [];

    if (limit < 8) {
      for (let i = 1; i <= limit; i++) {
        currPages.push(i);
      }
    } else {
      currPages = [1, 2, 3, 4, symbol, limit];
    }

    setPages(currPages);
  }, [limit]);

  const handlePage = (newPage: number | string) => {
    newPage = +newPage || newPage;

    if (newPage === symbol) return;

    setPages((pages) => {
      let currPages = [];

      if (limit < 8) {
        for (let i = 1; i <= limit; i++) {
          currPages.push(i);
        }
        return currPages;
      }

      if (typeof newPage === "number") {
        console.log(limit - initialVisiblePages);

        if (
          newPage >= initialVisiblePages &&
          newPage <= limit - initialVisiblePages
        ) {
          return [1, symbol, newPage - 1, newPage, newPage + 1, symbol, limit];
        }

        if (newPage < initialVisiblePages) {
          return [...createNumbersArray(1, initialVisiblePages), symbol, limit];
        }

        if (newPage > limit - initialVisiblePages) {
          return [
            1,
            symbol,
            ...createNumbersArray(limit - initialVisiblePages, limit),
          ];
        }
      }

      return pages;
    });

    if (typeof newPage === "number") change?.(newPage);
  };

  useEffect(() => {
    if(limit && page > limit) handlePage(limit)
  }, [page, limit])

  const goNext = () => {
    if (page + 1 <= limit) handlePage(page + 1);
  };

  const goBack = () => {
    if (page - 1 >= 1) handlePage(page - 1);
  };

  const isNear = (item: number | string) => {
    if (page + 1 === item || page - 1 === item) return s.item__near;
    return "";
  };

  return (
    <ul className={s.pagination}>
      <button onClick={goBack}>
        <LeftArrow />
      </button>
      {pages.map((item, key) => (
        <li key={key}>
          <button
            name={item + ""}
            onClick={(e: any) => handlePage(e.target.name)}
            className={`${s.item} ${item === page ? s.active : null} ${isNear(
              item
            )}`}
          >
            {item}
          </button>
        </li>
      ))}
      <button onClick={goNext}>
        <RightArrow />
      </button>
    </ul>
  );
};

export default Pagination;
