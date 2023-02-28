import React from "react";
import Divider from "../Divider";
import PollCard from "./PollCard";
import "./style.scss";

const GroupPolls = () => {
  return (
    <div className="group-poll-wrapper">
      <h2 className="group-poll-wrapper__title text-center">Title</h2>
      <Divider className={"mt-4"} />
      <div className="group-poll">
        <PollCard />
        <PollCard />
        <PollCard />
      </div>
    </div>
  );
};

export default GroupPolls;
