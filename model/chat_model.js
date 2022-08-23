import mongoose from "mongoose";
const { Schema } = mongoose;
const ChatSchema = mongoose.Schema({
  Mechanic_id: { type: Schema.Types.ObjectId, ref: "mechanics" },
  Customer_id: { type: Schema.Types.ObjectId, ref: "customers" },
  message: { type: String, required: true },
});
const Chat_Model = mongoose.model("chat", ChatSchema);
export default Chat_Model;
