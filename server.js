import mongoose from 'mongoose';
import myapp from './app.js';
import http from 'http';
import util from 'util';
import {Server} from 'socket.io';
import {createSocketForMessages} from './utility/utilityFun.js';
import Chat from './model/chat.js';
import {
  getMessageByCustomerId,
  getMessageByID,
  getMessageByMechanicId,
  InsertChat,
  InsertMessage,
} from './controller/chat.js';
import {getMechanicByID} from './sockets/mechanic.js';
import {
  createCustomerChats,
  createMessageBYChatID,
  getCustomerByID,
  getMessageBYChatId,
} from './sockets/customer.js';
const PORT = process.env.PORT || 8000;
const server = http.createServer(myapp);
const io = new Server(server);

// createSocketForMessages(io, Chat);
getMechanicByID(io, getMessageByMechanicId);
getCustomerByID(io, getMessageByCustomerId);
createCustomerChats(io, InsertChat);
getMessageBYChatId(io, getMessageByID);
createMessageBYChatID(io, InsertMessage);
// InsertMessage('6314749540905bfc8044bfac', 'aik test aur jani', 'mechanic').then(
//   value => {
//     console.log(value);
//   },
// );

const connection_string =
  'mongodb+srv://AbdullahZareen:MXC5wCiTiCfqIEvA@cluster0.d9vpvbu.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => {
      console.log(`server is running on ${PORT} at ${new Date()}`);
    }),
  )
  .catch(error => console.log(error.message));

////join practice
// const ObjectId = mongoose.Types.ObjectId;
// Chat.aggregate([
//   {
//     $lookup: {
//       from: 'customers',
//       localField: 'Customer_id',
//       foreignField: '_id',
//       as: 'CustomerInfo',
//     },
//   },
//   {$match: {Mechanic_id: ObjectId('6309f84f30d01894d0c14af1')}},
//   // {$match: {}},
//   // {$group: {Customer_id: '6309f7af30d01894d0c14aeb'}},
// ])

//   .then(value => {
//     console.log('value', util.inspect(value, false, null, true));
//     // value.find({Customer_id: '6309f7af30d01894d0c14aeb'}).then(value1 => {
//     //   console.log(value1);
//     // });
//   })
//   .catch(error => console.log(error));
