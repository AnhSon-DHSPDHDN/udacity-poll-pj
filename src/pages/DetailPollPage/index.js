import React from "react";
import "./style.scss";

const Question = () => {
  return (
    <div className="question">
      <span className="question__name">
        Build our new application with JavaScript
      </span>
      <button className="question__btn-choose">Click</button>
    </div>
  );
};

const DetailPollPage = () => {
  return (
    <div className="detail-poll-page">
      <span className="detail-poll-page__create-by text-bold">
        Poll by Account test
      </span>
      <img
        className="detail-poll-page__avatar mt-4 mb-4"
        alt="avatar"
        src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
      />
      <span className="detail-poll-page__title mb-4 text-bold">
        Would You Rather
      </span>
      <div className="detail-poll-page__questions-container">
        <Question />
        <Question />
      </div>
    </div>
  );
};

export default DetailPollPage;
