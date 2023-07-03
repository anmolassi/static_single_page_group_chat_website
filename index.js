var app = require('express')();
var http= require('http').Server(app);
var path =require('path');
var io= require('socket.io')(http);
app.get('/',function(req,res){
    var options ={
        root: path.join(__dirname)
    }
    var fileName ='index.html';
    res.sendFile(fileName,options);
});
var users=[];
io.on('connection', function(socket){
    socket.on('setUserName', function(data){
        console.log(data + ' user connected & socketId: '+ socket.id);
        if(users.indexOf(data)> -1){
            socket.emit('userExists', data + ' username is already in use! , please use another name.');
        }else{
            users.push(data);
            socket.emit('setUser',{ username:data});
        }
    })
    socket.on('msg',function(data){
        io.sockets.emit('newmsg',data);
    })
})
http.listen(3000,function(){
    console.log('Server ready on 3000');
});