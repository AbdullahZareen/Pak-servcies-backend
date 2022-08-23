import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type:String, required: true },
});
const User_Model = mongoose.model("user", UserSchema);
export default User_Model;
