import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsRobot, BsCoin, BsPlayCircleFill } from "react-icons/bs";
import { HiOutlineLogout, HiSparkles, HiMenu, HiX } from "react-icons/hi";
import { FaUserAstronaut, FaHistory, FaCoins } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const { userData } = useSelector((state) => state.user);
    const [showCreditPopup, setShowCreditPopup] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true });
            dispatch(setUserData(null));
            setShowCreditPopup(false);
            setShowUserPopup(false);
            setMobileMenuOpen(false);
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const navItems = [
        { label: "Dashboard", path: "/" },
        { label: "Practice", path: "/interview", requireAuth: true },
        { label: "History", path: "/history", requireAuth: true },
        { label: "Pricing", path: "/pricing" },
    ];

    const handleNavClick = (item) => {
        if (item.requireAuth && !userData) {
            setShowAuth(true);
            return;
        }
        navigate(item.path);
        setMobileMenuOpen(false);
    };

    return (
        <header className='w-full sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs'>
            <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4'>
                {/* Brand Logo */}
                <div 
                    onClick={() => navigate("/")} 
                    className='flex items-center gap-3.5 cursor-pointer select-none group shrink-0'
                >
                    <div className='w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-emerald-600/25 group-hover:scale-105 transition-transform duration-200'>
                        <BsRobot size={24} />
                    </div>
                    <div className='flex items-center gap-2.5'>
                        <span className='font-black text-2xl sm:text-[26px] tracking-tight text-slate-900'>
                            InterviewIQ<span className='text-emerald-600 font-black'>.AI</span>
                        </span>
                        <span className='inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200/90 shadow-2xs'>
                            <HiSparkles size={13} className="text-emerald-500" />
                            PRO
                        </span>
                    </div>
                </div>

                {/* Center Navigation Links (Desktop) */}
                <nav className='hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs shrink-0'>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleNavClick(item)}
                                className={`px-4 lg:px-5 py-2 rounded-xl text-[15px] font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/70"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Right Actions (Desktop) */}
                <div className='hidden sm:flex items-center gap-3.5 shrink-0'>
                    {/* Credits Indicator Pill */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true);
                                    return;
                                }
                                setShowCreditPopup(!showCreditPopup);
                                setShowUserPopup(false);
                            }}
                            className='flex items-center gap-2.5 bg-gradient-to-r from-amber-50/90 via-amber-100/60 to-amber-50/90 border border-amber-300/80 px-4 py-2.5 rounded-2xl hover:border-amber-400 hover:shadow-md transition-all duration-200 cursor-pointer'
                            title="View Credits"
                        >
                            <BsCoin size={20} className='text-amber-500 drop-shadow-2xs animate-pulse' />
                            <span className='font-extrabold text-[15px] text-slate-900'>
                                {userData ? userData.credits : '—'}
                            </span>
                            <span className='text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-lg'>
                                Credits
                            </span>
                        </button>

                        {/* Credits Popover */}
                        {showCreditPopup && (
                            <div className='absolute right-0 mt-3 w-80 bg-white shadow-2xl border border-slate-200 rounded-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2'>
                                <div className='flex items-center justify-between mb-3'>
                                    <h4 className='font-bold text-slate-900 text-base'>Credit Balance</h4>
                                    <span className='text-emerald-600 font-black text-lg flex items-center gap-1.5'>
                                        <BsCoin size={20} className="text-amber-500" />
                                        {userData?.credits ?? 0}
                                    </span>
                                </div>
                                <p className='text-xs text-slate-600 mb-4 leading-relaxed'>
                                    Each mock interview session requires 50 credits. Refill at any time with transparent pricing.
                                </p>
                                <button
                                    onClick={() => {
                                        setShowCreditPopup(false);
                                        navigate("/pricing");
                                    }}
                                    className='w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer'
                                >
                                    <FaCoins size={15} />
                                    Buy More Credits
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Primary "Start Interview" CTA */}
                    <button
                        onClick={() => {
                            if (!userData) {
                                setShowAuth(true);
                                return;
                            }
                            navigate("/interview");
                        }}
                        className='flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white px-5 lg:px-6 py-2.5 rounded-2xl font-bold text-[15px] shadow-md shadow-slate-900/15 hover:shadow-lg transition-all duration-200 cursor-pointer'
                    >
                        <BsPlayCircleFill size={18} className="text-emerald-400" />
                        <span>Start Interview</span>
                    </button>

                    {/* User Profile Avatar */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true);
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false);
                            }}
                            className='w-11 h-11 bg-gradient-to-tr from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-2xl flex items-center justify-center font-bold text-base shadow-sm border border-slate-300/40 hover:scale-105 transition-all cursor-pointer'
                        >
                            {userData ? userData?.name?.slice(0, 1)?.toUpperCase() : <FaUserAstronaut size={18} />}
                        </button>

                        {/* Profile Menu Popover */}
                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-slate-200 rounded-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2'>
                                <div className='px-3.5 py-2.5 border-b border-slate-100 mb-2'>
                                    <p className='text-xs text-slate-400 uppercase tracking-wider font-bold'>Account</p>
                                    <p className='text-sm font-black text-slate-900 truncate'>{userData?.name}</p>
                                    <p className='text-xs text-slate-500 truncate'>{userData?.email}</p>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowUserPopup(false);
                                        navigate("/history");
                                    }}
                                    className='w-full text-left text-sm py-2.5 px-3.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-3 transition cursor-pointer'
                                >
                                    <FaHistory size={16} className="text-slate-500" />
                                    Interview History
                                </button>
                                <button
                                    onClick={() => {
                                        setShowUserPopup(false);
                                        navigate("/pricing");
                                    }}
                                    className='w-full text-left text-sm py-2.5 px-3.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-3 transition cursor-pointer'
                                >
                                    <FaCoins size={16} className="text-amber-500" />
                                    Subscription & Credits
                                </button>
                                <div className='border-t border-slate-100 my-1'></div>
                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left text-sm py-2.5 px-3.5 rounded-xl hover:bg-red-50 text-red-600 font-semibold flex items-center gap-3 transition cursor-pointer'
                                >
                                    <HiOutlineLogout size={18} />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Hamburger Button */}
                <div className='flex md:hidden items-center gap-2'>
                    {/* Compact credits indicator on mobile */}
                    <button
                        onClick={() => {
                            if (!userData) {
                                setShowAuth(true);
                                return;
                            }
                            navigate("/pricing");
                        }}
                        className='flex items-center gap-1.5 bg-amber-50 border border-amber-300/80 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-900'
                    >
                        <BsCoin size={15} className='text-amber-500' />
                        <span>{userData ? userData.credits : '—'}</span>
                    </button>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition'
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className='md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2'>
                    <div className='space-y-1'>
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => handleNavClick(item)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                                    location.pathname === item.path
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className='pt-3 border-t border-slate-100 flex flex-col gap-2'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true);
                                    return;
                                }
                                setMobileMenuOpen(false);
                                navigate("/interview");
                            }}
                            className='w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2'
                        >
                            <BsPlayCircleFill size={16} className="text-emerald-400" />
                            Start Interview
                        </button>
                        {userData ? (
                            <button
                                onClick={handleLogout}
                                className='w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50'
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setShowAuth(true);
                                }}
                                className='w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50'
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </header>
    );
}

export default Navbar;
