import multer, { FileFilterCallback } from "multer";
import { join } from "path";
import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
const storage = multer.diskStorage({
  destination: function (req:Request, file:Express.Multer.File, cb:(error:Error | null, destination:string)=>void) {
     const uploadDir = join(__dirname, "..", "public", "images");
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});


const fileFilter = (req:Request, file:Express.Multer.File, cb:FileFilterCallback) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 3000000 },
});

export default upload;