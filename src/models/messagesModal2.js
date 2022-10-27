import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: { type: String },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "newChat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Message2 = mongoose.model("Message2", messageSchema);
export default Message2;