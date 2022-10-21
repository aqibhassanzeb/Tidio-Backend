import express  from "express";
const routes=express.Router();

import { allMessages,sendMessage} from "../api/chatapis/messages.js"
import { protect } from "../middleware/user-middleware.js";

routes.post('/messages',protect, sendMessage )
routes.get('/messages/:chatId',protect, allMessages )




export default routes