import React from 'react';
import { BsRobot, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className='w-full bg-white border-t border-slate-200/80 py-12 px-6 lg:px-12 mt-auto'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20'>
            <BsRobot size={20} />
          </div>
          <div>
            <h2 className='font-extrabold text-lg text-slate-900'>
              InterviewIQ<span className='text-emerald-600'>.AI</span>
            </h2>
            <p className='text-slate-500 text-xs mt-0.5'>
              Intelligent Mock Interview & Career Acceleration Platform
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600'>
          <button onClick={() => navigate("/")} className='hover:text-emerald-600 transition cursor-pointer'>Dashboard</button>
          <button onClick={() => navigate("/interview")} className='hover:text-emerald-600 transition cursor-pointer'>Practice</button>
          <button onClick={() => navigate("/history")} className='hover:text-emerald-600 transition cursor-pointer'>History</button>
          <button onClick={() => navigate("/pricing")} className='hover:text-emerald-600 transition cursor-pointer'>Pricing</button>
        </div>

        <div className='text-xs text-slate-400'>
          © {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
