import * as mongoose from "mongoose";

export interface User {
  email: string;
  name: string;
  picture: string;
  user_id: string;
  roles: string[];
}
const userSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    user_id: { type: String, required: true },
    roles: { type: [String], required: true },
  },
  { timestamps: true }
);

// const UserModel = mongoose.model<User>("User", userSchema);

// export default UserModel;

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
