import {StringConst} from '../utility/constant.js';

export const createCustomerChats = async (io, insertChat) => {
  io.on('connection', socket => {
    socket.on(StringConst.createChat, ({customer_id, mechanic_id}) => {
      insertChat(mechanic_id, customer_id).then(value => {
        socket.emit('response' + customer_id, value);
        socket.broadcast.emit('mechanic' + mechanic_id, value);
      });
    });
  });
};

export const getCustomerByID = (io, getMessageByCustomerId) => {
  io.on('connection', socket => {
    socket.on(StringConst.CustomerId, id => {
      getMessageByCustomerId(id).then(value => {
        socket.emit(StringConst.getCustomerChats, value);
      });
    });
  });
};

export const getMessageBYChatId = (io, getMessageByID) => {
  io.on('connection', socket => {
    socket.on(StringConst.ChatId1, id => {
      getMessageByID(id).then(value => {
        socket.emit(StringConst.getChatDetail, value);
      });
    });
  });
};

export const createMessageBYChatID = (io, InsertMessage) => {
  io.on('connection', socket => {
    socket.on(StringConst.ChatId, ({id, message, sender}) => {
      InsertMessage(id, message, sender).then(value => {
        socket.emit(StringConst.getChatDetail + id, value);
        socket.broadcast.emit(StringConst.getChatDetail + id, value);
      });
    });
  });
};
