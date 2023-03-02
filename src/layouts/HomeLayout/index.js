import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";
import Routes from "../../constants/routes";
import { actUpdateCallbackUrl } from "../../redux/features/auth/authSlice";

import "./style.scss";

const HomeLayout = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  if (!isAuth) {
    dispatch(actUpdateCallbackUrl(location.pathname));
    return <Navigate to={Routes.LOGIN_PAGE} />;
  }

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
