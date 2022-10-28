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
      var subUserId=req.body._id
    }
    var isChat = await newChat.find({
        $and: [
            { subUser: { $eq: subUserId } },
            { Admin: { $eq: createdby }  },
        ],
    })
    .populate("subUser")
    .populate("Admin","-password")
 
    if (isChat.length > 0) {
      const FullChat = isChat[0]
      res.status(200).json({FullChat});
    } else {
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
        if(newsubuser){
          res.status(200).json({FullChat});
          
        }else{
          
          res.status(200).json({FullChat});
        }
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  };

//   export const fetchChats = async (req, res) => {
//     try {
//       Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
//         .populate("users", "-password")
//         .populate("groupAdmin", "-password")
//         .populate("latestMessage")
//         .sort({ updatedAt: -1 })
//         .then(async (results) => {
//           results = await User.populate(results, {
//             path: "latestMessage.sender",
//             select: "name imageUrl email",
//           });
//           res.status(200).send(results);
//         });
//     } catch (error) {
//       res.status(400);
//       throw new Error(error.message);
//     }
//   };