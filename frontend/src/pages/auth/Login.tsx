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

type Inputs = {
  email: string,
  password: string,
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  // const methods = useForm();
  const methods = useForm();
  // const { mutateAsync: loginAccount, isPending } = useLoginAccount();
  const { setIsLoggedIn } = useAuthContext();
  const { errors } = methods.formState; 
  // const { errors } = methods.formState;
  const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);
  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     const resData = {
  //       email: data.email,
  //       password: data.password,
  //     };
  //     console.log("resData", resData);
      
  //     const response = await loginAccount(resData);
  //     const refresh = getValue(response, "refresh");
  //     const access = getValue(response, "access");
  //     setCookie({
  //       cookieName: AUTH_COOKIE_CONFIG.loggedInCookie,
  //       value: "true",
  //       expiresIn: 1,
  //     });
  //     setCookie({
  //       cookieName: AUTH_COOKIE_CONFIG.ACCESS_TOKEN,
  //       value: access,
  //       expiresIn: 1,
  //     });
  //     setCookie({
  //       cookieName: AUTH_COOKIE_CONFIG.REFRESH_TOKEN,
  //       value: refresh,
  //       expiresIn: 1,
  //     });
  //     setIsLoggedIn(true);
  //     showSuccessMessage(getValue(response, "message"));
  //     navigate(PATH.dashboard);
  //   } catch (err) {
  //     showErrorMessage(getValue(err, "message"));
  //   }
  // };

  return (
    <div className="w-full flex flex-wrap  justify-center   lg:justify-between  h-screen px-6 lg:px-0 overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-20 lg:mt-32">
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <h2 className="text-3xl font-bold">Welcome back! ✨</h2>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <CustomInput
                name="email"
                placeHolder="Enter your email"
                type="text"
                required={true}
              ></CustomInput>
              <CustomInput 
              name="password"
              placeHolder="Enter your password"
              type="password"
              required={true}
              ></CustomInput>

          
              <button type="submit">Sign In</button>
            </form>
          </FormProvider>


          <div className="border-t border-gray-500 pt-4">
            {/* <p className="text-gray-500 font-light text-sm">
              New to Hye?
              <Link
                to={PATH.signUp}
                className="pl-2 text-[#6366f1] hover:underline"
              >
                Create an account
              </Link>
            </p> */}

            <div className="pt-1">
              <p className="text-gray-500 font-light text-sm">
                <Link
                  to={PATH.forgotPassword}
                  className="pl-2 text-[#6366f1] hover:underline"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 ">
        <img src={AuthImg} alt="Authentication" className="h-full" />
      </div>
    </div>
  );
};

export default Login;
