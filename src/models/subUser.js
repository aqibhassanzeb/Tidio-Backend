import mongoose from 'mongoose'
const subUserSchema = new mongoose.Schema(
{
    name: {
        type: String,
       },
    createdby: {
        type: String,
       },
    email: {
        type: String,
    },
    phoneNo: {
        type: String,
    }
},
{ timestamps: true }
)
export  const subUser = mongoose.model('subUser', subUserSchema)

export default subUser;