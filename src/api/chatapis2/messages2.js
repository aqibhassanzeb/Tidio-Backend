import Message2 from '../../models/messagesModal2.js'
import newChat from '../../models/subUserchatModal.js';
import User from '../../models/User.js'
export const sendMessage2 =async (req, res) => {
    const { content, chatId,sender,senderId } = req.body;
  
    if (!content || !chatId) {
      return res.sendStatus(400);
    }
  const checkChat= await newChat.findById(chatId)
    if(checkChat.chatEnable==false){
    const updateChat= await newChat.findByIdAndUpdate(chatId,{chatEnable:true})
       }
    var newMessage = {
      sender,
      content,
      chat: chatId,
      senderId
    };
  
    try {
      var message = await (await Message2.create(newMessage)).populate("chat")
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };

  export const allMessages2 = async (req, res) => {
    try {
      const messages = await Message2.find({ chat: req.params.chatId })
        .populate({path:"chat", populate: {path:"Admin",modal:"user",select:"name email imageUrl"}})
        .populate({path:"chat", populate: {path:"subUser",modal:"subUser"}})
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };