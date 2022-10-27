import newChat from "../../models/subUserchatModal.js";

  
  
  export const accessChat2 = async (req, res) => {
      const { embededLink,_id,createdby } = req.body;
    //   return
    if (!embededLink) {
      return res.sendStatus(400);
    }
    var isChat = await newChat.find({
        $and: [
            { subUser: { $eq: _id } },
            { Admin: { $eq: createdby }  },
        ],
    })
    .populate("subUser")
    .populate("Admin","-password")
 
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            subUser:_id,
            Admin: createdby
        };
        

      try {
        const createdChat = await newChat.save(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat })
        res.status(200).json(FullChat);
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