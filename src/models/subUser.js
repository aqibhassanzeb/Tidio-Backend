import mongoose from 'mongoose'
const subUserSchema = new mongoose.Schema(
{
    name: {
        type: String,
       },
    createdby: {
        type: String,
       },
    embededLink:{
        type:String,
       },
    email: {
        type: String,
    },
    disaible: {
        type: Boolean,
        default:false
    },
},
{ timestamps: true }
)
export  const subUser = mongoose.model('subUser', subUserSchema)

export default subUser;