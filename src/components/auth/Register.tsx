import React, { useState, useEffect } from "react";
import Input from "../ui/input/Input";
import { ReactComponent as Google } from "../../assets/images/auth/google.svg";
import { ReactComponent as Facebook } from "../../assets/images/auth/facebook.svg";
import { ReactComponent as Success } from "../../assets/images/auth/success.svg";
import { RootState, useAppDispatch } from "../../store/store";
import { register } from "../../store/slices/profileSlice";
import { useInput } from "../../hooks/useInput";
import { useSelector } from "react-redux";
import s from "./auth.module.css";

interface RegisterProps {
  isActive: boolean;
  setIsActive: () => void;
}

const Register: React.FC<RegisterProps> = ({ isActive, setIsActive }) => {
  const dispatch = useAppDispatch();
  const { status, isAuth, authErrorMessage } = useSelector(
    (state: RootState) => state.profile
  );
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const name = useInput("", { minLength: 4, isEmpty: true, isSWBL: true });
  const tel = useInput("", { minLength: 4, isEmpty: true });
  const email = useInput("", { minLength: 4, isEmail: false, isEmpty: true });
  const password = useInput("", { minLength: 3, isEmpty: true });
  const confPassword = useInput("", {
    minLength: 3,
    isEmpty: true,
    confirmTo: password.value,
  });

  useEffect(() => {
    setIsValid(
      email.inputValid &&
        name.inputValid &&
        tel.inputValid &&
        password.inputValid &&
        confPassword.inputValid
    );
  }, [
    email.inputValid,
    name.inputValid,
    tel.inputValid,
    password.inputValid,
    confPassword.inputValid,
  ]);

  useEffect(() => {
    if (isValid && status !== "loading")
      setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [isValid, status]);

  useEffect(() => {
    if(authErrorMessage) alert(authErrorMessage)
  }, [authErrorMessage])

  const registerFunc = () => {
    isBtnActive &&
      dispatch(
        register({
          name: name.value,
          tel: tel.value,
          email: email.value,
          password: password.value,
          confirmPassword: confPassword.value,
        })
      );
  };

  return (
    <div
      onClick={setIsActive}
      className={`${s.root} ${isActive ? s.active : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={`${s.content} ${isAuth ? s.success : ''}`}>
        {isAuth ? (
          <>
            <h2>Регистрация завершена</h2>
            <Success />
            <button onClick={setIsActive} className={`btn ${s.btn}`}>Отлично!</button>
          </>
        ) : (
          <>
            <h2>Пожалуйста зарегистрируйтесь</h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className={s.form}
              action=""
            >
              <div className={s.inputs}>
                <div className={s.input__block}>
                  <span>Фамилия имя и отчество</span>
                  <Input
                    value={name.value}
                    onChange={name.onChange}
                    onBlur={name.onBlur}
                    option="form"
                    placeholder="Введите ФИО"
                    w={500}
                    isRequired
                    isError={!!name.errorMsg}
                  />
                </div>
                <div className={s.input__block}>
                  <span>Номер телефона</span>
                  <Input
                    value={tel.value}
                    onChange={tel.onChange}
                    onBlur={tel.onBlur}
                    option="form"
                    type="tel"
                    placeholder="Введите номер телефона"
                    w={500}
                    isRequired
                    isError={!!tel.errorMsg}
                  />
                </div>
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
                <div className={s.input__block}>
                  <span>Подтвердите пароль</span>
                  <Input
                    value={confPassword.value}
                    onChange={confPassword.onChange}
                    onBlur={confPassword.onBlur}
                    option="form"
                    type="password"
                    placeholder="Подтвердите пароль"
                    w={500}
                    isRequired
                    isError={!!confPassword.errorMsg}
                  />
                </div>
              </div>
              <p className={s.descr}>
                <span className={s.red}>*</span> - обязательное поле
              </p>
              <button
                onClick={registerFunc}
                type="button"
                className={`btn ${s.btn} ${!isBtnActive ? "btn-disabled" : ""}`}
              >
                Зарегистрироваться
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
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Register);
