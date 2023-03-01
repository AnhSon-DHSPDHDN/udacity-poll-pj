import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { addPollSchema } from "../../validations/addPollSchema";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { actFetchCreateQuestion } from "../../redux/features/questions/questionsSlice";

const initialFormValue = {
  firstOption: "",
  secondOption: "",
};

const NewPollPage = () => {
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(addPollSchema),
  });
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = methods;

  const onValid = (values) => {
    const payload = {
      optionOneText: values.firstOption,
      optionTwoText: values.secondOption,
      author: userInfo.id,
    };

    dispatch(actFetchCreateQuestion(payload));
  };

  return (
    <div className="new-poll-page">
      <h3 className="new-poll-page__title">Would You Rather</h3>
      <span className="mt-4">Create Your Own Poll</span>

      <form className="new-poll-page__form" onSubmit={handleSubmit(onValid)}>
        <label className="new-poll-page__form-label" htmlFor="firstOption">
          First Option
        </label>
        <Controller
          name="firstOption"
          control={control}
          render={({ field: { onChange, value } }) => (
            <textarea
              className="new-poll-page__form-input"
              id="firstOption"
              name="firstOption"
              value={value}
              onChange={onChange}
            />
          )}
        />
        {!!errors.firstOption && (
          <span className="text-error">{errors.firstOption?.message}</span>
        )}

        <label
          className="new-poll-page__form-label mt-4"
          htmlFor="secondOption"
        >
          Second Option
        </label>
        <Controller
          name="secondOption"
          control={control}
          render={({ field: { onChange, value } }) => (
            <textarea
              className="new-poll-page__form-input"
              id="secondOption"
              name="secondOption"
              onChange={onChange}
              value={value}
            />
          )}
        />
        {!!errors.secondOption && (
          <span className="text-error">{errors.secondOption?.message}</span>
        )}

        <button className="new-poll-page__form-btn mt-4">Submit</button>
      </form>
    </div>
  );
};

export default NewPollPage;
