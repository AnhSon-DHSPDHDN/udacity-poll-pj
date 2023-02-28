import React from "react";
import Routes from "../../constants/routes";
import TabsLink from "./TabsLink";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { actLogout } from "../../redux/features/auth/authSlice";

const HomeHeader = () => {
  const links = [
    { to: Routes.HOME_PAGE, label: "Home" },
    { to: Routes.LEADER_BOARD, label: "Leader board" },
    { to: Routes.ADD_POLL, label: "New" },
  ];
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(actLogout());
  };

  return (
    <div className="home-header">
      <TabsLink links={links} />
      <div className="home-header__right-container">
        <div className="home-header__info-user">
          <img
            className="home-header__avatar mr-2"
            alt="avatar"
            src={userInfo?.avatarURL}
          />
          <span className="text-bold">{userInfo?.id}</span>
        </div>
        <button className="home-header__btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
