import { type Request, type Response, type NextFunction } from "express";
import { CustomRequest } from "../types/auth.type";
import userRepo from "../repositories/user.repository";
import createError from "../utils/http.error";
const checkPermission = (checkRole: string) => {
  return async (req:CustomRequest, res:Response, next:NextFunction) => {
   const userData = await userRepo.getUserById(req.user)
   console.log("here user data", userData);
   
   if(userData!==null){
     if (userData.isAdmin === true) {
       next();
     } else {
       next(createError(403, "Not allowed to access this route, permission denied"));
     }
    } 
  };
};
export default checkPermission;
