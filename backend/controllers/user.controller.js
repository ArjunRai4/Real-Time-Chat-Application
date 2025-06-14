import FriendRequest from "../models/friendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUser(req,res){

    try {
        const currentUserId=req.user.id;
        const currentUser=req.user;//or await User.findById({currentUserId})
        
        const recommendedUsers=await User.find({
            $and:[
                {_id:{$ne: currentUserId}},//exclude current user
                {$id:{$nin:currentUser.friends}},// exclude current user's friends
                {isOnboarded:true}
            ]
        })
        res.status(200).json({recommendedUsers});
    } catch (error) {
        console.error("Error in getRecommendedUser controller",error.message);
        return res.status(500).json({ message: "Internal Server error"});
    }
}

export async function getMyFriends(req,res){
    try {
        const user=await User.findById(req.user.id).select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller",error.message);
        return res.status(500).json({ message: "Internal Server error"});
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId=req.user.id;
        const recipientId = req.params.id;

        //prevent sending friend request to self
        if(myId === recipientId){
            return res.status(400).json({message:"You cannot send friend request to yourself"});
        }

        //check if recipient exists
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        //check if recipient is already a friend
        if( recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"});
        }

        //check if friend request already exists
        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId},
            ],
        });
        if(existingRequest){
            return res.status(400).json({message:"Friend request already exists"});
        }

        //create a new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(friendRequest);

    } catch (error) {
        console.error("Error in sendFriendRequest controller",error.message);
        return res.status(500).json({ message: "Internal Server error"});
    }
}

export async function acceptFriendRequest(req,res){
    try {
        const requestId = req.params.id;

        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        //check if the current user is the recipient of the request
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //add each other to others friends list
        //$addToSet: adds the value to the array only if it doesn't already exist
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({ message: "Friend request accepted successfully" });

    } catch (error) {
        console.error("Error in acceptFriendRequest controller",error.message);
        return res.status(500).json({ message: "Internal Server error"});
    }
}

export async function getFriendRequest(req,res){
    try {
        const incomingRequest = await FriendRequest.findOne({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");
        //populate is used to replace the sender field with the actual user data

        const acceptedReqs = await FriendRequest.findOne({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ incomingRequest, acceptedReqs });
    } catch (error) {
        console.error("Error in getFriendRequest controller",error.message);
        return res.status(500).json({ message: "Internal Server error"});
    }
}

export async function getOutgoingFriendReqs(req,res){
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.error("Error in getOutgoingFriendReqs controller",error.message);
        return res.status(500).json({ message: "Internal Server error"});
    }
}