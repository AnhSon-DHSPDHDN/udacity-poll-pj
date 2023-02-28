import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newQuestion: [],
  doneQuestion: [],
  questions: {},
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default questionSlice.reducer;
