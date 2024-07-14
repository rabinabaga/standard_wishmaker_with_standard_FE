const dotenv = require("dotenv");
dotenv.config();
import mongoose from "mongoose";

const connectToDb = async (dbUrl: string, dbName: string): Promise<void> => {
  try {
    await mongoose.connect(
      dbUrl,
      {
        dbName: dbName,
        autoIndex: true,
        autoCreate: true,
      }
    );
    console.log("Db server connected successfully...");
  } catch (error) {
   
    console.log("Error connecting database server");
  }
};

export default connectToDb;
