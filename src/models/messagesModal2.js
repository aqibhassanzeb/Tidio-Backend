import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: { type: String },
    content: { type: String, trim: true },
    senderId:{type:String},
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "newChat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    myFile:{
      type:String,
    }
  },
  { timestamps: true }
);

const Message2 = mongoose.model("Message2", messageSchema);
export default Message2;