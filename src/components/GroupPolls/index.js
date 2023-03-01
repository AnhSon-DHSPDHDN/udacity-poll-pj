import React from "react";
import Divider from "../Divider";
import PollCard from "./PollCard";
import clsx from "clsx";
import "./style.scss";

const GroupPolls = ({ title = "", questions = [], className = "" }) => {
  const renderPoll = (questions) =>
    questions.map((question) => (
      <PollCard key={question.id} question={question} />
    ));

  return (
    <div className={clsx("group-poll-wrapper", className)}>
      <h2 className="group-poll-wrapper__title text-center">{title}</h2>
      <Divider className={"mt-4"} />
      <div className="group-poll">{renderPoll(questions)}</div>
    </div>
  );
};

export default GroupPolls;
