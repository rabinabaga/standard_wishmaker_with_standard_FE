import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../assets/images/auth-image.jpeg";

import { PATH } from "../../constants/path";
import CustomLabel from "../../components/form/custom/CustomLabel";
import CustomInput from "../../components/form/custom/CustomInput";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { showErrorMessage, showSuccessMessage } from "../../utils/toast";
import { getValue } from "../../utils/object";
import { useAuthContext } from "../../hooks/contextConsumer.hook";
import { useLoginAccount } from "../../hooks/auth.hook";
import Button from "../../components/common/Button/Button";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp: React.FC = () => {
  const { mutateAsync: loginAccount, isPending } = useLoginAccount();

const [passwordEntered, setPasswordEntered] = useState<string>(""); 
const methods = useForm();

  const handleOnClick = () => {
    () => { methods.handleSubmit(onSubmit)() }
  }
  const navigate = useNavigate();
  const { errors } = methods.formState;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const resData = {
        email: data.email,
        password: data.password,
      };
      const { setIsLoggedIn } = useAuthContext();

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
  console.log("password", passwordEntered);
  

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
        Sign Up
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <CustomLabel title="First Name" />
                <CustomInput styles="py-4 px-2 rounded-md border border-1 border-black-light " type="text" name="firstname" required={true} placeHolder="Enter your first name" />
              </div>
              <div className="flex flex-col gap-1">
                <CustomLabel title="Last Name" />
                <CustomInput styles="py-4 px-2 rounded-md border border-1 border-black-light" type="text" name="lastname" required={true} placeHolder="Enter your last name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <CustomLabel title="Email" />
              <CustomInput styles="py-4 px-2 rounded-md w-full border border-1 border-black-light" type="email" name="email" required={true} placeHolder="Enter your Email" />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <CustomLabel title="Password" />
                <CustomInput passwordMatch={setPasswordEntered} styles="py-4 px-2 rounded-md border border-1 border-black-light" type="password" name="password" required={true} placeHolder="Type a password" />
              </div>
              <div className="flex flex-col gap-1">
                <CustomLabel title="Confirm Password" />
                <CustomInput styles="py-4 px-2 rounded-md border border-1 border-black-light" type="password" passwordValue={passwordEntered} name="confirmpassword" required={true} placeHolder="Retype your password" />
              </div>
            </div>
           
            <span className=" ml-5 pl-5"> <input type="checkbox" className="mr-5 inline" />
              I agree <span className="text-primary-900 underline">Terms and Conditions </span> and <span className="text-primary-900 underline">Privacy Policy</span>
            </span>
            <Button title="Sign Up" onClick={handleOnClick} />
          </div>
        </form>

      </FormProvider>

 
      <p className="text-center">
        <span className="text-black-faded">Already have an account? </span>
        <Link to="/login">
          <span className="text-primary-900 font-bold">Sign In now</span></Link>
      </p>
    </div>
  );
};

export default SignUp;
