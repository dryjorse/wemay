import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
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
