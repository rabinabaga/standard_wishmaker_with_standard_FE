const authRouter = require("express").Router();
import express, { Request, Response } from "express";
// const UserModel = require("./user.model");
import authCtrl from "../../controllers/auth/auth.controller";
import { CreateUserValidator, LoginGoogleUserValidator, LoginUserValidator } from "../../validators/user.validator";
import ValidateRequest from "../../middlewares/validate.request";
import { authenticationMiddleware } from "../../middlewares/auth.middleware";
import upload from "../../utils/upload";
// const checkPermission = require("../middlewares/rbac.middleware");

authRouter.post("/register", ValidateRequest(CreateUserValidator), authCtrl.register);
// authRouter.post("/login", authCtrlInstance.login);

authRouter.get("/activate/:token", authCtrl.verifyToken)

authRouter.post("/login",ValidateRequest(LoginUserValidator), authCtrl.loginUser);
// authRouter.post(
//   "/google/login",
//   ValidateRequest(LoginGoogleUserValidator),
//   authCtrl
// );

authRouter.get("/me",authenticationMiddleware,(req:Request, res:Response)=>{
    res.json({ hello: "hello" });
})
authRouter.post(
  "/photo",
  upload.single("imageSrc"),
  (req: Request, res: Response) => {
    res.json({ hello: "hello" });
  }
);

export default authRouter;

