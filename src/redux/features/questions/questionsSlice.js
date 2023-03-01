import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../../apis/data";
import Routes from "../../../constants/routes";
import { globalNavigate } from "../../../untils/GlobalHistory";
import { actFetchUsers } from "../auth/authSlice";

const initialState = {
  newQuestions: [],
  doneQuestions: [],
  questions: {},
  isLoading: false,
  isLoadingAnswer: false,
  isLoadingCreateQuestion: false,
};

export const actFetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (currentUserId, thunkAPI) => {
    try {
      const allQuestions = await _getQuestions();
      const newQuestions = [];
      const doneQuestions = [];
      const mapQuestions = Object.values(allQuestions);

      for (const question of mapQuestions) {
        const isAnswer = [
          ...question?.optionOne?.votes,
          ...question?.optionTwo?.votes,
        ].includes(currentUserId);

        if (isAnswer) {
          doneQuestions.push(question);
        } else {
          newQuestions.push(question);
        }
      }

      newQuestions.sort(
        (prevQuestion, crrQuestion) =>
          crrQuestion.timestamp - prevQuestion.timestamp
      );
      doneQuestions.sort(
        (prevQuestion, crrQuestion) =>
          crrQuestion.timestamp - prevQuestion.timestamp
      );

      return { allQuestions, doneQuestions, newQuestions };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const actFetchAnswerQuestion = createAsyncThunk(
  "questions/fetchAnswerQuestion",
  async ({ authedUser, qid, answer }, thunkAPI) => {
    try {
      await _saveQuestionAnswer({ authedUser, qid, answer });
      thunkAPI.dispatch(actFetchQuestions());
      thunkAPI.dispatch(actFetchUsers());
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const actFetchCreateQuestion = createAsyncThunk(
  "question/fetchCreateQuestion",
  async (formData, thunkAPI) => {
    try {
      await _saveQuestion(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actFetchQuestions.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchQuestions.fulfilled, (state, action) => {
      const { allQuestions, doneQuestions, newQuestions } = action.payload;
      state.isLoading = false;
      state.questions = allQuestions;
      state.doneQuestions = doneQuestions;
      state.newQuestions = newQuestions;
    });
    builder.addCase(actFetchQuestions.rejected, (state, _) => {
      state.isLoading = false;
      state.questions = {};
      state.doneQuestions = [];
      state.newQuestions = [];
    });
    builder.addCase(actFetchAnswerQuestion.pending, (state, _) => {
      state.isLoadingAnswer = true;
    });
    builder.addCase(actFetchAnswerQuestion.rejected, (state, _) => {
      state.isLoadingAnswer = false;
    });
    builder.addCase(actFetchAnswerQuestion.fulfilled, (state, _) => {
      state.isLoadingAnswer = false;
    });
    builder.addCase(actFetchCreateQuestion.pending, (state, _) => {
      state.isLoadingCreateQuestion = true;
    });
    builder.addCase(actFetchCreateQuestion.rejected, (state, _) => {
      state.isLoadingCreateQuestion = false;
    });
    builder.addCase(actFetchCreateQuestion.fulfilled, (state, _) => {
      state.isLoadingCreateQuestion = false;
      toast.success("Create poll success!");
      globalNavigate(Routes.HOME_PAGE);
    });
  },
});

export default questionSlice.reducer;
