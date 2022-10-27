import mongoose from "mongoose";

const subUserchatModal = mongoose.Schema(
  {
    subUser: { type: mongoose.Schema.Types.ObjectId,ref:"subUser" },
    Admin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);


export const newChat = mongoose.model("newChat", subUserchatModal);

export default newChat;