import express  from "express";
const routes=express.Router();

import {userSignup,
    userLogin,
    
} from "../api/user.js"

routes.post('/user', userSignup )

routes.post('/userlogin', userLogin )



export default routes
