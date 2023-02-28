import React from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../../constants/routes";

const PollCard = () => {
  const navigate = useNavigate();

  const handleNavigateDetailPoll = (pollId) => {
    navigate(Routes.DETAIL_POLL);
  };

  return (
    <div className="poll-card">
      <span className="poll-card__name">Question Name</span>
      <span className="poll-card__create-at">13:00 PM | 21/02/2023</span>
      <div className="poll-card__btn mt-4">
        <button
          className="poll-card__btn-show"
          onClick={handleNavigateDetailPoll}
        >
          Show
        </button>
      </div>
    </div>
  );
};

export default PollCard;
