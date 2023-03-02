import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { loginSchema } from "../../validations/loginSchema";
import { actLogin } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const initialFormValue = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading, loginError, callbackUrl } = useSelector(
    (state) => state.auth
  );
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (values) => {
    dispatch(actLogin(values));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(callbackUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit(onValid)}>
          <h1 className="login-form__title">Login</h1>
          {!!loginError && <span className="text-error">{loginError}</span>}
          <div className="login-form__container flex">
            <label className="login-form__label text-bold">Username</label>
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  className="login-form__input"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <span className="text-error">
              {errorsValidate.username && errorsValidate.username?.message}
            </span>
          </div>
          <div className="login-form__container flex mt-2">
            <label className="login-form__label text-bold">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <input
                  className="login-form__input"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <span className="text-error">
              {errorsValidate.password && errorsValidate.password?.message}
            </span>
          </div>
          <div className="flex mt-4 mb-6 justify-center">
            <button
              className="login-form__btn-submit"
              type="submit"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
