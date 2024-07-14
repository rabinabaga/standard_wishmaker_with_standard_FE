import { PLAIN_RESPONSE_MSG } from "../constant/error";
import {
  UserFromDb,
  UserFromDbDuringUpdate,
  createUser,
} from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import createError from "../utils/http.error";
import { removeKey } from "../utils/object";
class UserRepositiory {
  async createUser(data: createUser) {
    const userInstance = new UserModel(data);
    const userData = await userInstance.save();
    return userData;
  }

  async findOneByEmail(email: string): Promise<UserFromDb> {
    return UserModel.findOne({ email: email }).select("-createdAt -updatedAt");
  }

  async removeTokenFromUser(id: string): Promise<any> {
    await this.updateUserStatus(id);
    const result = await UserModel.findOneAndUpdate(
      { _id: id },
      { $unset: { ["token"]: "" } },
      { new: true }
    );
    
    return result;
  }

  async getUserById(_id:string){
    return UserModel.findById(_id);
  }

  async findOneByToken(token: string): Promise<UserFromDb> {
    return UserModel.findOne({ token: token }).select("-createdAt -updatedAt -token");
  }

  async updateUserStatus(_id: string) {
    return await UserModel.findOneAndUpdate(
      { _id: _id },
      { $set: { isVerified: true } },
      { new: true } // To return the updated document
    );
  }
}
const userRepo = new UserRepositiory();
export default userRepo;
