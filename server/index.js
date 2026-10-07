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
    await connectDb()
    next()
})

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || process.env.VERCEL) {
            callback(null, true)
        } else {
            callback(null, true)
        }
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
    next()
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

app.get("/", (req, res) => {
    res.json({ message: "InterviewIQ API is running" })
})

const PORT = process.env.PORT || 6000

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
        console.log(`OpenRouter Config: model=${process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'}, keyPresent=${!!process.env.OPENROUTER_API_KEY}`)
        console.log(`Razorpay Config: configured=${!!(process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('add your'))}`)
    })
}

export default app
