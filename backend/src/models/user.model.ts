import mongoose, { Schema, type Model, type Document, model } from "mongoose";
import { generateHash } from "../utils/bcrypt";



export interface UserDoc extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  isVerified: boolean;
  isAdmin: boolean;
}

const userSchema = new Schema<UserDoc>(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
    // collection: "authUsers"
  }
);

// hash the password before saving to database
userSchema.pre("save", async function savePassword(next) {
  if (!this.isModified()) {
    next();
  }
  const hash = await generateHash(this.password);
  this.password = hash;
});

//  converting schema to model
export const UserModel: Model<UserDoc> = mongoose.model<UserDoc>("User", userSchema);
export default UserModel;

// Create the model
