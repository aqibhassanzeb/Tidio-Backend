import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum:'user'
        },
    surName:{
            type:String,
        },
    name:{
        type:String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    websiteName:{
        type:String,
    },
    colour:{
        type:String
    },
    language:{
        type:String,
    },
    pic:{
        type:String
    },
    mainfocus:{
        type:String
    },
    supportNo:{
        type:String
    },
    industryType:{
        type:String
    },
    noInquiries:{
        type:String
    },
    firstChatbot:{
        type:String
    },
    codeSnippet:{
        type:String
    },
    todoThat:{
        type:String
    },
    resetToken: String,
    expireToken: Date,
})




export  const User = mongoose.model('user', UserSchema)

export default User;
