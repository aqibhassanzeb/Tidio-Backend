import express  from "express";
const routes=express.Router();

import { allMessages,sendMessage} from "../api/chatapis/messages.js"
import { allMessages2, sendMessage2 } from "../api/chatapis2/messages2.js";
import { protect } from "../middleware/user-middleware.js";

routes.post('/messages',protect, sendMessage )
// routes.get('/messages/:chatId',protect, allMessages )
    // subuser portion 
routes.post('/messages2', sendMessage2 )
routes.get('/messages/:chatId', allMessages2 )



export default routes