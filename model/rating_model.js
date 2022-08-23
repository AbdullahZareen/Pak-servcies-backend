
import mongoose from "mongoose";
const { Schema } = mongoose;
const RatingSchema = mongoose.Schema({
  Mechanic_id: { type: Schema.Types.ObjectId, ref: "mechanics" } ,
  Customer_id: { type: Schema.Types.ObjectId, ref: "customers" } ,
  rating: { type: Number, required: true },
  feedback: { type: String },
});
const Rating_Model = mongoose.model("rating", RatingSchema);
export default Rating_Model;
