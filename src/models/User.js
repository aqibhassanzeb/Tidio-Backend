import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum:'user'


    },
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    expireToken: Date,
})




export  const User = mongoose.model('user', UserSchema)

export default User;
