import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
import bodyParser from 'body-parser';
// import Auth from './api-routes/user-route.js';

import './config.js';
import  adminAuth  from "./routes/admin-routes.js";
import  userAuth  from './routes/user-routes.js';


const app = express();
dotenv.config();
//middelwares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// app.use(helmet());
// app.use(morgan("dev"));
//Routes
//uset Email Verification Endpoints
// app.use('/api/v1/activate-account',userRegisterWithEmailVerification)
//user forgot and reset-password Endpoints
// app.use('/api/v1/reset-password',passwordreset)
//All APi's Endponits
app.use('/api/v1',userAuth,adminAuth)


app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist please put Api routes..'
    })
});

//Port
const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
