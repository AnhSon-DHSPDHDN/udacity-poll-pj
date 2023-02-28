import React from "react";
import "./style.scss";

const NewPollPage = () => {
  return (
    <div className="new-poll-page">
      <h3 className="new-poll-page__title">Would You Rather</h3>
      <span className="mt-4">Create Your Own Poll</span>

      <form className="new-poll-page__form">
        <label className="new-poll-page__form-label" htmlFor="firstOption">
          First Option
        </label>
        <textarea
          className="new-poll-page__form-input"
          id="firstOption"
          name="firstOption"
        />

        <label
          className="new-poll-page__form-label mt-4"
          htmlFor="secondOption"
        >
          Second Option
        </label>
        <textarea
          className="new-poll-page__form-input"
          id="secondOption"
          name="secondOption"
        />

        <button className="new-poll-page__form-btn mt-4">Submit</button>
      </form>
    </div>
  );
};

export default NewPollPage;
