import express  from "express";
const routes=express.Router();

import { accessChat, allUsers, fetchChats } from "../api/chatapis/user-chat.js"
import { protect } from "../middleware/user-middleware.js";

routes.get('/alluser',protect, allUsers )
routes.post('/chat',protect, accessChat )
routes.get('/chat',protect, fetchChats )




export default routes