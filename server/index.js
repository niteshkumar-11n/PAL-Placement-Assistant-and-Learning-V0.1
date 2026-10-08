import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()

// Connect DB middleware for Vercel serverless execution
app.use(async (req, res, next) => {
    try {
        await connectDb()
    } catch (err) {
        console.error("MongoDB Connection Error in Middleware:", err)
    }
    next()
})

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
    origin: function (origin, callback) {
        callback(null, true)
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    // Firebase popup authentication needs the opener relationship preserved.
    res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none")
    next()
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

app.get("/api", (req, res) => {
    res.json({ status: "online", message: "InterviewIQ API is running" })
})

app.get("/", (req, res) => {
    res.json({ status: "online", message: "InterviewIQ API is running" })
})

const PORT = process.env.PORT || 6000

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

export default app
