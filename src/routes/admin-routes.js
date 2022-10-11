import express  from "express";
const routes=express.Router();

import {adminSignup,
    adminLogin,
} from "../api/admin.js"

routes.post('/adminsignup', adminSignup )

routes.post('/adminlogin', adminLogin )



export default routes