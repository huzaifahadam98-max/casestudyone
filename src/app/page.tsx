"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const journeyData = [
  {
      id: 'bsn',
      date: 'Dec 2025 - Present',
      title: 'Performance Management Executive',
      organization: 'Bank Simpanan Nasional',
      category: 'Experience',
      typeClass: 'tag-experience',
      shortDesc: 'Applying behavioral psychology to organizational performance and fair governance.',
      image: null,
      fullContent: `
          <ul class="list-disc pl-4 space-y-2 text-[#4A4159]">
              <li><strong>Digital Transformation:</strong> Developed and launched the LES 360 digital report by embedding the Korn Ferry framework into an automated reporting system.</li>
              <li><strong>Workforce Scarcity Analysis:</strong> Built comprehensive dashboards to visualize workforce scarcity, enabling data-driven strategic planning for future hiring needs.</li>
              <li><strong>Performance Governance:</strong> Led an investigation into performance rating inconsistencies, adjusting governance to ensure appraisal objectivity and fairness.</li>
          </ul>
      `
  },
  {
      id: 'khazanah',
      date: 'Oct 2024 - Sep 2025',
      title: 'Analyst, Strategic Human Capital',
      organization: 'Khazanah Nasional Berhad',
      category: 'Experience',
      typeClass: 'tag-experience',
      shortDesc: 'Connecting data points to understand employee well-being and growth.',
      image: null,
      fullContent: `
          <ul class="list-disc pl-4 space-y-2 text-[#4A4159]">
              <li><strong>People Analytics Dashboard:</strong> Designed a Power BI dashboard processing HRIS data to visualize key metrics in real-time.</li>
              <li><strong>Global Talent Acquisition:</strong> Screened over 4,000 applicants for the US & UK Global Graduate Recruitment.</li>
              <li><strong>Community Building in Office:</strong> Spearheaded the Khazanah HR Network Event 2025 to create a platform for HR leaders to share industry best practices.</li>
          </ul>
      `
  },
  {
      id: 'professional-speaking',
      date: 'Ongoing',
      title: 'Academic Presenter & Speaker',
      organization: 'Academic Conferences & Forums',
      category: 'Experience',
      typeClass: 'tag-experience',
      shortDesc: 'Sharing psychological insights and research findings with international audiences.',
      image: null,
      fullContent: `
          <p class="text-[#4A4159] leading-relaxed mb-3">
              Translating complex psychological data into compelling narratives is a core skill in People Analytics. Presenting at these forums hones my ability to communicate strategic insights effectively to diverse stakeholders.
          </p>
          <ul class="list-disc pl-4 space-y-2 text-[#4A4159]">
              <li><strong>Speaker, UTM:</strong> Delivered insights at the Psychology Forum at Universiti Teknologi Malaysia.</li>
              <li><strong>Presenter, Leeds:</strong> Shared research and perspectives at the Leeds Religion Conference in the UK.</li>
              <li><strong>Presenter, Indonesia:</strong> Presented academic findings at the Psychology Indonesia Conference.</li>
          </ul>
      `
  },
  {
      id: 'teaching',
      date: 'Ongoing Initiative',
      title: 'Applied Psychology Educator',
      organization: 'Teaching & Therapy Initiatives',
      category: 'Volunteer',
      typeClass: 'tag-volunteer',
      shortDesc: 'Bridging academic psychology with real-world developmental support.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fullContent: `
          <p class="text-[#4A4159] leading-relaxed mb-3">
              Since both my BSc and MSc are in Psychology, I am deeply involved in activities revolving around human development. Teaching requires constant recalibration; adjusting delivery based on a child's unique profile directly influences how I approach talent development and behavioral assessment in the corporate world.
          </p>
          <ul class="list-disc pl-4 space-y-2 text-[#4A4159]">
              <li><strong>ABA Therapist:</strong> Applying applied behavior analysis principles to support developmental growth.</li>
              <li><strong>Buddy Bear:</strong> Providing Psychological First Aid (PFA) to children in distress.</li>
              <li><strong>Buku Jalanan Chowkit:</strong> Facilitating education and mentorship for underserved youth.</li>
              <li><strong>Kelas Rimba:</strong> Engaging in nature-based learning and forest schooling.</li>
          </ul>
      `
  },
  {
      id: 'volunteering',
      date: 'Ongoing Initiative',
      title: 'Grassroots Community Server',
      organization: 'Grassroots Community NGOs',
      category: 'Volunteer',
      typeClass: 'tag-volunteer',
      shortDesc: 'Grounding empathy and understanding systemic human challenges at the grassroots level.',
      image: 'https://images.unsplash.com/photo-1593113565637-51852b666fba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fullContent: `
          <p class="text-[#4A4159] leading-relaxed mb-3">
              In high-paced corporate environments, it is easy to view people merely as data points. Immersing myself in grassroots initiatives keeps my empathy grounded. It reminds me that behind every organizational dynamic are real people with complex needs, training me to design HR solutions that resonate with the human element.
          </p>
          <ul class="list-disc pl-4 space-y-2 text-[#4A4159]">
              <li><strong>Dapur Jalanan Chowkit:</strong> Regular community feeding and social support.</li>
              <li><strong>Buku Jalanan Chowkit:</strong> Supporting continuous community education.</li>
              <li><strong>KVN Beach Clean-Up:</strong> Environmental conservation advocacy.</li>
              <li><strong>Hutan Negara (Negros):</strong> Forest conservation and ecological volunteering.</li>
          </ul>
      `
  },
  {
      id: 'lancaster',
      date: 'Oct 2022 - Sept 2023',
      title: 'M.Sc Developmental Psychology',
      organization: 'Lancaster University',
      category: 'Education',
      typeClass: 'tag-education',
      shortDesc: 'Deep diving into the cognitive mechanisms of human development.',
      image: null,
      fullContent: `
          <p class="mb-2"><strong>Awards:</strong> Received fully funded scholarship from Malaysia Graduate Record Excellence Program (GRE-2022).</p>
          <p><strong>Core Focus:</strong> Beyond just data analytics, this degree allowed me to deeply understand *why* people behave the way they do, bridging the gap between statistical outputs and actual human emotions.</p>
      `
  },
  {
      id: 'outdoors',
      date: 'Whenever Possible',
      title: 'Visual Storytelling & The Outdoors',
      organization: 'Personal Pursuits',
      category: 'Creative',
      typeClass: 'tag-experience',
      shortDesc: 'Finding the unseen narrative through observation, patience, and a different lens.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fullContent: `
          <p class="text-[#4A4159] leading-relaxed">
              Photography is essentially the art of observation—knowing where to look, waiting for the right moment, and capturing a story others might walk past. I apply this exact same lens to people analytics. Whether I am framing a landscape during a hike or analyzing a decade of employee data, the goal is the same: to cut through the noise, identify underlying patterns, and bring the true narrative into focus.
          </p>
      `
  }
];

export default function HumanSidePage() {
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const swirlBaseRef = useRef<SVGPathElement>(null);
  const swirlAnimRef = useRef<SVGPathElement>(null);
  
  // Create refs for each timeline item to calculate positions
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Setup GSAP
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-anim", { y: -20, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 })
        .from(".hero-text", { y: 30, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=0.6");

      gsap.utils.toArray('.gs-reveal').forEach((elem: any) => {
        ScrollTrigger.create({
          trigger: elem,
          start: "top 85%",
          onEnter: () => gsap.fromTo(elem, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }),
          once: true
        });
      });

      ScrollTrigger.create({
        trigger: "#journey",
        start: "top 75%",
        onEnter: () => {
          (window as any).swirlHasAnimated = true;
          if (swirlAnimRef.current) {
            gsap.to(swirlAnimRef.current, { strokeDashoffset: 0, duration: 3.5, ease: "power2.inOut" });
          }
        },
        once: true
      });

      gsap.to("#landscape-bg", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "#journey",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Compute SVG Swirl Path
  const drawSwirl = () => {
    if (!svgRef.current || !swirlBaseRef.current || !swirlAnimRef.current) return;
    const container = document.getElementById('timeline-content');
    if (!container) return;

    // Filter to only visible items in DOM
    const visibleItems = journeyData.filter(item => {
       const isVisible = filter === 'All' || item.category === filter || (filter === 'Volunteer' && item.category === 'Mentorship');
       return isVisible;
    });

    let pathD = "";

    visibleItems.forEach((item, index) => {
      const domEl = itemRefs.current[item.id];
      if (!domEl) return;
      const dot = domEl.querySelector('.dot-element') as HTMLElement;
      if (!dot) return;

      const x = domEl.offsetLeft + dot.offsetLeft + (dot.offsetWidth / 2);
      const y = domEl.offsetTop + dot.offsetTop + (dot.offsetHeight / 2);

      if (index === 0) {
        pathD += `M ${Math.max(0, x - 100)} ${y} L ${x} ${y} `;
      } else {
        const prevItem = visibleItems[index - 1];
        const prevDomEl = itemRefs.current[prevItem.id];
        if (prevDomEl) {
          const prevDot = prevDomEl.querySelector('.dot-element') as HTMLElement;
          if (prevDot) {
            const prevX = prevDomEl.offsetLeft + prevDot.offsetLeft + (prevDot.offsetWidth / 2);
            const prevY = prevDomEl.offsetTop + prevDot.offsetTop + (prevDot.offsetHeight / 2);

            const controlX1 = prevX + (x - prevX) / 2;
            const controlX2 = prevX + (x - prevX) / 2;

            pathD += `C ${controlX1} ${prevY}, ${controlX2} ${y}, ${x} ${y} `;
          }
        }
      }

      if (index === visibleItems.length - 1) {
        pathD += `L ${x + 200} ${y}`;
      }
    });

    if (visibleItems.length === 0) pathD = "M 0 0";

    svgRef.current.style.width = container.scrollWidth + 200 + 'px';
    svgRef.current.style.height = Math.max(container.scrollHeight, 500) + 'px';

    swirlBaseRef.current.setAttribute('d', pathD);
    swirlAnimRef.current.setAttribute('d', pathD);

    const length = swirlAnimRef.current.getTotalLength();
    swirlAnimRef.current.style.strokeDasharray = `${length}`;

    if ((window as any).swirlHasAnimated) {
      swirlAnimRef.current.style.strokeDashoffset = '0';
    } else {
      swirlAnimRef.current.style.strokeDashoffset = `${length}`;
    }
  };

  // Re-draw on resize or state change
  useEffect(() => {
    window.addEventListener('resize', drawSwirl);
    setTimeout(drawSwirl, 100);
    return () => window.removeEventListener('resize', drawSwirl);
  }, []);

  useEffect(() => {
    setTimeout(drawSwirl, 100);
    if (expandedId !== null) {
      setTimeout(drawSwirl, 550); // wait for accordion animation
    }
  }, [filter, expandedId]);

  // Drag to scroll
  useEffect(() => {
    const slider = document.getElementById('horizontal-scroll');
    if (!slider) return;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.timeline-item-hz')) return;
      isDown = true;
      slider.classList.add('cursor-grabbing');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; slider.classList.remove('cursor-grabbing'); };
    const onMouseUp = () => { isDown = false; slider.classList.remove('cursor-grabbing'); };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - ((x - startX) * 1.5);
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleFilter = (category: string) => {
    setExpandedId(null);
    setFilter(category);
    const slider = document.getElementById('horizontal-scroll');
    if (slider) slider.scrollTo({ left: 0, behavior: 'smooth' });
    const journeyEl = document.getElementById('journey');
    if (journeyEl) journeyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Calculate visible items to apply stagger
  let visibleCount = 0;

  return (
    <div ref={containerRef} className="antialiased overflow-x-hidden" style={{ fontFamily: "'Nunito', sans-serif", backgroundColor: "var(--color-cream)", color: "var(--color-dark)", scrollBehavior: "smooth" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap');
        
        :root {
            --color-purple: #3B3155;
            --color-orange: #D95C14;
            --color-yellow: #F2A65A;
            --color-cream: #FDFBF7;
            --color-dark: #2A2438;
        }

        .serif-font { font-family: 'Lora', serif; }

        .hero-section {
            background-image: linear-gradient(rgba(59, 49, 85, 0.4), rgba(217, 92, 20, 0.6)), url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=2070&q=80');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }

        .brand-box {
            background-color: var(--color-cream);
            color: var(--color-purple);
            padding: 10px 16px;
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: 0.02em;
            border-radius: 8px;
            box-shadow: 0 4px 14px rgba(59, 49, 85, 0.15);
        }

        .category-tag {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 12px;
        }
        .tag-experience { background-color: #EFE9F4; color: #5B487A; } 
        .tag-education { background-color: #FDF0E6; color: #B3480B; }  
        .tag-volunteer { background-color: #F9F2D4; color: #8C6214; }  

        .hz-scroll-container {
            scrollbar-width: thin;
            scrollbar-color: var(--color-orange) #EAE3D9;
        }
        .hz-scroll-container::-webkit-scrollbar { height: 8px; }
        .hz-scroll-container::-webkit-scrollbar-track { background: #EAE3D9; border-radius: 4px; }
        .hz-scroll-container::-webkit-scrollbar-thumb { background: var(--color-orange); border-radius: 4px; }
        .cursor-grabbing { cursor: grabbing !important; }
        
        .warm-shadow {
            box-shadow: 0 10px 30px rgba(217, 92, 20, 0.08);
        }

        @keyframes drift {
            0% { transform: translateY(-5%) rotate(0deg) translateX(0); opacity: 0; }
            10% { opacity: 0.8; }
            50% { transform: translateY(50vh) rotate(180deg) translateX(20px); }
            90% { opacity: 0.8; }
            100% { transform: translateY(100vh) rotate(360deg) translateX(-20px); opacity: 0; }
        }
        .leaf {
            position: absolute;
            top: -20px;
            z-index: 0;
            animation: drift linear infinite;
            color: var(--color-orange);
            opacity: 0.5;
        }
        .leaf:nth-child(1) { left: 10%; animation-duration: 12s; animation-delay: 0s; font-size: 24px; color: var(--color-yellow); }
        .leaf:nth-child(2) { left: 85%; animation-duration: 15s; animation-delay: 2s; font-size: 32px; }
        .leaf:nth-child(3) { left: 50%; animation-duration: 18s; animation-delay: 5s; font-size: 20px; color: var(--color-purple); opacity: 0.2; }
      `}} />

      {/* Hero Section */}
      <header className="hero-section h-screen w-full relative flex flex-col items-center justify-center text-white">
        {/* Navigation */}
        <nav className="absolute top-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
          <div className="brand-box text-sm hero-anim serif-font">
            Huzaifah<br/>Adam
          </div>
          
          <div className="hero-anim flex items-center gap-3 bg-[#3B3155]/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
            <span className="text-[#FDFBF7] text-xs md:text-sm font-semibold tracking-wide">The Human Side</span>
            <a href="http://nomad-ai.my/" title="Switch back to Data Analytics Portfolio" className="group flex items-center cursor-pointer">
                <div className="w-11 h-6 bg-[#D95C14] rounded-full relative shadow-inner border border-black/10 transition-colors duration-300 group-hover:bg-[#F2A65A]">
                    <div className="absolute right-1 top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 group-hover:scale-90"></div>
                </div>
            </a>
          </div>
        </nav>

        {/* Center Content */}
        <div className="text-center z-10 w-full px-4 mt-[-5vh]">
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight mb-6 drop-shadow-lg hero-text serif-font text-[#FDFBF7]">
            Beyond the Data
          </h1>
          <p className="text-lg md:text-2xl font-light mb-10 drop-shadow-md hero-text opacity-95 max-w-3xl mx-auto text-[#FDF0E6]">
            Bridging psychological theory with community impact, personal growth, and the human element.
          </p>
          <a href="#about" className="bg-[#FDFBF7] text-[#3B3155] flex justify-between items-center px-5 py-3 w-full max-w-[320px] mx-auto cursor-pointer hover:bg-[#D95C14] hover:text-white transition-all duration-300 hero-text shadow-xl rounded-full group font-semibold">
            <span>Explore My Story</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3B3155] group-hover:bg-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white group-hover:text-[#D95C14]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </a>
        </div>
      </header>

      {/* Narrative Section */}
      <section id="about" className="py-24 px-6 md:px-20 max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
            <div className="leaf">🍂</div>
            <div className="leaf">🍁</div>
            <div className="leaf">🍂</div>
        </div>

        <div className="relative z-10 gs-reveal mb-16">
            <h2 className="text-4xl mb-6 border-b-2 border-[#F2A65A]/30 pb-3 text-[#3B3155] serif-font max-w-max">Why This Page Exists</h2>
            <div className="text-[#4A4159] leading-relaxed text-lg space-y-5 max-w-4xl">
                <p>
                    Is a traditional resume enough to showcase who I am? In the age of AI, I realized it's time to shift gears. During recent interviews, I noticed a distinct change: the focus has moved from purely technical assessments to the human element. Instead of just testing coding skills or statistical capabilities, recruiters are asking, <em>"What do you do in your spare time? What drives you?"</em>
                </p>
                <p>
                    As AI seamlessly handles the heavy technical lifting, our unique human experiences become our true differentiators. The underlying message from modern organizations is clear: <strong>"We know you have the technical capabilities; now, tell us what makes you uniquely human."</strong>
                </p>
                <p>
                    This realization inspired me to build this space. Here, I document not just my corporate milestones, but the community work, teaching, and outdoor adventures that shape my worldview outside the office. Welcome to the other side of my portfolio.
                </p>
            </div>
        </div>

        <div className="relative z-10 gs-reveal">
            <div className="mb-6 border-b border-[#EAE3D9] pb-2 max-w-max">
                <h2 className="text-2xl text-[#3B3155] serif-font">Filter My Journey</h2>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4" id="filter-buttons">
                {['All', 'Experience', 'Volunteer', 'Education', 'Creative'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleFilter(cat)} 
                    className={`filter-btn px-4 py-2 text-sm rounded-full transition-all duration-300 ${filter === cat ? 'bg-white text-[#D95C14] border border-[#EAE3D9] shadow-sm font-semibold' : 'bg-transparent text-[#5B487A] border border-transparent hover:text-[#D95C14] font-medium'}`}
                  >
                    {cat === 'All' ? 'All Experiences' : cat === 'Experience' ? 'Corporate Experience' : cat === 'Volunteer' ? 'Volunteering & Mentorship' : cat === 'Creative' ? 'Outdoors & Creative' : cat}
                  </button>
                ))}
            </div>
            
            <svg className="absolute right-0 bottom-0 w-48 opacity-10 pointer-events-none" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 140 L100 80 M100 80 L70 120 M100 80 L130 110 M100 60 L80 90 M100 60 L120 85 M100 40 L90 60 M100 40 L110 55" stroke="#3B3155" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <circle cx="100" cy="50" r="40" fill="#D95C14" opacity="0.3"/>
                <circle cx="80" cy="80" r="30" fill="#F2A65A" opacity="0.4"/>
                <circle cx="120" cy="70" r="35" fill="#3B3155" opacity="0.2"/>
            </svg>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-24 px-4 md:px-10 bg-[#F4EFE6] overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none opacity-30" id="landscape-bg">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full text-[#F2A65A]">
                <path fill="currentColor" opacity="0.2" d="M0,300 C300,100 600,400 1000,200 C1200,100 1440,250 1440,250 L1440,400 L0,400 Z"></path>
                <path fill="var(--color-orange)" opacity="0.15" d="M0,400 C200,250 500,250 800,350 C1100,450 1300,200 1440,280 L1440,400 L0,400 Z"></path>
                <polygon points="150,300 130,350 170,350" fill="var(--color-purple)" opacity="0.4"/>
                <polygon points="150,270 135,320 165,320" fill="var(--color-purple)" opacity="0.4"/>
                <polygon points="850,250 820,320 880,320" fill="var(--color-orange)" opacity="0.3"/>
                <polygon points="850,210 830,280 870,280" fill="var(--color-orange)" opacity="0.3"/>
                <polygon points="1250,220 1230,280 1270,280" fill="currentColor" opacity="0.5"/>
            </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 gs-reveal">
                <h2 className="text-4xl md:text-5xl text-[#3B3155] mb-4 serif-font">My Journey</h2>
                <p className="text-[#5B487A] max-w-2xl mx-auto text-sm md:text-base font-medium">
                    An interactive timeline of my professional experience, personal aspirations, and community impact. <br/>
                    <span className="text-[#D95C14]">Scroll horizontally and click on any item to read the full story.</span>
                </p>
            </div>

            <div className="hz-scroll-container w-full overflow-x-auto overflow-y-hidden pb-12 cursor-grab" id="horizontal-scroll">
                <div id="timeline-content" className="relative z-10 flex flex-row gap-8 px-10 pt-[20px] min-w-max items-start h-auto min-h-[500px]">
                    
                    <svg id="horizontal-swirl" ref={svgRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                        <path id="swirl-base" ref={swirlBaseRef} fill="none" stroke="#EAE3D9" strokeWidth="3"></path>
                        <path id="swirl-anim" ref={swirlAnimRef} fill="none" stroke="#D95C14" strokeWidth="4"></path>
                    </svg>

                    {journeyData.map((item) => {
                      const isVisible = filter === 'All' || item.category === filter || (filter === 'Volunteer' && item.category === 'Mentorship');
                      
                      let staggerClass = "";
                      if (isVisible) {
                        staggerClass = visibleCount % 2 === 0 ? "mt-[20px]" : "mt-[100px]";
                        visibleCount++;
                      }

                      return (
                        <div 
                          key={item.id}
                          ref={el => { itemRefs.current[item.id] = el }}
                          className={`timeline-item-hz relative flex flex-col items-center w-[260px] md:w-[300px] shrink-0 group ${staggerClass}`}
                          style={{ display: isVisible ? 'flex' : 'none' }}
                        >
                            <div className="dot-element w-5 h-5 bg-[#F4EFE6] border-[3px] border-[#D95C14] rounded-full z-20 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#D95C14] relative"></div>
                            
                            <div className="w-full bg-white relative z-10 mt-5 rounded-2xl p-4 md:p-5 border border-[#EAE3D9] warm-shadow transition-all cursor-pointer hover:-translate-y-1" onClick={() => toggleAccordion(item.id)}>
                                
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-[#EAE3D9] z-10 group-hover:bg-[#D95C14] transition-colors duration-300"></div>

                                <div className="flex justify-between items-center gap-2">
                                    <h3 className="text-base md:text-lg font-bold text-[#3B3155] leading-tight serif-font">{item.organization}</h3>
                                    <div className="flex-shrink-0 text-[#D95C14] bg-[#FDFBF7] p-1.5 rounded-full border border-[#EAE3D9] transition-transform duration-300" style={{ transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: expandedId === item.id ? '1000px' : '0px', opacity: expandedId === item.id ? 1 : 0, marginTop: expandedId === item.id ? '1rem' : '0px' }}>
                                    <div className="pt-4 border-t border-[#EAE3D9] flex flex-col gap-3">
                                        <div>
                                            <h4 className="text-sm md:text-base font-bold text-[#2A2438]">{item.title}</h4>
                                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                                <span className="text-[#D95C14] font-bold tracking-wide text-[0.65rem] md:text-xs uppercase">{item.date}</span>
                                                <span className={`category-tag ${item.typeClass} !text-[0.55rem] px-1.5 py-0.5`}>{item.category}</span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-[#5B487A] text-[0.75rem] md:text-sm font-medium italic border-l-2 border-[#F2A65A] pl-2">{item.shortDesc}</p>

                                        {item.image && <img src={item.image} alt={item.title} className="w-full h-32 md:h-40 object-cover rounded-lg mt-2" />}
                                        
                                        <div className="prose prose-sm text-[#4A4159] max-w-none text-[0.75rem] md:text-sm leading-relaxed mt-2" dangerouslySetInnerHTML={{ __html: item.fullContent }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      );
                    })}

                </div>
            </div>
        </div>
      </section>

      {/* Mountain Divider */}
      <div className="w-full bg-[#F4EFE6] relative -mb-1 z-20">
        <svg viewBox="0 0 1440 250" preserveAspectRatio="none" className="w-full h-32 md:h-56 block">
            <path fill="var(--color-purple)" opacity="0.4" d="M0,250 L0,150 L200,50 L450,180 L700,20 L950,160 L1200,60 L1440,190 L1440,250 Z"></path>
            <path fill="var(--color-purple)" opacity="0.7" d="M0,250 L0,200 L150,120 L350,220 L600,80 L850,210 L1100,100 L1440,220 L1440,250 Z"></path>
            <path fill="var(--color-purple)" d="M0,250 L0,220 L250,160 L500,240 L750,120 L1000,230 L1300,150 L1440,240 L1440,250 Z"></path>
        </svg>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-[#3B3155] text-[#FDFBF7] pt-12 pb-20 text-center relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-4xl mb-4 serif-font">Let's Connect</h2>
            <p className="text-[#F2A65A] mb-10 max-w-md mx-auto font-semibold">Connecting Data, Psychology, and People.</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                <a href="mailto:huzaifah.adam.98@gmail.com" className="flex items-center gap-3 bg-white/5 hover:bg-[#D95C14] border border-white/10 px-8 py-4 rounded-full transition-all backdrop-blur-sm font-medium">
                    <span className="text-xl">✉️</span> huzaifah.adam.98@gmail.com
                </a>
                <span className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full backdrop-blur-sm font-medium">
                    <span className="text-xl">📞</span> +60(11) 35169351
                </span>
            </div>
            
            <p className="text-sm text-white/40">© 2026 Huzaifah Adam. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
