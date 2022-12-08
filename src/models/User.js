import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    status: {
        type: String,
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
        default:"english"
    },
    pic:{
        type:String
    },
    region:{
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
        type: String,
    
    },
    socailLoginUserId:{
        type:String
    },
    loginStatus:{
        type:String
    },
    resetToken: String,
    expireToken: Date,
},
{ timestaps: true }
)




export  const User = mongoose.model('user', UserSchema)

export default User;
