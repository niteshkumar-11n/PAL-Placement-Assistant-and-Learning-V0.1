import jwt from "jsonwebtoken"

const genToken = async (userId) => {
    try {
        const secret = process.env.JWT_SECRET || "DSY29QURD12R23TFNO1FFFTY13"
        const token = jwt.sign({ userId }, secret, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.error("Token generation error:", error)
        return null
    }
}

export default genToken