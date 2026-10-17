import genToken from "../config/token.js"
import User from "../models/user.model.js"

// Detect production: if CLIENT_URL is set, we're in a deployed environment
// Don't rely on NODE_ENV since Render doesn't set it by default
const isProduction = !!process.env.CLIENT_URL

const getCookieOptions = () => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
})

const getClearCookieOptions = () => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
})

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body || {}
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const userName = name || email.split("@")[0] || "User"

        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name: userName,
                email
            })
        }

        let token = await genToken(user._id)
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" })
        }

        res.cookie("token", token, getCookieOptions())

        return res.status(200).json(user)

    } catch (error) {
        console.error("Google auth error:", error)
        return res.status(500).json({ message: `Google auth error: ${error.message || error}` })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", getClearCookieOptions())
        return res.status(200).json({ message: "LogOut Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Logout error ${error.message || error}` })
    }
}