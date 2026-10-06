import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {
        const { planId, amount, credits } = req.body;
        if (!amount || !credits) {
            return res.status(400).json({ message: "Invalid plan data: amount and credits are required." });
        }

        const isRazorpayConfigured =
            process.env.RAZORPAY_KEY_ID &&
            !process.env.RAZORPAY_KEY_ID.includes("add your") &&
            process.env.RAZORPAY_KEY_SECRET &&
            !process.env.RAZORPAY_KEY_SECRET.includes("add your");

        if (!isRazorpayConfigured) {
            return res.status(400).json({
                message: "Razorpay keys are not configured. Please add your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env."
            });
        }

        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}_${req.userId ? req.userId.toString().slice(-4) : "0000"}`,
        };

        const order = await razorpay.orders.create(options);

        await Payment.create({
            userId: req.userId,
            planId,
            amount,
            credits,
            razorpayOrderId: order.id,
            status: "created",
        });

        return res.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID?.trim(),
        });
    } catch (error) {
        console.error("createOrder error:", error);
        const errMsg = error?.error?.description || error.message || error;
        return res.status(500).json({ message: `Failed to create Razorpay order: ${errMsg}` });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing required Razorpay payment verification details." });
        }

        const isRazorpayConfigured =
            process.env.RAZORPAY_KEY_ID &&
            !process.env.RAZORPAY_KEY_ID.includes("add your") &&
            process.env.RAZORPAY_KEY_SECRET &&
            !process.env.RAZORPAY_KEY_SECRET.includes("add your");

        if (!isRazorpayConfigured) {
            return res.status(500).json({ message: "Razorpay secret key is not configured on the server." });
        }

        // Real Razorpay signature verification
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", (process.env.RAZORPAY_KEY_SECRET || "").trim())
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature. Verification failed." });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment record not found for this order." });
        }

        if (payment.status === "paid") {
            const user = await User.findById(payment.userId);
            return res.json({ message: "Payment already processed", user });
        }

        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();

        const updatedUser = await User.findByIdAndUpdate(
            payment.userId,
            { $inc: { credits: payment.credits } },
            { new: true }
        );

        return res.json({
            success: true,
            message: `Payment verified successfully! ${payment.credits} credits added to your account.`,
            user: updatedUser,
        });
    } catch (error) {
        console.error("verifyPayment error:", error);
        return res.status(500).json({ message: `Failed to verify Razorpay payment: ${error.message || error}` });
    }
};