import {Server} from 'socket.io';
import eiows from 'eiows';
// port
///////server for sockets

const io = new Server(3000, {
  wsEngine: eiows.Server,
});

const send_receive_Message = () => {
  io.on('connection', socket => {
    // console.log('user connected');
    console.log('Master socket is now' + socket.id);
    socket.on('send message', message => {
      console.log('message:', message);
      io.emit('receive message', message);
    });
  });
};
const create_chat = Chat => {
  io.on('connection', socket => {
    console.log('create chat connected');

    socket.on('create chat', data => {
      const chat = new Chat({data});
      // const chat = new Chat({data});
      chat.save();
      console.log('data:', data);
      //    / io.emit('receive message', message);
    });
  });
};

const connectSocketServer = async Chat => {
  send_receive_Message();
  // create_chat(Chat);
  // io.on('connection', socket => {
  //   console.log('create chat connected');
  //   socket.on('create chat', data => {
  //     const {message, mechanic_id, customer_id} = data;
  //     const chat = new Chat({
  //       Mechanic_id: mechanic_id,
  //       Customer_id: customer_id,
  //     });
  //     // const chat = new Chat({data});
  //     chat
  //       .save()
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(error => console.log(error));
  //     console.log('data:', data);
  //     //    / io.emit('receive message', message);
  //   });
  // });
};
const users = [];
function userJoin(id, username, room) {
  const users = {id, username, room};
  users.push(users);
  return users;
}

export const createSocketForMessages = io => {
  io.on('connection', socket => {
    socket.on('create Room', ({customer_id, mechanic_id}) => {
      console.log(customer_id, mechanic_id);
      socket.join(mechanic_id);
      socket.broadcast.emit('create chat' + mechanic_id, mechanic_id);
    });
    // console.log('create chat connected');
    // console.log('Master socket is now' + socket.id);
    socket.on('send message', message => {
      // console.log('message:', message);
      io.emit('receive message', message);
    });
  });
};
export default connectSocketServer;
