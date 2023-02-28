import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootRoutes from "./constants/routes";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NewPollPage from "./pages/NewPollPage";
import DetailPollPage from "./pages/DetailPollPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RootRoutes.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={RootRoutes.HOME_PAGE} element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path={RootRoutes.LEADER_BOARD} element={<LeaderBoardPage />} />
          <Route path={RootRoutes.ADD_POLL} element={<NewPollPage />} />
          <Route path={RootRoutes.DETAIL_POLL} element={<DetailPollPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
