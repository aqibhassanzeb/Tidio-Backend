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
    },
    password: {
        type: String,
        
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
    imageUrl:{
        type:String
    },
    socailLoginUserId:{
        type:String
    },
    loginStatus:{
        type:String
    },
    resetToken: String,
    expireToken: Date,
})




export  const User = mongoose.model('user', UserSchema)

export default User;
