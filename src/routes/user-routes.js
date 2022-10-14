import express  from "express";
const routes=express.Router();

import {userSignup,
    userLogin,
    userSocialLogin,
    forgotPass,
    newPass,
    
} from "../api/user.js"

routes.post('/user', userSignup )

routes.post('/userlogin', userLogin )
routes.post('/socailLogin', userSocialLogin )
routes.post('/reset-password', forgotPass )
routes.post('/new-password', newPass )



export default routes
