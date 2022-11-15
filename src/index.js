import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
import bodyParser from 'body-parser';
// import Auth from './api-routes/user-route.js';

import './config.js';
import adminAuth from "./routes/admin-routes.js";
import userAuth from './routes/user-routes.js';
import chatRoutes from './routes/chat-routes.js';
import messages from './routes/messages-routes.js';

import { Server } from "socket.io"

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
app.use('/api/v1', userAuth, adminAuth, chatRoutes, messages)


app.use('*', (req, res) => {
    return res.status(404).json({
        message: 'Backend is runing..'
    })
});

//Port
const port = process.env.PORT || 3333;
const nodeServer = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// console.log("sdfskjdflasjlk",process.env.LINK);

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
    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("me", userData._id)
        socket.emit("connected")
    })
     
    // calling portion 

    socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

	socket.on("endCall", (data) => {
		io.to(data).emit("end")
	})


    // chat portion 

    socket.on("typing", (room) => {
        socket.in(room).emit("typing")
    });
    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing")
    });


    socket.on("join chat", (room) => {
        socket.join(room)
    })


    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat) return console.log("chat.users not defined");

        if (chat.Admin == newMessageRecieved.senderId){
            socket.in(chat.subUser).emit("messagerecieved", newMessageRecieved);
        }
        if (chat.subUser == newMessageRecieved.senderId){
            socket.in(chat.Admin).emit("messagerecieved", newMessageRecieved);
        }
    });


})