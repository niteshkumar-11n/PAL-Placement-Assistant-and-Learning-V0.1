import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRight,
  BsPlayFill,
  BsLightningChargeFill,
  BsShieldCheck,
  BsCheckCircleFill,
  BsCpu,
  BsSoundwave
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { FaHistory, FaCoins, FaUserCheck, FaMicrophoneAlt, FaAward } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';
import femaleAiImg from "../assets/female-ai-interviewer.jpg";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleStartInterview = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    navigate("/interview");
  };

  const handleViewHistory = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    navigate("/history");
  };

  const handleCreditsClick = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    navigate("/pricing");
  };

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col relative text-slate-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden'>
      {/* Background Decorative Mesh Gradients */}
      <div className='absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10' />
      <div className='absolute top-40 right-10 w-96 h-96 bg-teal-200/25 rounded-full blur-3xl pointer-events-none -z-10' />
      <div className='absolute top-1/2 left-10 w-80 h-80 bg-blue-100/35 rounded-full blur-3xl pointer-events-none -z-10' />

      {/* Modern Sticky Navigation */}
      <Navbar />

      <main className='flex-1 w-full'>
        <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10'>
          
          {/* ==================================================
              HERO / DASHBOARD COMMAND CENTER (2-COLUMN BALANCED)
              ================================================== */}
          <section className='pt-8 sm:pt-12 pb-16 lg:pb-20'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center'>
              
              {/* Left Column: Heading, Subtitle & Primary CTAs */}
              <div className='lg:col-span-7 flex flex-col justify-center text-left'>
                {/* Top Pill Tag */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className='inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-2xs text-emerald-800 text-xs sm:text-sm font-extrabold w-fit mb-5'
                >
                  <span className='w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse' />
                  <HiSparkles size={16} className="text-emerald-600" />
                  <span>AI-Powered Smart Interview Platform</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-black tracking-tight text-slate-900 leading-[1.12]'
                >
                  Practice Interviews with{' '}
                  <span className='bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent block sm:inline'>
                    AI Intelligence
                  </span>
                </motion.h1>

                {/* Supporting Text */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className='text-base sm:text-lg lg:text-xl text-slate-600 mt-5 max-w-2xl font-normal leading-relaxed'
                >
                  Role-based mock interviews with adaptive follow-up questions, voice recognition, real-time feedback, and comprehensive analytics.
                </motion.p>

                {/* Primary Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className='flex flex-wrap items-center gap-3.5 sm:gap-4 mt-8'
                >
                  {/* Primary CTA: Start Interview */}
                  <button
                    onClick={handleStartInterview}
                    className='px-7 sm:px-8 py-4 rounded-2xl text-base sm:text-lg font-extrabold bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-3 group cursor-pointer'
                  >
                    <BsPlayFill size={24} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>Start Interview</span>
                    <BsArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-white" />
                  </button>

                  {/* Secondary CTA: View History */}
                  <button
                    onClick={handleViewHistory}
                    className='px-6 sm:px-7 py-4 rounded-2xl text-base sm:text-lg font-bold bg-white text-slate-800 border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2.5 cursor-pointer'
                  >
                    <FaHistory size={16} className="text-slate-500" />
                    <span>View History</span>
                  </button>

                  {/* Status / Credit Indicator */}
                  <button
                    onClick={handleCreditsClick}
                    className='px-5 py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-amber-50/90 text-amber-900 border border-amber-300 hover:bg-amber-100 hover:border-amber-400 transition-all flex items-center gap-2.5 shadow-2xs cursor-pointer'
                    title="Click to view pricing & credits"
                  >
                    <FaCoins size={16} className="text-amber-500" />
                    <span>{userData?.credits ? `${userData.credits} Credits Available` : "Credits Available"}</span>
                  </button>
                </motion.div>

                {/* Trust & Feature Checklist */}
                <div className='flex flex-wrap items-center gap-y-2 gap-x-6 mt-8 pt-6 border-t border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-500'>
                  <span className='flex items-center gap-2'>
                    <BsCheckCircleFill className="text-emerald-500 shrink-0" size={15} />
                    Adaptive Follow-ups
                  </span>
                  <span className='flex items-center gap-2'>
                    <BsCheckCircleFill className="text-emerald-500 shrink-0" size={15} />
                    Live Voice AI
                  </span>
                  <span className='flex items-center gap-2'>
                    <BsCheckCircleFill className="text-emerald-500 shrink-0" size={15} />
                    Instant Scoring Rubric
                  </span>
                </div>
              </div>

              {/* Right Column: AI Interviewer Visual & Feature Callouts */}
              <div className='lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='relative w-full max-w-[540px]'
                >
                  {/* Glow Backdrop */}
                  <div className='absolute -inset-1.5 bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-blue-500/20 rounded-[32px] blur-xl opacity-75' />

                  {/* Main Visual Card */}
                  <div className='relative bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden'>
                    
                    {/* Live Header Bar */}
                    <div className='px-4 py-3 bg-slate-900/90 text-white flex items-center justify-between backdrop-blur-md border-b border-slate-700/50'>
                      <div className='flex items-center gap-2'>
                        <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse' />
                        <span className='text-xs font-bold tracking-wider uppercase text-slate-200'>
                          Live AI Session
                        </span>
                      </div>
                      <div className='flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-xs font-medium text-emerald-300'>
                        <BsSoundwave size={15} />
                        <span>Voice Active</span>
                      </div>
                    </div>

                    {/* Female AI Interviewer Image */}
                    <div className='relative w-full aspect-[4/3] bg-slate-100 overflow-hidden'>
                      <img
                        src={femaleAiImg}
                        alt="AI Interviewer"
                        className='w-full h-full object-cover object-center transition-transform duration-500 hover:scale-102'
                      />

                      {/* Bottom Image Overlay Label */}
                      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-4 text-white flex items-center justify-between'>
                        <div>
                          <p className='font-extrabold text-sm text-white'>AI Senior Interviewer</p>
                          <p className='text-xs text-slate-300'>FAANG Standard Evaluation Engine</p>
                        </div>
                        <span className='bg-emerald-500/90 text-slate-950 text-xs font-black px-2.5 py-1 rounded-lg'>
                          Ready
                        </span>
                      </div>
                    </div>

                    {/* Integrated Feature Grid Below Visual */}
                    <div className='grid grid-cols-2 gap-2.5 p-3.5 bg-slate-50/90 border-t border-slate-100'>
                      <div className='flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs'>
                        <div className='w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0'>
                          <BsCpu size={16} />
                        </div>
                        <div className='truncate'>
                          <p className='text-xs font-bold text-slate-900 truncate'>Adaptive Questions</p>
                          <p className='text-[10px] text-slate-500 truncate'>Dynamic context</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs'>
                        <div className='w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0'>
                          <BsShieldCheck size={16} />
                        </div>
                        <div className='truncate'>
                          <p className='text-xs font-bold text-slate-900 truncate'>Real-time Feedback</p>
                          <p className='text-[10px] text-slate-500 truncate'>Instant scoring</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs'>
                        <div className='w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0'>
                          <BsMic size={16} />
                        </div>
                        <div className='truncate'>
                          <p className='text-xs font-bold text-slate-900 truncate'>Voice Recognition</p>
                          <p className='text-[10px] text-slate-500 truncate'>Speech-to-text</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs'>
                        <div className='w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0'>
                          <BsBarChart size={16} />
                        </div>
                        <div className='truncate'>
                          <p className='text-xs font-bold text-slate-900 truncate'>Detailed Analytics</p>
                          <p className='text-[10px] text-slate-500 truncate'>FAANG rubric</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </section>

          {/* ==================================================
              STATISTICS SECTION (4 EQUAL-WIDTH BALANCED CARDS)
              ================================================== */}
          <section className='mb-20'>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'
            >
              {/* Metric 1 */}
              <div className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full'>
                <div className='w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-2xs'>
                  <BsLightningChargeFill size={22} />
                </div>
                <div>
                  <div className='text-3xl sm:text-4xl font-black text-slate-900 tracking-tight'>10k+</div>
                  <div className='text-sm sm:text-base font-semibold text-slate-600 mt-1'>Interviews Hosted</div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full'>
                <div className='w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 shadow-2xs'>
                  <FaUserCheck size={22} />
                </div>
                <div>
                  <div className='text-3xl sm:text-4xl font-black text-slate-900 tracking-tight'>94%</div>
                  <div className='text-sm sm:text-base font-semibold text-slate-600 mt-1'>Confidence Boost</div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full'>
                <div className='w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-2xs'>
                  <FaMicrophoneAlt size={22} />
                </div>
                <div>
                  <div className='text-3xl sm:text-4xl font-black text-slate-900 tracking-tight'>Live</div>
                  <div className='text-sm sm:text-base font-semibold text-slate-600 mt-1'>Voice & Timer Mode</div>
                </div>
              </div>

              {/* Metric 4 */}
              <div className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full'>
                <div className='w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-2xs'>
                  <FaAward size={22} />
                </div>
                <div>
                  <div className='text-3xl sm:text-4xl font-black text-slate-900 tracking-tight'>4.9 / 5</div>
                  <div className='text-sm sm:text-base font-semibold text-slate-600 mt-1'>Candidate Rating</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ==================================================
              WORKFLOW SECTION: SIMPLE 3-STEP WORKFLOW
              ================================================== */}
          <section className='mb-24'>
            <div className='text-center mb-12'>
              <span className='text-xs sm:text-sm font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/80 inline-block'>
                Simple 3-Step Workflow
              </span>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-4 tracking-tight'>
                How InterviewIQ Prepares You
              </h2>
              <p className='text-slate-600 text-base sm:text-lg max-w-xl mx-auto mt-2 font-normal'>
                From role configuration to in-depth feedback in three streamlined steps.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
              {[
                {
                  step: "STEP 01",
                  number: "01",
                  icon: <BsRobot size={32} />,
                  title: "Choose Your Role",
                  desc: "Select target job role, years of experience, and optionally upload your resume to generate customized questions.",
                  gradient: "from-emerald-500 to-teal-600",
                },
                {
                  step: "STEP 02",
                  number: "02",
                  icon: <BsMic size={32} />,
                  title: "Take AI Mock Interview",
                  desc: "Engage in realistic voice-driven interviews with dynamic follow-ups, adaptive difficulty, and timer simulation.",
                  gradient: "from-teal-600 to-cyan-600",
                },
                {
                  step: "STEP 03",
                  number: "03",
                  icon: <BsClock size={32} />,
                  title: "Get Detailed Feedback",
                  desc: "Receive comprehensive scoring across communication, correctness, confidence, and export complete PDF dossiers.",
                  gradient: "from-emerald-600 to-slate-800",
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className='relative bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full'
                >
                  {/* Number Watermark */}
                  <div className='absolute -right-3 -bottom-5 text-7xl sm:text-8xl font-black text-slate-100 group-hover:text-emerald-50 transition-colors pointer-events-none select-none'>
                    {item.number}
                  </div>

                  <div>
                    {/* Step Badge & Icon */}
                    <div className='flex items-center justify-between mb-6'>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform`}>
                        {item.icon}
                      </div>
                      <span className='text-xs font-black tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200/60'>
                        {item.step}
                      </span>
                    </div>

                    <h3 className='text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors'>
                      {item.title}
                    </h3>

                    <p className='text-slate-600 text-base leading-relaxed'>
                      {item.desc}
                    </p>
                  </div>

                  <div className='mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-emerald-600 font-bold text-sm'>
                    <span>Explore step flow</span>
                    <BsArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ==================================================
              ADVANCED AI CAPABILITIES SECTION
              ================================================== */}
          <section className='mb-24'>
            <div className='text-center mb-12'>
              <span className='text-xs sm:text-sm font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/80 inline-block'>
                Deep Evaluation Tools
              </span>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-4 tracking-tight'>
                Advanced AI Capabilities
              </h2>
              <p className='text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-2 font-normal'>
                State-of-the-art multimodal interview scoring modeled after FAANG hiring bars.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={24} />,
                  title: "AI Answer Evaluation",
                  desc: "Scores communication clarity, technical depth, correctness, and natural voice confidence in real time.",
                  tag: "Multi-Metric Scoring"
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={24} />,
                  title: "Resume-Based Inquiries",
                  desc: "Analyzes uploaded PDFs to extract verified projects, tech stacks, and crafts personalized interview prompts.",
                  tag: "Smart PDF Parsing"
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={24} />,
                  title: "Comprehensive PDF Dossier",
                  desc: "Export professional interview summaries with itemized breakdowns and actionable feedback highlights.",
                  tag: "Exportable Analytics"
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={24} />,
                  title: "Performance History & Trends",
                  desc: "Track interview scores over time with dynamic trend charts, weak spot identifiers, and progress indicators.",
                  tag: "Trend Analytics"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className='bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col sm:flex-row items-center gap-6 sm:gap-8'
                >
                  <div className='w-full sm:w-1/2 flex justify-center bg-slate-50/80 p-4 rounded-2xl border border-slate-100'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-full h-auto object-contain max-h-52 drop-shadow-xs hover:scale-105 transition-transform'
                    />
                  </div>

                  <div className='w-full sm:w-1/2'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shadow-2xs'>
                        {item.icon}
                      </div>
                      <span className='text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full'>
                        {item.tag}
                      </span>
                    </div>

                    <h3 className='text-xl sm:text-2xl font-bold text-slate-900 mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-sm sm:text-base text-slate-600 leading-relaxed'>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ==================================================
              MULTIPLE INTERVIEW MODES SECTION
              ================================================== */}
          <section className='mb-24'>
            <div className='text-center mb-12'>
              <span className='text-xs sm:text-sm font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/80 inline-block'>
                Tailored Scenarios
              </span>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-4 tracking-tight'>
                Multiple Interview Modes
              </h2>
              <p className='text-slate-600 text-base sm:text-lg max-w-xl mx-auto mt-2 font-normal'>
                Switch between technical rigor and behavioral depth with a single click.
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                {
                  img: hrImg,
                  title: "HR Behavioral Mode",
                  desc: "Situational questions, leadership principles, and cultural fitness.",
                  badge: "Behavioral",
                },
                {
                  img: techImg,
                  title: "Technical Mastery",
                  desc: "System design, algorithmic logic, coding patterns, and architecture.",
                  badge: "Technical",
                },
                {
                  img: confidenceImg,
                  title: "Speech & Tone Analysis",
                  desc: "Identifies filler words, pacing, and delivery confidence.",
                  badge: "Voice AI",
                },
                {
                  img: creditImg,
                  title: "Smart Credit Wallet",
                  desc: "Flexible session packs, zero monthly lock-ins, and instant top-ups.",
                  badge: "Flexible",
                }
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className='bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between h-full'
                >
                  <div>
                    <div className='w-full h-36 flex items-center justify-center bg-slate-50 rounded-2xl mb-4 p-3 border border-slate-100'>
                      <img
                        src={mode.img}
                        alt={mode.title}
                        className='max-h-28 w-auto object-contain drop-shadow-2xs'
                      />
                    </div>
                    <span className='text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 mb-2 inline-block'>
                      {mode.badge}
                    </span>
                    <h3 className='text-xl font-bold text-slate-900 mb-2'>
                      {mode.title}
                    </h3>
                    <p className='text-sm text-slate-600 leading-relaxed'>
                      {mode.desc}
                    </p>
                  </div>

                  <button
                    onClick={handleStartInterview}
                    className='mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer'
                  >
                    <span>Try Mode</span>
                    <BsArrowRight size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ==================================================
              BOTTOM CALL TO ACTION BANNER
              ================================================== */}
          <section className='mb-20'>
            <div className='relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl'>
              <div className='absolute right-0 top-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none' />
              <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left'>
                <div>
                  <span className='inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-4'>
                    <HiSparkles size={14} />
                    Start in under 30 seconds
                  </span>
                  <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight'>
                    Ready to Crack Your Next Tech Interview?
                  </h2>
                  <p className='text-slate-300 text-base sm:text-lg mt-3 max-w-2xl'>
                    Choose your role, let the AI craft your tailored interview round, and level up your presentation today.
                  </p>
                </div>

                <div className='flex flex-wrap items-center justify-center gap-4 shrink-0'>
                  <button
                    onClick={handleStartInterview}
                    className='px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer'
                  >
                    <BsPlayFill size={22} />
                    <span>Launch Mock Interview</span>
                  </button>
                  <button
                    onClick={() => navigate("/pricing")}
                    className='px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer'
                  >
                    View Plans
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  );
}

export default Home;
