import { generateStreamToken } from "../lib/stream.connection";

export async function getStreamToken(req, res) {
    try {
        const userId = req.user.id;
        const token = await generateStreamToken(userId);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error in getStreamToken controller", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }   
}