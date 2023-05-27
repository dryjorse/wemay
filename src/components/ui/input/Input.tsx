import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/images/header/search.svg";
import s from "./input.module.css";

interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  option?: "search" | "form";
  type?: string;
  placeholder: string;
  w?: number;
  isRequired?: boolean;
  isError?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  option,
  type = "text",
  placeholder,
  w,
  isRequired,
  isError,
}) => {
  const [isInputClear, setIsInputClear] = useState(true);

  if (option === "search")
    return (
      <div className={`${s.root} ${s.search}`}>
        <SearchIcon />
        <input value={value} type={type} placeholder={placeholder} />
      </div>
    );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setIsInputClear(!e.target.value);
  };

  return (
    <div
      style={{ maxWidth: `${w}px` || "", width: w ? "100%" : "" }}
      className={`${s.root} ${isError ? s.error : ""}`}
    >
      <input
        value={value}
        type={type}
        placeholder={isRequired ? "" : placeholder}
        onChange={onChangeInput}
        onBlur={onBlur}
      />
      {option === "form" && isRequired && isInputClear && (
        <span className={s.placeholder}>
          {placeholder}
          <span>*</span>
        </span>
      )}
    </div>
  );
};

export default Input;
