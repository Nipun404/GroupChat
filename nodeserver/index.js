const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users = {};

io.on('connection',user=>{
    user.on('new-user-joined',name=>{
        //console.log("New user",name);
        users[user.id] = name;
        user.broadcast.emit('userjoined',name);
    });

    user.on('send',message=>{
        user.broadcast.emit('receive',{message:message,name:users[user.id]})
    });

    user.on('disconnect',message=>{
      user.broadcast.emit('left', users[user.id])
    })
})