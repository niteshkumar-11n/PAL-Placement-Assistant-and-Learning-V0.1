import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.cookies || {}

        if (!token) {
            return res.status(200).json(null)
        }

        let verifyToken
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return res.status(200).json(null)
        }

        if (!verifyToken || !verifyToken.userId) {
            return res.status(200).json(null)
        }

        const user = await User.findById(verifyToken.userId).select("-password")
        if (!user) {
            return res.status(200).json(null)
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `failed to get currentUser: ${error.message || error}` })
    }
}