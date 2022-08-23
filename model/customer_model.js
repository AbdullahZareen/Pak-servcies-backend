import mongoose from "mongoose";
const CustomerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  location: { type: String },
  phone_no: { type: Number, required:true },
  password:{type:String}
});
const Customer_Model = mongoose.model("customer", CustomerSchema);
export default Customer_Model;
