export const getMechanicByID = (io, getMessageByMechanicId) => {
  io.on('connection', socket => {
    socket.on('mechanicId', id => {
      console.log(id);
      getMessageByMechanicId(id).then(value => {
        socket.emit('getMechanicChat', value);
      });
    });
  });
};
