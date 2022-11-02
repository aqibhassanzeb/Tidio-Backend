import subUser from "../../models/subUser.js";
import newChat from "../../models/subUserchatModal.js";

  
  
  export const accessChat2 = async (req, res) => {
    if(!req.body._id){
      if(!req.body.email){
   return res.status(422).json({message:"email is required"})
      }
      const {email,createdby}=req.body
      const user = new subUser({email,createdby})
    var newsubuser= await user.save()
    
    } 
    const { createdby } = req.body;

    if(newsubuser){
      var subUserId=newsubuser._id
    }else{
      var _id=req.body._id
      const isChat = await newChat.findOne({ _id: req.body._id }) .populate("subUser") .populate("Admin","name email")
      if (isChat) {
        const FullChat = isChat
      return res.status(200).json({FullChat});
      }
      return res.status(400).json({message:"not found"})
    }
        var chatData = {
            subUser:subUserId,
            Admin: createdby
        };
        const newchatdata = new newChat(chatData)
        try {
          const createdChat = await newchatdata.save();
          var createdChatId=createdChat._id
        const FullChat = await newChat.findOne({ _id: createdChatId }) .populate("subUser")
        .populate("Admin","-password")
          
          res.status(200).json({FullChat});
        
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    
  };

  export const fetchChats2 = async (req, res) => {
  if(!req.query.Admin){
    return res.status(422).json({error:"admin id is required"})
  }
  let filter={}
  if(req.query.Admin){
    filter ={Admin:req.query.Admin.split(',')}
  }
    try { 
      newChat.find({
        $and : [
          { chatEnable:true},{filter}
        ]
      })
        .populate("subUser")
        .populate("Admin", "name email imageUrl")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          // results = await User.populate(results, {
          //   path: "latestMessage.sender",
          //   select: "name imageUrl email",
          // });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };