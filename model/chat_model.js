import mongoose from 'mongoose';
const {Schema} = mongoose;
const ChatSchema = mongoose.Schema({
  Mechanic_id: {type: Schema.Types.ObjectId},
  Customer_id: {type: Schema.Types.ObjectId},
  messages: [{message: String, date: {type: Date, default: Date.now}}],
});
const Chat_Model = mongoose.model('chat', ChatSchema);
export default Chat_Model;
