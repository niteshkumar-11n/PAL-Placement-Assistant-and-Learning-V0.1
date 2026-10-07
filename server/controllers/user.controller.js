import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import mongoose from "mongoose"

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.cookies || {}

        if (!token) {
            return res.status(200).json(null)
        }

        let verifyToken
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET || "DSY29QURD12R23TFNO1FFFTY13")
        } catch (err) {
            res.clearCookie("token")
            return res.status(200).json(null)
        }

        if (!verifyToken || !verifyToken.userId || !mongoose.Types.ObjectId.isValid(verifyToken.userId)) {
            res.clearCookie("token")
            return res.status(200).json(null)
        }

        const user = await User.findById(verifyToken.userId).select("-password")
        if (!user) {
            res.clearCookie("token")
            return res.status(200).json(null)
        }

        return res.status(200).json(user)
    } catch (error) {
        console.error("getCurrentUser error:", error)
        return res.status(200).json(null)
    }
}