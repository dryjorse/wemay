import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const MainLayout: React.FC = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const handleIsActiveLogin = () => {
    setIsLoginActive((bool) => !bool);
  };

  const handleIsActiveRegister = () => {
    setIsLoginActive(false);
    setIsRegisterActive((bool) => !bool);
  };

  useEffect(() => {
    document.body.style.overflow = (isLoginActive || isRegisterActive) ? "hidden" : "";
  }, [isLoginActive, isRegisterActive]);

  return (
    <>
      <Header openLogin={handleIsActiveLogin} />
      {/* <Login
        isActive={isLoginActive}
        setIsActive={handleIsActiveLogin}
        setIsRegisterActive={handleIsActiveRegister}
      />
      <Register
        isActive={isRegisterActive}
        setIsActive={handleIsActiveRegister}
      /> */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
