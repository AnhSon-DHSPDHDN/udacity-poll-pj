import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUsers } from "../../redux/features/auth/authSlice";
import "./style.scss";

const LeaderBoardPage = () => {
  const { users } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const computedDataTable = useMemo(() => {
    const usersLeaderBoard = Object.values(users);
    usersLeaderBoard.sort((prevUser, crrUser) => {
      const prevUserAnswer = Object.keys(prevUser.answers).length;
      const crrUserAnswer = Object.keys(crrUser.answers).length;
      if (crrUserAnswer - prevUserAnswer === 0) {
        return crrUser.questions.length - prevUser.questions.length;
      }

      return crrUserAnswer - prevUserAnswer;
    });

    return usersLeaderBoard;
  }, [users]);

  useEffect(() => {
    dispatch(actFetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDataTable = (users) =>
    users.map((user) => (
      <tr key={user.id}>
        <td>
          <div className="leader-board__table-user-column">
            <img
              className="leader-board__avatar"
              alt="avatar"
              src={user.avatarURL}
            />
            <div className="leader-board__user-info">
              <span className="leader-board__name text-bold">{user.name}</span>
              <span className="leader-board__username">{user.id}</span>
            </div>
          </div>
        </td>
        <td>{Object.keys(user.answers).length}</td>
        <td>{user.questions?.length}</td>
      </tr>
    ));

  return (
    <div className="leader-board">
      <table className="leader-board__table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answers</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>{renderDataTable(computedDataTable)}</tbody>
      </table>
    </div>
  );
};

export default LeaderBoardPage;
