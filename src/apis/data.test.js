import { _saveQuestion, _saveQuestionAnswer } from "./data";

describe("Test function _DATA.JS", () => {
  it("Verify _saveQuestion Return value", async () => {
    const payload = {
      optionOneText: "option 1",
      optionTwoText: "option 2",
      author: "johndoe",
    };

    const result = await _saveQuestion(payload);
    expect(result.optionOne.text).toEqual("option 1");
    expect(result.optionTwo.text).toEqual("option 2");
    expect(result.author).toEqual("johndoe");
  });
  it("Verify _saveQuestion return error when payload incorrect", async () => {
    const payload = {
      param1: "option 1",
      param2: "option 2",
      param3: "johndoe",
    };

    const result = await _saveQuestion(payload).catch((error) => error);
    expect(result).toEqual("Please input correct parameter");
  });
  it("Verify _saveQuestionAnswer Return value", async () => {
    const payload = {
      authedUser: "johndoe",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    const result = await _saveQuestionAnswer(payload);
    expect(result).toBeTruthy();
  });
  it("Verify _saveQuestionAnswer return error when payload incorrect", async () => {
    const payload = {
      param1: "option 1",
      param2: "option 2",
      param3: "johndoe",
    };

    const result = await _saveQuestionAnswer(payload).catch((error) => error);
    expect(result).toEqual("Please input correct parameter");
  });
});
