import express  from "express";
const routes=express.Router();

import {userSignup,
    userLogin,
    userSocialLogin,
    forgotPass,
    newPass,
    subUserCreate,
    subUserfetch,
    subUserDelete,
    subUserfetchContact,
    subUserchatDelete,
    chatbotSetting,
    chatbotSettingfetch,
    
} from "../api/user.js"
import { protect } from "../middleware/user-middleware.js";

routes.post('/user', userSignup )

routes.post('/userlogin', userLogin )
routes.post('/socailLogin', userSocialLogin )
routes.post('/reset-password', forgotPass )
routes.post('/new-password', newPass )
routes.post('/newusercreate',protect, subUserCreate )
routes.get('/subuserfetch/:_id',protect, subUserfetch)
routes.delete('/subuserdelete/:_id',protect, subUserDelete)
routes.get('/subusermessagecontact/:_id',protect, subUserfetchContact)
routes.put('/subuserdeletechat/:_id', subUserchatDelete)
routes.post('/chatbotsetting',protect, chatbotSetting )
routes.get('/chatbotsetting/:_id',protect, chatbotSettingfetch)



export default routes
