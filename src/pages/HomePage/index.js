import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupPolls from "../../components/GroupPolls";
import Loading from "../../components/Loading";
import SwitchButton from "../../components/SwitchBtn";
import { actFetchQuestions } from "../../redux/features/questions/questionsSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const [isShowDoneQuestion, setIsShowDoneQuestion] = useState(false);
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
      {!isLoading && (
        <div className="flex align-center mb-4">
          <SwitchButton
            checked={isShowDoneQuestion}
            onChange={() => setIsShowDoneQuestion(!isShowDoneQuestion)}
          />
          <span className="ml-4">View done questions</span>
        </div>
      )}

      {!isLoading && !!newQuestions.length && !isShowDoneQuestion && (
        <GroupPolls title="New Questions" questions={newQuestions} />
      )}

      {!isLoading && !!doneQuestions.length && isShowDoneQuestion && (
        <GroupPolls title="Done Questions" questions={doneQuestions} />
      )}
    </div>
  );
};

export default HomePage;
