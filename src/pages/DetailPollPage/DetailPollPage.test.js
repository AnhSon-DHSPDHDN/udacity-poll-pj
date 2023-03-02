import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import DetailPollPage from ".";
import { renderWithAllProvider } from "../../untils/testUtils";
import * as redux from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { act } from "react-dom/test-utils";

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
  };
});

describe("Detail Poll Page", () => {
  beforeEach(() => {
    const mockStateRedux = {
      questions: {
        questions: {
          am8ehyc8byjqgar0jgpub9: {
            id: "am8ehyc8byjqgar0jgpub9",
            author: "sarahedo",
            timestamp: 1488579767190,
            optionOne: {
              votes: [],
              text: "be telekinetic",
            },
            optionTwo: {
              votes: ["sarahedo"],
              text: "be telepathic",
            },
          },
        },
        isLoading: false,
        isLoadingAnswer: false,
      },
      auth: {
        users: {
          sarahedo: {
            id: "sarahedo",
            password: "123456",
            name: "Sarah Edo",
            avatarURL: `${process.env.PUBLIC_URL}/imgs/avt_1.jpeg`,
            answers: {
              "8xf0y6ziyjabvozdd253nd": "optionOne",
              "6ni6ok3ym7mf1p33lnez": "optionOne",
              am8ehyc8byjqgar0jgpub9: "optionTwo",
              loxhs1bqm25b708cmbf3g: "optionTwo",
            },
            questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
          },
          tylermcginnis: {
            id: "tylermcginnis",
            password: "123456",
            name: "Tyler McGinnis",
            avatarURL: `${process.env.PUBLIC_URL}/imgs/avt_3.jpeg`,
            answers: {
              vthrdm985a262al8qx3do: "optionOne",
              xj352vofupe1dqz9emx13r: "optionTwo",
            },
            questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
          },
          johndoe: {
            id: "johndoe",
            password: "123456",
            name: "John Doe",
            avatarURL: `${process.env.PUBLIC_URL}/imgs/avt_2.jpeg`,
            answers: {
              xj352vofupe1dqz9emx13r: "optionOne",
              vthrdm985a262al8qx3do: "optionTwo",
              "6ni6ok3ym7mf1p33lnez": "optionOne",
            },
            questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
          },
        },
        userInfo: {
          id: "johndoe",
          password: "123456",
          name: "John Doe",
          avatarURL: `${process.env.PUBLIC_URL}/imgs/avt_2.jpeg`,
          answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
            vthrdm985a262al8qx3do: "optionTwo",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
          },
          questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
        },
        isAuth: true,
      },
    };

    jest
      .spyOn(redux, "useSelector")
      .mockImplementation((callback) => callback(mockStateRedux));
  });
  test("Render Detail Poll Page", () => {
    const { wrapper } = renderWithAllProvider(
      <Routes>
        <Route path={"/questions/:question_id"} element={<DetailPollPage />} />
      </Routes>,
      {
        initialEntries: ["/questions/am8ehyc8byjqgar0jgpub9"],
      }
    );
    const expectElement = screen.getByText(/Would You Rather?/i);
    expect(expectElement).toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
  test("Leave Detail Poll Page", () => {
    const { wrapper } = renderWithAllProvider(
      <Routes>
        <Route
          path={"/questions/:question_id"}
          element={
            <HomeLayout>
              <DetailPollPage />
            </HomeLayout>
          }
        />
        <Route path={"/"} element={<HomeLayout></HomeLayout>} />
      </Routes>,
      {
        initialEntries: ["/questions/am8ehyc8byjqgar0jgpub9"],
      }
    );
    const elementLeaderBoard = screen.getByText(/Home/i);
    act(() => {
      elementLeaderBoard.click();
    });
    expect(screen.queryByText(/Would You Rather?/i)).not.toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
  test("Render Poll by sarahedo", () => {
    const { wrapper } = renderWithAllProvider(
      <Routes>
        <Route path={"/questions/:question_id"} element={<DetailPollPage />} />
      </Routes>,
      {
        initialEntries: ["/questions/am8ehyc8byjqgar0jgpub9"],
      }
    );
    const elementPollByUser = screen.getByText(/Poll by sarahedo/i);
    expect(elementPollByUser).toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
  test("Render option One", () => {
    const { wrapper } = renderWithAllProvider(
      <Routes>
        <Route path={"/questions/:question_id"} element={<DetailPollPage />} />
      </Routes>,
      {
        initialEntries: ["/questions/am8ehyc8byjqgar0jgpub9"],
      }
    );
    const elementOptionOne = screen.getByText(/be telekinetic/i);
    expect(elementOptionOne).toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
  test("Render option Two", () => {
    const { wrapper } = renderWithAllProvider(
      <Routes>
        <Route path={"/questions/:question_id"} element={<DetailPollPage />} />
      </Routes>,
      {
        initialEntries: ["/questions/am8ehyc8byjqgar0jgpub9"],
      }
    );
    const elementOptionTwo = screen.getByText(/be telepathic/i);
    expect(elementOptionTwo).toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
  test("Render logout btn", () => {
    const { wrapper } = renderWithAllProvider(
      <Routes>
        <Route
          path={"/questions/:question_id"}
          element={
            <HomeLayout>
              <DetailPollPage />
            </HomeLayout>
          }
        />
      </Routes>,
      {
        initialEntries: ["/questions/am8ehyc8byjqgar0jgpub9"],
      }
    );
    const elementLogoutBtn = screen.getByText(/Logout/i);
    expect(elementLogoutBtn).toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
});
