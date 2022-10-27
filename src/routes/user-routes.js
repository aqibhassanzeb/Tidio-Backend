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
    
} from "../api/user.js"
import { protect } from "../middleware/user-middleware.js";

routes.post('/user', userSignup )

routes.post('/userlogin', userLogin )
routes.post('/socailLogin', userSocialLogin )
routes.post('/reset-password', forgotPass )
routes.post('/new-password', newPass )
routes.post('/newusercreate',protect, subUserCreate )
routes.get('/subuserfetch/:_id',protect, subUserfetch)
routes.delete('/subuserdelete/:_id', subUserDelete)



export default routes
