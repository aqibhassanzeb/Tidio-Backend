import express from "express";
const routes = express.Router();

import {
    userSignup,
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
    ValidEmailRegister,
    tokenSignUp,
    userUpdate,

} from "../api/user.js"
import { protect } from "../middleware/user-middleware.js";
import { upload } from "../api/uploadfile.js";

routes.post('/user', userSignup)

routes.post('/userlogin', userLogin)
routes.put('/userUpdate/:_id',upload.single("myFile"), userUpdate)
routes.post('/userloginvalidemail', ValidEmailRegister)
routes.post('/userlogintoken/:token', tokenSignUp)
routes.post('/socailLogin', userSocialLogin)
routes.post('/reset-password', forgotPass)
routes.post('/new-password', newPass)
routes.post('/newusercreate', protect, subUserCreate)
routes.get('/subuserfetch/:_id', protect, subUserfetch)
routes.delete('/subuserdelete/:_id', protect, subUserDelete)
routes.get('/subusermessagecontact/:_id', protect, subUserfetchContact)
routes.put('/subuserdeletechat/:_id', subUserchatDelete)
routes.post('/chatbotsetting', protect, chatbotSetting)
routes.get('/chatbotsetting/:_id', chatbotSettingfetch)



export default routes
