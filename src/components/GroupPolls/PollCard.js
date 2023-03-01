import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import Routes from "../../constants/routes";
import format from "date-fns/format";

const PollCard = ({ question }) => {
  const navigate = useNavigate();

  const handleNavigateDetailPoll = (pollId) => {
    navigate(generatePath(Routes.DETAIL_POLL, { question_id: pollId }));
  };

  return (
    <div className="poll-card">
      <span className="poll-card__name">{question.author}</span>
      <span className="poll-card__create-at">
        {format(question.timestamp, "HH:mm a | dd/MM/yyyy")}
      </span>
      <div className="poll-card__btn mt-4">
        <button
          className="poll-card__btn-show"
          onClick={() => handleNavigateDetailPoll(question.id)}
        >
          Show
        </button>
      </div>
    </div>
  );
};

export default PollCard;
