"use client";

import React, { useState, useEffect } from 'react';
import { Bookmark, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import HumanSidePage from './HumanSidePage';

// --- STORY DATA ---
const stories = [
  {
    id: 1,
    label: "Event Snapshot — Age 9",
    title: "Geometry Crowd",
    subtitle: "The legacy of a family of ten.",
    content: `Growing up in a family of 10 I always think of my family as inferior. Well the perception is if you coming from a low income household you have a lots of siblings. Im the second youngest among them. and being among the youngest you carry the legacy of the family. Yup I mean the school uniform from my brother, his bag his pants some of his old unuse book. Sometimes theres a side of me that feel small when its the beginning of the year and other people shirt are much whiter, cleaner, newer compared to mine that feels like it has been passed down for generation. Since that my gap with my elders sister in the family quite far the responsibility to teach fall on their lapse to teach me. Oh boy yup they definitely beat the hell out of me. My sisters are so scary. I still remember when I was 9 years old Ill go to school bringing the homework that she gave to me instead of me bringing school from work. Thats how scary she is. But again its all for the best of my growth. though i believe she could be nicer.`,
    illustration: (
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-md mx-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 150C50 94.7715 94.7715 50 150 50H250C305.228 50 350 94.7715 350 150C350 205.228 305.228 250 250 250H150C94.7715 250 50 205.228 50 150Z" fill="#FFF0E5" opacity="0.1"/>
        <rect x="120" y="200" width="160" height="30" rx="4" fill="#4B5563" stroke="#9CA3AF" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="130" y="170" width="140" height="30" rx="4" fill="#374151" stroke="#9CA3AF" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="140" y="140" width="130" height="30" rx="4" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M100 230V150C100 127.909 117.909 110 140 110H170C192.091 110 210 127.909 210 150V230" fill="#059669" stroke="#34D399" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M110 170H200V230H110V170Z" fill="#10B981" stroke="#34D399" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="155" cy="200" r="10" fill="#F59E0B" stroke="#FCD34D" strokeWidth="2"/>
        <path d="M140 110V90C140 84.4772 144.477 80 150 80H160C165.523 80 170 84.4772 170 90V110" stroke="#34D399" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: 2,
    label: "Event Snapshot — Ages 12 to 17",
    title: "The Unmapped Design",
    subtitle: "The odd one out.",
    content: `My family most of them are a scholar they have always been very good academically and are outstanding performer at school. Im the odd one. I like sports and am very good at it. I represent my state when I was 12, 15 and 17 year old, but yet again it never a litmus test for my family because in my family you can win an olympic great makesure you pack your bag for school tomorrow. At times I felt jealous looking at other of my teammates having their parent come and support them while me just astray. But again its a big family what can I expect. When I joined boarding school I lost half of me and I started to have a fixed mindset about where I truly belonged. It was a period of rebellion, quiet observation, and slowly realizing that my unique path didn't have to mirror theirs to be valid. Sports taught me resilience, a trait that would later fuel my dive into the complexities of human capital.`,
    illustration: (
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-md mx-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M350 150C350 205.228 305.228 250 250 250H150C94.7715 250 50 205.228 50 150C50 94.7715 94.7715 50 150 50H250C305.228 50 350 94.7715 350 150Z" fill="#E0F2FE" opacity="0.1"/>
        <circle cx="200" cy="150" r="60" fill="#0284C7" stroke="#7DD3FC" strokeWidth="2"/>
        <path d="M160 110C160 110 180 90 240 110C300 130 260 190 260 190C260 190 240 210 180 190C120 170 160 110 160 110Z" stroke="#BAE6FD" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8"/>
        <circle cx="200" cy="150" r="20" fill="#38BDF8" />
        <path d="M120 220L150 180" stroke="#7DD3FC" strokeWidth="6" strokeLinecap="round"/>
        <path d="M280 80L250 120" stroke="#7DD3FC" strokeWidth="6" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function App() {
  const [isProfessionalView, setIsProfessionalView] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Re-run intersection observer whenever the view changes
  useEffect(() => {
    if (isProfessionalView) {
      const animatedElements = document.querySelectorAll('.fade-in-up');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(el => observer.observe(el));
      return () => animatedElements.forEach(el => observer.unobserve(el));
    }
  }, [isProfessionalView]);

  const toggleView = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsProfessionalView(!isProfessionalView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Short delay before fading back in
      setTimeout(() => setIsTransitioning(false), 50);
    }, 400); // Duration of fade out
  };

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  if (!isProfessionalView) {
    return (
      <div className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <HumanSidePage onSwitchBack={toggleView} />
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'} antialiased min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-blue-500/30`}>
      <style>{`
        body { font-family: 'Inter', sans-serif; background-color: #0d1117; color: #c9d1d9; }
        .hero-gradient-bg { background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%); position: relative; overflow: hidden; }
        .animated-grid {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image: linear-gradient(to right, rgba(38, 50, 56, 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(38, 50, 56, 0.3) 1px, transparent 1px);
          background-size: 40px 40px; animation: pan-grid 20s linear infinite;
        }
        @keyframes pan-grid { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }
        .section-title { color: #58a6ff; }
        .card { background-color: #161b22; border: 1px solid #30363d; transition: transform 0.3s ease, border-color 0.3s ease; }
        .card:hover { transform: translateY(-5px); border-color: #58a6ff; }
        .btn-primary { background-color: #238636; color: #ffffff; transition: background-color 0.3s ease; }
        .btn-primary:hover { background-color: #2ea043; }
        .fade-in-up { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .fade-in-up.is-visible { opacity: 1; transform: translateY(0); }
        .story-bg { background: radial-gradient(circle at center, #1f2937 0%, #0d1117 100%); }
      `}</style>

      {/* --- HEADER --- */}
      <header className="bg-black/40 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white tracking-wider">HUZAIFAH ADAM</div>
            
            <div className="flex items-center space-x-6">
              {/* Navigation only visible on Professional Side */}
              {isProfessionalView && (
                <nav className="hidden md:flex items-center space-x-6">
                  <a href="#statement" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Statement</a>
                  <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Portfolio</a>
                  <a href="#skills" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Skills</a>
                </nav>
              )}

              {/* The "Clicker" Toggle Button */}
              <button 
                onClick={toggleView}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg ${
                  isProfessionalView 
                  ? "bg-[#FDFBF7] text-gray-900 hover:bg-white border border-gray-200" 
                  : "bg-[#161b22] text-white hover:bg-[#21262d] border border-gray-700"
                }`}
              >
                {isProfessionalView ? (
                  <span>The human side of me</span>
                ) : (
                  <>
                    <Briefcase size={16} />
                    <span>Return to Professional</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="hero-gradient-bg pt-32 pb-24 text-white">
                <div className="animated-grid"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">Leveraging Data Analytics to Drive <br className="hidden md:block"/>Strategic Human Capital Outcomes</h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-light">
                        I transform complex data into clear, actionable strategies that drive organizational growth and empower people.
                    </p>
                    <a href="#portfolio" className="btn-primary font-bold px-8 py-3.5 rounded-lg text-lg inline-block shadow-lg shadow-green-900/20">
                        View My Work
                    </a>
                </div>
            </section>

            {/* Professional Statement Section */}
            <section id="statement" className="py-20 md:py-28 bg-[#0d1117]">
                <div className="container mx-auto px-6">
                    <div className="fade-in-up max-w-5xl mx-auto grid md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-1">
                            <img src="https://i.postimg.cc/pLgrB8xm/Screenshot-2025-11-07-at-12-05-06-PM.png" alt="Huzaifah Adam" className="rounded-full border-4 border-gray-800 shadow-2xl w-64 h-64 object-cover mx-auto md:mx-0" />
                        </div>
                        <div className="md:col-span-2">
                            <h2 className="section-title text-sm font-bold tracking-widest uppercase mb-4">PROFESSIONAL STATEMENT</h2>
                            <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed border-l-4 border-blue-500 pl-6 italic">
                                "I am driven by the intersection of data and human psychology, transforming complex information into clear, actionable strategies that empower organizations and their people."
                            </blockquote>
                            <p className="mt-8 text-lg font-bold text-white">Huzaifah Adam</p>
                            <p className="text-gray-400">Strategic Analyst, advising on human capital initiatives at Khazanah Nasional Berhad.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Competencies Section */}
            <section className="py-20 md:py-28 bg-[#161b22]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title text-sm font-bold tracking-widest uppercase mb-4 fade-in-up">Core Competencies</h2>
                        <p className="text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto fade-in-up" style={{transitionDelay: '100ms'}}>My expertise lies at the intersection of strategy, data, and people.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="card p-8 rounded-xl fade-in-up" style={{transitionDelay: '200ms'}}>
                            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">HR Strategy & Transformation</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Developing and implementing talent frameworks and process improvements that align with strategic business goals.</p>
                        </div>
                        <div className="card p-8 rounded-xl fade-in-up" style={{transitionDelay: '300ms'}}>
                            <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Data-Driven Advisory</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Utilizing quantitative and qualitative data to provide leadership with tangible arguments for evidence-based decisions.</p>
                        </div>
                        <div className="card p-8 rounded-xl fade-in-up" style={{transitionDelay: '400ms'}}>
                            <div className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Stakeholder Management</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Leading cross-functional initiatives and managing high-stakes events to ensure alignment with all stakeholders.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Portfolio Section */}
            <section id="portfolio" className="py-20 md:py-28 bg-[#0d1117]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title text-sm font-bold tracking-widest uppercase mb-4 fade-in-up">Portfolio Highlights</h2>
                        <p className="text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto fade-in-up" style={{transitionDelay: '100ms'}}>Selected case studies of my work.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Project 1 */}
                        <div className="card p-8 rounded-2xl flex flex-col fade-in-up">
                            <div className="flex-grow">
                                <p className="text-blue-400 font-semibold text-sm tracking-wide">Case Study 1</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 leading-snug">A Data-Driven Proposal to Increase Program ROI by Shifting Recruitment Focus.</h3>
                                <p className="text-gray-400">Strategic Review of a Graduate Trainee Program.</p>
                            </div>
                            <div className="mt-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Data Analysis</span>
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Change Management</span>
                                </div>
                                <a href="https://casestudyone-sanitized.pages.dev/Case%20study%201%20(sanitized)" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                  View Case Study <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                        {/* Project 2 */}
                        <div className="card p-8 rounded-2xl flex flex-col fade-in-up" style={{transitionDelay: '100ms'}}>
                            <div className="flex-grow">
                                <p className="text-blue-400 font-semibold text-sm tracking-wide">Case Study 2</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 leading-snug">Enhancing Success Rates of Locally-Trained Economics Graduates.</h3>
                                <p className="text-gray-400">Strategic Review at a leading Malaysian GLIC.</p>
                            </div>
                            <div className="mt-8">
                                 <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Project Coordination</span>
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Stakeholder Engagement</span>
                                </div>
                                <a href="https://casestudyone-sanitized.pages.dev/Case%20study%202%20(sanitized)" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                  View Case Study <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                        {/* Project 3 */}
                        <div className="card p-8 rounded-2xl flex flex-col fade-in-up">
                            <div className="flex-grow">
                                <p className="text-blue-400 font-semibold text-sm tracking-wide">Case Study 3</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 leading-snug">A Strategic Overhaul of a Premier Talent Retention Program.</h3>
                                <p className="text-gray-400">Strategic Review of a Graduate Trainee Program.</p>
                            </div>
                            <div className="mt-8">
                                 <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Problem Solving</span>
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Forward Thinking</span>
                                </div>
                                <a href="https://casestudyone-sanitized.pages.dev/Case%20study%203%20(sanitized)" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                  View Case Study <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                        {/* Project 4 */}
                        <div className="card p-8 rounded-2xl flex flex-col fade-in-up" style={{transitionDelay: '100ms'}}>
                            <div className="flex-grow">
                                <p className="text-blue-400 font-semibold text-sm tracking-wide">Case Study 4</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 leading-snug">Addressing Challenges on Domestic Talent Pipeline.</h3>
                                <p className="text-gray-400">Strategic Review of a Graduate Trainee Program.</p>
                            </div>
                            <div className="mt-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Diversity</span>
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Data Analytics</span>
                                </div>
                                <a href="https://casestudyone-sanitized.pages.dev/Case%20study%204%20(sanitized)" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                                  View Case Study <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* App Highlights */}
                    <div className="mt-24 text-center mb-16">
                        <h2 className="section-title text-sm font-bold tracking-widest uppercase mb-4 fade-in-up">App Portfolio</h2>
                        <p className="text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto fade-in-up" style={{transitionDelay: '100ms'}}>Selected apps of my work.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* App 1: Consultant Aptitude Trainer */}
                        <div className="card p-8 rounded-2xl flex flex-col fade-in-up">
                            <div className="flex-grow">
                                <p className="text-purple-400 font-semibold text-sm tracking-wide">AI Application</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 leading-snug">Consultant Aptitude Trainer</h3>
                                <p className="text-gray-400">Sharpen your skills with AI-powered practice tests, evaluating logical and numerical reasoning.</p>
                            </div>
                            <div className="mt-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">AI Studio</span>
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Gemini</span>
                                </div>
                                <a href="https://consultant-aptitude-test.web.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                                  Try the App <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                        {/* App 2: Leadership Engagement Survey */}
                        <div className="card p-8 rounded-2xl flex flex-col fade-in-up" style={{transitionDelay: '100ms'}}>
                            <div className="flex-grow">
                                <p className="text-purple-400 font-semibold text-sm tracking-wide">Web Application</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 leading-snug">Leadership Engagement Survey</h3>
                                <p className="text-gray-400">An interactive leadership assessment and organizational consulting tool.</p>
                            </div>
                            <div className="mt-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Assessment Tool</span>
                                    <span className="bg-[#21262d] border border-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Firebase</span>
                                </div>
                                <a href="https://kornferry-wannabe.web.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                                  Try the App <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Proficiencies Section */}
            <section id="skills" className="py-20 md:py-28 bg-[#161b22]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title text-sm font-bold tracking-widest uppercase mb-4 fade-in-up">Technical Proficiencies</h2>
                        <p className="text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto fade-in-up" style={{transitionDelay: '100ms'}}>Hands-on skills in data visualization and web development.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card rounded-2xl p-8 fade-in-up">
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                              <svg className="w-6 h-6 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M4 10h3v10H4V10zm5-5h3v15H9V5zm5 9h3v6h-3v-6zm5-4h3v10h-3v-10z"/></svg>
                              Data Visualization (Power BI)
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">I build intuitive dashboards to translate complex datasets into actionable insights. Below are samples from a training feedback survey I developed.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <img src="https://i.postimg.cc/fS0x3mzp/Screenshot-2025-08-23-232004.png" alt="Power BI Dashboard 1" className="rounded-lg shadow-xl border border-gray-700 opacity-90 hover:opacity-100 transition-opacity cursor-zoom-in" />
                               <img src="https://i.postimg.cc/SY7LYJnG/image-42ac08.png" alt="Power BI Dashboard Drill Down" className="rounded-lg shadow-xl border border-gray-700 opacity-90 hover:opacity-100 transition-opacity cursor-zoom-in" />
                            </div>
                        </div>
                        <div className="card rounded-2xl p-8 fade-in-up">
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                              <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                              Web Development (HTML/CSS)
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">I create clean, professional, and responsive webpages for specific business needs, such as the event info deck shown below.</p>
                            <a href="https://knbhrn2025.pages.dev/knbhrnetwork" target="_blank" rel="noopener noreferrer" className="block aspect-video bg-[#0d1117] rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors group">
                                 <div className="bg-white rounded-md h-full w-full p-2 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                                    <div className="flex items-center space-x-1.5 mb-3 px-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                    </div>
                                    <div style={{backgroundColor: '#2B3889'}} className="h-6 w-full rounded-t-sm mb-2"></div>
                                    <div className="bg-gray-100 h-16 w-3/4 rounded-sm mb-2"></div>
                                    <div className="bg-gray-100 h-8 w-1/2 rounded-sm"></div>
                                 </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certificates Section */}
            <section id="certificates" className="py-20 md:py-28 bg-[#0d1117]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title text-sm font-bold tracking-widest uppercase mb-4 fade-in-up">Certificates & Credentials</h2>
                        <p className="text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto fade-in-up" style={{transitionDelay: '100ms'}}>My certifications provide a unique ability to quantify business impact.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Certificate 1 */}
                        <div className="card rounded-xl p-6 flex items-start space-x-4 fade-in-up" style={{transitionDelay: '200ms'}}>
                            <div className="flex-shrink-0 text-green-400">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 12a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Financial Modeling</h3>
                                <p className="text-gray-400 text-sm mt-1">Training The Street</p>
                                <p className="text-xs text-gray-500 mt-2 font-mono">Issued Nov 2024</p>
                            </div>
                        </div>
                         {/* Certificate 2 */}
                        <div className="card rounded-xl p-6 flex items-start space-x-4 fade-in-up" style={{transitionDelay: '300ms'}}>
                            <div className="flex-shrink-0 text-green-400">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 12a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Valuation</h3>
                                <p className="text-gray-400 text-sm mt-1">Training The Street</p>
                                <p className="text-xs text-gray-500 mt-2 font-mono">Issued Nov 2024</p>
                            </div>
                        </div>
                         {/* Certificate 3 */}
                        <div className="card rounded-xl p-6 flex items-start space-x-4 fade-in-up" style={{transitionDelay: '400ms'}}>
                            <div className="flex-shrink-0 text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 12a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Data-Driven Decisions</h3>
                                <p className="text-gray-400 text-sm mt-1">Coursera</p>
                                <p className="text-xs text-gray-500 mt-2 font-mono">Issued Aug 2022</p>
                            </div>
                        </div>
                         {/* Certificate 4 */}
                        <div className="card rounded-xl p-6 flex items-start space-x-4 fade-in-up" style={{transitionDelay: '500ms'}}>
                            <div className="flex-shrink-0 text-blue-400">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 12a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Foundations: Data, Everywhere</h3>
                                <p className="text-gray-400 text-sm mt-1">Coursera</p>
                                <p className="text-xs text-gray-500 mt-2 font-mono">Issued Aug 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 md:py-28 bg-[#0d1117] text-center border-t border-gray-800/50">
                <div className="container mx-auto px-6 fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Connect?</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">I am always open to discussing new opportunities and collaborations. Let's discuss how I can bring value to your team.</p>
                    <a href="mailto:huzaifah.adam.98@gmail.com" className="btn-primary font-bold px-10 py-4 rounded-lg text-lg inline-block shadow-lg">
                        Get In Touch
                    </a>
                </div>
            </section>
          </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d1117] border-t border-gray-800 py-10 mt-auto">
          <div className="container mx-auto px-6 text-center text-gray-500">
              <div className="flex justify-center space-x-6 mb-6">
                   <a href="https://www.linkedin.com/in/huzaifah-adam-gmpsss-a2a334183/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors bg-gray-800/50 p-3 rounded-full">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
              </div>
              <p>&copy; 2025 Huzaifah Adam. All Rights Reserved.</p>
          </div>
      </footer>
    </div>
  );
}
