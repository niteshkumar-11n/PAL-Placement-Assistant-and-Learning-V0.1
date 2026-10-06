import React, { useState } from 'react';
import { BsRobot, BsShieldCheck } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const name = user.displayName;
            const email = user.email;
            const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true });
            dispatch(setUserData(result.data));
        } catch (error) {
            if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
                console.error("Google sign-in error:", error?.message || error);
            }
            dispatch(setUserData(null));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full ${isModel ? "" : "min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6"}`}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.96 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.25 }}
                className={`
                    w-full 
                    ${isModel ? "max-w-lg sm:max-w-xl p-8 sm:p-10 rounded-[32px]" : "max-w-xl p-10 sm:p-12 rounded-[36px]"}
                    bg-white shadow-2xl border border-slate-200/90 relative overflow-hidden
                `}
            >
                {/* Background decorative glow */}
                <div className='absolute -top-16 -right-16 w-48 h-48 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none' />
                <div className='absolute -bottom-16 -left-16 w-48 h-48 bg-teal-100/50 rounded-full blur-3xl pointer-events-none' />

                {/* Brand Logo & Tag */}
                <div className='flex items-center justify-center gap-3 mb-6 relative z-10'>
                    <div className='w-12 h-12 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-emerald-600/25'>
                        <BsRobot size={24} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-black text-2xl tracking-tight text-slate-900'>
                            InterviewIQ<span className='text-emerald-600 font-black'>.AI</span>
                        </span>
                        <span className='inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200/90'>
                            <HiSparkles size={12} className="text-emerald-500" />
                            PRO
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <div className='text-center mb-6 relative z-10'>
                    <h1 className='text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug'>
                        Continue to{' '}
                        <span className='bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent'>
                            AI Mock Interview
                        </span>
                    </h1>
                    <p className='text-slate-600 text-sm sm:text-base leading-relaxed mt-2.5 max-w-md mx-auto'>
                        Sign in with Google to launch AI-powered mock interviews, receive instant performance analysis, and claim your session credits.
                    </p>
                </div>

                {/* Feature Highlights List */}
                <div className='bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-100 mb-7 space-y-2.5 relative z-10'>
                    <div className='flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700'>
                        <span className='w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs'>✓</span>
                        <span>100 Free Credits added to your balance upon sign in</span>
                    </div>
                    <div className='flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700'>
                        <span className='w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs'>✓</span>
                        <span>Real-time voice recognition and adaptive follow-up questions</span>
                    </div>
                    <div className='flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700'>
                        <span className='w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs'>✓</span>
                        <span>Detailed PDF scoring report modeled after FAANG rubrics</span>
                    </div>
                </div>

                {/* Google Sign-In Button */}
                <motion.button 
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full flex items-center justify-center gap-3.5 py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-slate-900/20 transition-all cursor-pointer relative z-10 disabled:opacity-60 disabled:cursor-not-allowed'
                >
                    <FcGoogle size={24} />
                    <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
                </motion.button>

                {/* Trust and Privacy Note */}
                <div className='mt-5 text-center relative z-10 flex items-center justify-center gap-2 text-xs text-slate-400'>
                    <BsShieldCheck size={14} className="text-emerald-600" />
                    <span>Secure 256-bit encrypted authentication</span>
                </div>
            </motion.div>
        </div>
    );
}

export default Auth;

