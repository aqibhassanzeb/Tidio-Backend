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
        type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    socailLoginUserId:{
        type:String
    },
    loginStatus:{
        type:String
    },
    subUser:[{ type: mongoose.Schema.Types.ObjectId, ref: "subUser" }],
    resetToken: String,
    expireToken: Date,
},
{ timestaps: true }
)




export  const User = mongoose.model('user', UserSchema)

export default User;
