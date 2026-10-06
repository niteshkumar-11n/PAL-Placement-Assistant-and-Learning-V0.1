import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import AuthModel from '../components/AuthModel';

// Helper to ensure Razorpay checkout script is loaded
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Pricing() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setPaymentError(null);
      setSuccessMessage(null);

      if (!userData) {
        setShowAuthModal(true);
        return;
      }

      setLoadingPlan(plan.id);

      const amount =  
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      // Ensure Razorpay SDK is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || !window.Razorpay) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      // 1. Create order on backend
      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true });

      const { id: orderId, amount: orderAmount, currency, keyId } = result.data;
      const razorpayKey = keyId || import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey || razorpayKey.includes("add your")) {
        throw new Error("Razorpay Key ID is not configured. Please add RAZORPAY_KEY_ID in server/.env or VITE_RAZORPAY_KEY_ID in client/.env.");
      }

      // 2. Open Razorpay Checkout Popup
      const options = {
        key: razorpayKey,
        amount: orderAmount,
        currency: currency || "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        image: "/img1.png",
        order_id: orderId,
        handler: async function (response) {
          // This callback ONLY executes after user successfully completes the payment in the Razorpay gateway
          try {
            setLoadingPlan(plan.id);
            const verifyRes = await axios.post(
              ServerUrl + "/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verifyRes.data?.user) {
              dispatch(setUserData(verifyRes.data.user));
            }
            setSuccessMessage(`Payment Successful! 🎉 ${plan.credits} Credits added to your wallet.`);
            setTimeout(() => {
              navigate("/");
            }, 2500);
          } catch (err) {
            console.error("Payment verification failed:", err);
            const errMsg = err.response?.data?.message || "Payment verification failed. Please contact support.";
            setPaymentError(errMsg);
          } finally {
            setLoadingPlan(null);
          }
        },
        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
          contact: userData?.mobile || "",
        },
        notes: {
          planId: plan.id,
          credits: plan.credits,
          userId: userData?._id,
        },
        theme: {
          color: "#059669",
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        setLoadingPlan(null);
        setPaymentError(`Payment Failed: ${resp.error?.description || "Transaction cancelled"}`);
      });

      rzp.open();
    } catch (error) {
      console.error("handlePayment error:", error);
      const errMsg = error.response?.data?.message || error.message || "Failed to initiate payment.";
      setPaymentError(errMsg);
      setLoadingPlan(null);
    }
  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6'>

      <div className='max-w-6xl mx-auto mb-10 flex items-start gap-4'>

        <button onClick={() => navigate("/")} className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
          <FaArrowLeft className='text-gray-600' />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">
            Choose Your Plan
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Flexible pricing to match your interview preparation goals.
          </p>
        </div>
      </div>

      {paymentError && (
        <div className='max-w-3xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-start gap-3 shadow-sm'>
          <FaExclamationCircle className='text-red-500 text-xl mt-0.5 shrink-0' />
          <div>
            <p className='font-semibold'>Payment Error</p>
            <p className='text-sm mt-0.5'>{paymentError}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className='max-w-3xl mx-auto mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-start gap-3 shadow-sm'>
          <FaCheckCircle className='text-emerald-600 text-xl mt-0.5 shrink-0' />
          <div>
            <p className='font-semibold'>Success</p>
            <p className='text-sm mt-0.5'>{successMessage}</p>
          </div>
        </div>
      )}

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div key={plan.id}
              whileHover={!plan.default && { scale: 1.03 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}

              className={`relative rounded-3xl p-8 transition-all duration-300 border 
                ${isSelected
                  ? "border-emerald-600 shadow-2xl bg-white"
                  : "border-gray-200 bg-white shadow-md"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                  Default
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-gray-800">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4">
                <span className="text-3xl font-bold text-emerald-600">
                  {plan.price}
                </span>
                <p className="text-gray-500 mt-1">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500 text-sm" />
                    <span className="text-gray-700 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {!plan.default &&
                <button
                disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    } else {
                      handlePayment(plan)
                    }
                  }} className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${isSelected
                    ? "bg-emerald-600 text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                    }`}>
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}

                </button>
              }
            </motion.div>
          )
        })}
      </div>

      {showAuthModal && (
        <AuthModel onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  )
}

export default Pricing
