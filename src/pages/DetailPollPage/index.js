import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Routes from "../../constants/routes";
import {
  actFetchAnswerQuestion,
  actFetchQuestions,
} from "../../redux/features/questions/questionsSlice";
import "./style.scss";

const Question = ({ option, name, question, currentUser, isDisableAnswer }) => {
  const dispatch = useDispatch();

  const handleAnswerQuestion = (questionName) => {
    const payload = {
      authedUser: currentUser.id,
      qid: question.id,
      answer: questionName,
    };

    dispatch(actFetchAnswerQuestion(payload));
  };

  return (
    <div className="question">
      <span className="question__name">{option?.text}</span>
      <button
        className="question__btn-choose"
        onClick={() => handleAnswerQuestion(name)}
        disabled={isDisableAnswer}
      >
        Click
      </button>
    </div>
  );
};

const DetailPollPage = () => {
  const { question_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, isLoading, isLoadingAnswer } = useSelector(
    (state) => state.questions
  );
  const { users, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(actFetchQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(questions).length && !questions[question_id]) {
      navigate(Routes.NOT_FOUND);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, question_id]);

  const currentQuestion = useMemo(
    () => questions[question_id] || {},
    [question_id, questions]
  );

  const isHasAnswer = [
    ...(currentQuestion?.optionOne?.votes || []),
    ...(currentQuestion?.optionTwo?.votes || []),
  ].includes(userInfo.id);

  const isDisableAnswer = isLoadingAnswer || isLoading || isHasAnswer;

  const computedRateChooseOption = (question, name) => {
    const totalAnswerNumber =
      [...question?.optionOne?.votes, ...question?.optionTwo?.votes].length ||
      1;
    const currentAnswerNumber = question?.[name]?.votes.length || 0;

    return (currentAnswerNumber * 100) / totalAnswerNumber + " %";
  };

  return (
    <div className="detail-poll-page">
      <span className="detail-poll-page__create-by text-bold">
        Poll by {currentQuestion.author}
      </span>
      <img
        className="detail-poll-page__avatar mt-4 mb-4"
        alt="avatar"
        src={users[currentQuestion.author]?.avatarURL}
      />
      <span className="detail-poll-page__title mb-4 text-bold">
        Would You Rather?
      </span>
      <div className="detail-poll-page__questions-container">
        <div>
          <Question
            option={currentQuestion.optionOne}
            question={currentQuestion}
            name={"optionOne"}
            currentUser={userInfo}
            isDisableAnswer={isDisableAnswer}
          />
          {isHasAnswer && (
            <>
              <p className="text-error">
                Number of people who chose the answer:{" "}
                {currentQuestion.optionOne.votes?.length || 0}
              </p>
              <p className="text-error">
                Answer selection rate:{" "}
                {computedRateChooseOption(currentQuestion, "optionOne")}
              </p>
            </>
          )}
        </div>
        <div>
          <Question
            option={currentQuestion.optionTwo}
            question={currentQuestion}
            name={"optionTwo"}
            currentUser={userInfo}
            isDisableAnswer={isDisableAnswer}
          />
          {isHasAnswer && (
            <>
              <p className="text-error">
                Number of people who chose the answer:{" "}
                {currentQuestion.optionTwo.votes?.length || 0}
              </p>
              <p className="text-error">
                Answer selection rate:{" "}
                {computedRateChooseOption(currentQuestion, "optionTwo")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPollPage;
