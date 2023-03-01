import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupPolls from "../../components/GroupPolls";
import Loading from "../../components/Loading";
import { actFetchQuestions } from "../../redux/features/questions/questionsSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { newQuestions, doneQuestions, isLoading } = useSelector(
    (state) => state.questions
  );

  useEffect(() => {
    dispatch(actFetchQuestions(userInfo?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div className="home-page">
      {isLoading && <Loading />}

      {!isLoading && !!newQuestions.length && (
        <GroupPolls title="New Questions" questions={newQuestions} />
      )}

      {!isLoading && !!doneQuestions.length && (
        <GroupPolls
          className="mt-8"
          title="Done Questions"
          questions={doneQuestions}
        />
      )}
    </div>
  );
};

export default HomePage;
