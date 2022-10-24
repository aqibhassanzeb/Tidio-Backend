import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
import bodyParser from 'body-parser';
// import Auth from './api-routes/user-route.js';

import './config.js';
import  adminAuth  from "./routes/admin-routes.js";
import  userAuth  from './routes/user-routes.js';
import  chatRoutes  from './routes/chat-routes.js';
import  messages  from './routes/messages-routes.js';

import {Server} from "socket.io"

const app = express();
dotenv.config();
//middelwares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// app.use(helmet());
// app.use(morgan("dev"));
//Routes
//uset Email Verification Endpoints
// app.use('/api/v1/activate-account',userRegisterWithEmailVerification)
//user forgot and reset-password Endpoints
// app.use('/api/v1/reset-password',passwordreset)
//All APi's Endponits
app.use('/api/v1',userAuth,adminAuth,chatRoutes,messages)


app.use('*', (req, res) => {
    return res.status(404).json({
        message: 'Backend is runing..'
    })
});

//Port
const port = process.env.PORT || 3333;
 const nodeServer= app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


// socket.io portion 
const io = new Server(nodeServer, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.LINK,
      // credentials: true,
    },
  });



  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup",(userData)=>{
        socket.join(userData._id)
        console.log(userData._id)
        socket.emit("connected")
    })


    socket.on("typing", (room) => {
        socket.in(room).emit("typing")});
    socket.on("stop typing", (room) =>{
        socket.in(room).emit("stop typing")});
    

    socket.on("join chat",(room)=>{
        socket.join(room)
    })


    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            // console.log(newMessageRecieved);
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });


    })