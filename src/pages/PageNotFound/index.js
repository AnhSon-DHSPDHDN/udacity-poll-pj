import React from "react";
import HomeHeader from "../../components/HomeHeader";
import "../../layouts/HomeLayout/style.scss";

const PageNotFound = () => {
  return (
    <div className="home-layout">
      <HomeHeader />
      <div className="home-layout__main-page">
        <h1>404 Page Not Found</h1>{" "}
      </div>
    </div>
  );
};

export default PageNotFound;
