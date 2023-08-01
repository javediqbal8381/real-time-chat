const express =require ('express')
const app = express()
const http =require('http').Server(app)
const cors = require('cors');

const PORT = 4000
app.use(cors())

const socketIO = require('socket.io')(http,{
    cors:{
        origin:'http://localhost:5173'
    }
});

socketIO.on('connection',(socket)=>{
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message',(data)=>{
        socketIO.emit('messageResponse', data);
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
      });
})

app.get('/api',(req,res)=>{
    res.json({
        message:'welcome'
    })
})

http.listen(PORT,()=>{
    console.log(`server on port ${PORT}`)
})