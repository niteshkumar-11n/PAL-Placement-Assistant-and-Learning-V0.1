import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: (process.env.RAZORPAY_KEY_ID || "").trim(),
    key_secret: (process.env.RAZORPAY_KEY_SECRET || "").trim(),
  });
};

const razorpay = new Proxy({}, {
  get(target, prop) {
    const instance = getRazorpayInstance();
    const val = instance[prop];
    return typeof val === "function" ? val.bind(instance) : val;
  }
});

export default razorpay