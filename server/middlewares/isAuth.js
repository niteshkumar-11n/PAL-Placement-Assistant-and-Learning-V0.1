import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies || {}

        if (!token) {
            return res.status(401).json({ message: "Authentication required: No token provided" })
        }

        let verifyToken
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET || "DSY29QURD12R23TFNO1FFFTY13")
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" })
        }

        if (!verifyToken || !verifyToken.userId) {
            return res.status(401).json({ message: "Invalid token payload" })
        }

        req.userId = verifyToken.userId
        next()
    } catch (error) {
        return res.status(500).json({ message: `isAuth error: ${error.message || error}` })
    }
}

export default isAuth