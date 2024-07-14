import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../assets/images/login.jpg";
import { showErrorMessage, showSuccessMessage } from "../../utils/toast";
import { useLoginAccount } from "../../hooks/auth.hook";
import { setCookie } from "../../utils/cookie";
import { getValue } from "../../utils/object";
import { useAuthContext } from "../../hooks/contextConsumer.hook";
import { AUTH_COOKIE_CONFIG } from "../../constants/common";
import { PATH } from "../../constants/path";
import Button from "../../components/common/Button/Button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import CustomInput from "../../components/form/custom/CustomInput";
import CustomLabel from "../../components/form/custom/CustomLabel";

type Inputs = {
  email: string,
  password: string,
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  // const methods = useForm();
  const methods = useForm();
  const { mutateAsync: loginAccount, isPending } = useLoginAccount();
  const { setIsLoggedIn } = useAuthContext();
  const { errors } = methods.formState;
  const {watch} = methods;
  // const { errors } = methods.formState;
  // const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const resData = {
        email: data.email,
        password: data.password,
      };

      const response = await loginAccount(resData);
      console.log("response", response);

      // const refresh = getValue(response, "refresh");
      // const access = getValue(response, "access");
      // setCookie({
      //   cookieName: AUTH_COOKIE_CONFIG.loggedInCookie,
      //   value: "true",
      //   expiresIn: 1,
      // });
      // setCookie({
      //   cookieName: AUTH_COOKIE_CONFIG.ACCESS_TOKEN,
      //   value: access,
      //   expiresIn: 1,
      // });
      // setCookie({
      //   cookieName: AUTH_COOKIE_CONFIG.REFRESH_TOKEN,
      //   value: refresh,
      //   expiresIn: 1,
      // });
      setIsLoggedIn(true);
      showSuccessMessage(getValue(response, "message"));
      navigate(PATH.dashboard);
    } catch (err) {
      showErrorMessage(getValue(err, "message"));
    }
  };
  
  const handleOnClick = () => {
    () => { methods.handleSubmit(onSubmit)() }
  }
  

  return (
    <div className="flex flex-col gap-5">
      <p
        className="font-bodonimodasc text-primary-900 text-center"
        style={{ fontSize: "32px" }}
      >
        WishMaker
      </p>
      <p
        style={{ fontSize: "31px" }}
        className="font-bold py-15 text-center"
      >
        Sign In
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <CustomLabel title="Email" />
              <CustomInput styles="py-4 px-2 rounded w-[492px]" type="email" name="email" required={true} placeHolder="Enter your Email" />
            </div>

            <div className="flex flex-col gap-1">
              <CustomLabel title="Password" />
              <CustomInput styles="py-4 px-2 rounded w-[492px]" type="password" name="password" required={true} placeHolder="Enter your Password" />
            </div>

            <p className="text-black-faded text-center">Forgot password?</p>
            <Button title="Sign In" onClick={handleOnClick} />
          </div>
        </form>

      </FormProvider>

      <p className="text-center"> Or</p>
      <button className="w-full font-bold border border-black-faded border-2 py-3 rounded-lg">
        Sign In With Google
      </button>

      <p className="text-center">
        <span className="text-black-faded">Don't have an account?</span>
        <span className="text-primary-900 font-bold cursor-pointer">  <Link
          to="/signup"
        >
          Sign Up Now
        </Link></span>
      </p>
    </div>

  );
};

export default Login;
