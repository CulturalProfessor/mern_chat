import Message from "../models/message.js";

export const getUsers = async (req, res) => {   
    const {name,room}=req.body;
    console.log(name);
    const users=await Message.findOne({room:room}).find({users:{$in:[name]}});
    console.log(users);
    res.status(200).json(users[0].users)
};


export const login = async (req, res) => {
  const { name, room } = req.body;
  // console.log(name,room);
  const isRoom = await Message.findOne({ room: room });
  const isUser = await Message.find({ room: room }).find({ users: name });

  if(name=="" || room==""){
    res.status(201).json({
        message:"Enter name and room to join."
    })
  }
  else if (isRoom) {
    console.log(isUser);
    if (isUser.length != 0) {
      res.status(409).json({
        message: "Username already taken",
      });
    } else {
      await Message.find({ room: room }).updateOne({
        $push: { users: name },
      });
    //   console.log(newUserInserted);
      res.status(200).json({
        message: "account created", 
      });
    }
  } else {
    const newRoom = await Message.insertMany({
      room: room,
      users: [name],
      messages: [{}],
    });
    console.log(newRoom);
    res.status(200).json({
      message: "New room created",
    });
  }
  // console.log(isRoom);
};
