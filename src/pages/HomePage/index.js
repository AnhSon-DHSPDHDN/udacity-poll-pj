import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GroupPolls from "../../components/GroupPolls";
const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div className="home-page">
      <GroupPolls />
    </div>
  );
};

export default HomePage;
