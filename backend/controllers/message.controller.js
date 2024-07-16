import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    const { message } = req.body;

    let getConversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!getConversation) {
      getConversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      getConversation.messages.push(newMessage._id);
    }
    await getConversation.save();

    //SOCKET.IO

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getMessage = async (req,res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages"); 
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}