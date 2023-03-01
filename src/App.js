import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootRoutes from "./constants/routes";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import NewPollPage from "./pages/NewPollPage";
import DetailPollPage from "./pages/DetailPollPage";
import PageNotFound from "./pages/PageNotFound";
import { GlobalHistory } from "./untils/GlobalHistory";

function App() {
  return (
    <BrowserRouter>
      <GlobalHistory />
      <Routes>
        <Route path={RootRoutes.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={RootRoutes.HOME_PAGE} element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path={RootRoutes.LEADER_BOARD} element={<LeaderBoardPage />} />
          <Route path={RootRoutes.ADD_POLL} element={<NewPollPage />} />
          <Route path={RootRoutes.DETAIL_POLL} element={<DetailPollPage />} />
        </Route>
        <Route path={RootRoutes.NOT_FOUND} element={<PageNotFound />} />
        <Route path="*" element={<Navigate to={RootRoutes.NOT_FOUND} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
