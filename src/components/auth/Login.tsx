import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { ReactComponent as Google } from "../../assets/images/auth/google.svg";
import { ReactComponent as Facebook } from "../../assets/images/auth/facebook.svg";
import { login } from "../../store/slices/profileSlice";
import { useInput } from "../../hooks/useInput";
import Input from "../ui/input/Input";
import s from "./auth.module.css";

interface LoginProps {
  isActive: boolean;
  setIsActive: () => void;
  setIsRegisterActive: () => void;
}

const Login: React.FC<LoginProps> = ({
  isActive,
  setIsActive,
  setIsRegisterActive,
}) => {
  const dispatch = useAppDispatch();
  const { status, authErrorMessage } = useSelector(
    (state: RootState) => state.profile
  );
  const [isValid, setIsValid] = useState(false);
  const email = useInput("", { minLength: 5, isEmail: false, isEmpty: true });
  const password = useInput("", { minLength: 5, isEmpty: true });
  const [isBtnActive, setIsBtnActive] = useState(false);

  useEffect(() => {
    setIsValid(email.inputValid && password.inputValid);
  }, [email.inputValid, password.inputValid]);

  useEffect(() => {
    if (isValid && status !== "loading") setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [isValid, status]);

  useEffect(() => {
    if (authErrorMessage) alert(authErrorMessage);
  }, [authErrorMessage]);

  const loginFunc = () => {
    isBtnActive &&
      dispatch(login({ email: email.value, password: password.value }));
  };

  return (
    <div
      onClick={setIsActive}
      className={`${s.root} ${isActive ? s.active : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={s.content}>
        <h2>Войти</h2>
        <form onSubmit={(e) => e.preventDefault()} className={s.form} action="">
          <div className={s.inputs}>
            <div className={s.input__block}>
              <span>Электронная почта</span>
              <Input
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                option="form"
                type="email"
                placeholder="Введите Email"
                w={500}
                isRequired
                isError={!!email.errorMsg}
              />
            </div>
            <div className={s.input__block}>
              <span>Пароль</span>
              <Input
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
                option="form"
                type="password"
                placeholder="Введите пароль"
                w={500}
                isRequired
                isError={!!password.errorMsg}
              />
            </div>
          </div>
          <p className={s.descr}>
            <span className={s.red}>*</span> - обязательное поле
          </p>
          <p className={s.reg_link}>
            Еще нет аккаунта?{" "}
            <button onClick={setIsRegisterActive}>Зарегистрируйтесь</button>
          </p>
          <button
            type="button"
            className={`btn ${s.btn} ${!isBtnActive ? "btn-disabled" : ""}`}
            onClick={loginFunc}
          >
            Войти
          </button>
          <div className={s.links}>
            <button className={s.link}>
              <Google />
              <span>Войти через Google</span>
            </button>
            <button className={s.link}>
              <Facebook />
              <span>Войти через Facebook</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
