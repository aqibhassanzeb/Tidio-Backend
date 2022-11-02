import express  from "express";
const routes=express.Router();

import { accessChat, allUsers, fetchChats } from "../api/chatapis/user-chat.js"
import { accessChat2, fetchChats2 } from "../api/chatapis2/subUser-chat.js";
import { protect } from "../middleware/user-middleware.js";

routes.get('/alluser',protect, allUsers )
routes.post('/chat',protect, accessChat )
// routes.get('/chat',protect, fetchChats )
// new chat 
routes.post('/chat2', accessChat2 )
routes.get('/chat2', fetchChats2 )



export default routes