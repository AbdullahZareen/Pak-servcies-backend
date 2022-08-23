import mongoose from "mongoose";
const MechanicSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  address: { type: String },
  phone_no: { type: Number, required :true},
  service: [{ name: String }],
  password:{type:String}
});
const Mechanic_Model = mongoose.model("mechanic", MechanicSchema);
export default Mechanic_Model;
