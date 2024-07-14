import { type Request } from "express";
enum UserRole {
  Admin = 'admin',
  RegularUser = 'regular_user'
}

 interface User {
   _id: string;
   firstName: string;
   lastName: string;
   email:string;
   role: UserRole;
   
   
   // Add other user properties as needed
 }
export interface CustomRequest extends Request {
user: string; // Adjust the type according to your user ID type
}

// Extend the Request interface to include the file property
export interface MulterRequest extends CustomRequest {
  file: Express.Multer.File;
  // files: Express.Multer.File[];
}
