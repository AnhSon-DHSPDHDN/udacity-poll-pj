import React from "react";
import "./style.scss";

const LeaderBoardPage = () => {
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
        <tbody>
          <tr>
            <td>
              <div className="leader-board__table-user-column">
                <img
                  className="leader-board__avatar"
                  alt="avatar"
                  src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
                />
                <div className="leader-board__user-info">
                  <span className="leader-board__name text-bold">Anh Son</span>
                  <span className="leader-board__username">tranvananhson</span>
                </div>
              </div>
            </td>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="leader-board__table-user-column">
                <img
                  className="leader-board__avatar"
                  alt="avatar"
                  src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
                />
                <div className="leader-board__user-info">
                  <span className="leader-board__name text-bold">Anh Son</span>
                  <span className="leader-board__username">tranvananhson</span>
                </div>
              </div>
            </td>
            <td>2</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardPage;
