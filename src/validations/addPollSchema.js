import * as Yup from "yup";

export const addPollSchema = Yup.object({
  firstOption: Yup.string().required("firstOption is required"),
  secondOption: Yup.string().required("secondOption is required"),
});
