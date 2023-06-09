import mongoose from "mongoose";

const chatbotSetting = mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId,ref:"user" },
    enter_name: {
      type:String,
    },
    enter_email: {
      type:String,
    },
    enter_phone:{
      type:String,
    },
    gdpr:{
      type:String,
    },
    message:{
      type:String,
    },
    status:{
      type:String,
    },
    user_message:{
      type:String,
    },
    offlineMessage:{
      type:String,
    },
    devices:{
      type:String,
    },
    timeonline:{
      type:[],
    },

  },
  { timestamps: true }
);


const chatBotSet = mongoose.model("chatbotSetting", chatbotSetting);

export default chatBotSet;