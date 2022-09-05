import mongoose from 'mongoose';
const {Schema} = mongoose;
const ChatSchema = mongoose.Schema({
  Mechanic_id: {type: Schema.Types.ObjectId, ref: 'mechanics'},
  Customer_id: {type: Schema.Types.ObjectId, ref: 'customers'},
  messages: [{text: String, sender: String, timeStamp: String}],
});
const Chat = mongoose.model('chats', ChatSchema);
export default Chat;
