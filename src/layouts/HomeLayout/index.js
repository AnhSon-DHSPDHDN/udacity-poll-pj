import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";
import Routes from "../../constants/routes";

import "./style.scss";

const HomeLayout = () => {
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) return <Navigate to={Routes.LOGIN_PAGE} replace />;

  return (
    <div className="home-layout">
      <HomeHeader />
      <div className="home-layout__main-page">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
