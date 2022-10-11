import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum:['admin','user']


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
export  const User = mongoose.model('admin', UserSchema)

export default User;