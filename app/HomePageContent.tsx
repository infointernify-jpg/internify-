"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search, MapPin, ChevronRight, TrendingUp, Shield, Clock,
  BarChart3, Landmark, Building2, Heart, Linkedin, Instagram,
  Twitter, Mail, ArrowRight, BookOpen, DollarSign, PieChart,
  Activity, CheckCircle, ChevronDown, Rocket,
} from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import HomeTrendingInternships from "@/components/TrendingInternships";

// FAQ Data
const faqs = [
  { q: "What types of finance internships are on Internify?", a: "Investment Banking, Equity Research, Financial Analysis, FinTech, CA Articleship, Portfolio Management, Risk & Compliance, and Corporate Finance — all manually verified." },
  { q: "Is Internify free for students?", a: "100% free. No premium tiers, no pay-to-apply, no hidden fees. Companies pay to post — students never pay." },
  { q: "How are internships verified?", a: "Every listing is manually reviewed — company confirmed, role checked, links tested. No ghost jobs." },
  { q: "Can I find remote finance internships?", a: "Yes. Use the 'Remote' filter to find work-from-home roles in equity research, financial modeling, and FinTech." },
];

// FAQ Component
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">FAQ</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`rounded-xl border overflow-hidden transition-all duration-200
            ${open === idx ? "border-[#0A2540]/20 bg-[#f8faff]" : "border-slate-200 bg-white"}`}>
            <button onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left gap-4">
              <span className="font-semibold text-[#0A2540] text-sm sm:text-base">{faq.q}</span>
              <ChevronDown size={16} className={`text-[#0A2540]/40 transition-transform duration-200 ${open === idx ? "rotate-180" : ""}`} />
            </button>
            {open === idx && (
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Finance Categories Component
const FinanceCategories = () => {
  const categories = [
    { title: "Investment Banking", subtitle: "M&A, IPOs, deal execution", icon: <Building2 size={18} />, tag: "Most Competitive", seoUrl: "/investment-banking-internships" },
    { title: "Equity Research", subtitle: "Fundamental analysis, sector reports", icon: <BarChart3 size={18} />, tag: "High Demand", seoUrl: "/equity-research-internships" },
    { title: "FinTech", subtitle: "Payments, lending, trading platforms", icon: <Activity size={18} />, tag: "Fastest Growing", seoUrl: "/fintech-internships" },
    { title: "Financial Analyst", subtitle: "FP&A, budgeting, forecasting", icon: <PieChart size={18} />, tag: "Entry Friendly", seoUrl: "/financial-analyst-internships" },
    { title: "CA Articleship", subtitle: "Audit, taxation, compliance", icon: <BookOpen size={18} />, tag: "ICAI Approved", seoUrl: "/ca-articleship-internships" },
    { title: "Risk & Compliance", subtitle: "Credit risk, market risk", icon: <Shield size={18} />, tag: "Banking Sector", seoUrl: "/risk-compliance-internships" },
    { title: "Corporate Finance", subtitle: "Treasury, capital structure", icon: <Landmark size={18} />, tag: "Corporates", seoUrl: "/corporate-finance-internships" },
    { title: "Portfolio Management", subtitle: "Asset allocation, fund management", icon: <TrendingUp size={18} />, tag: "PMS & AMC", seoUrl: "/portfolio-management-internships" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">Finance Verticals</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">Explore Finance Internship Roles</h2>
        <p className="text-slate-500 text-sm mt-1.5">Curated for students starting their finance careers</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <Link key={idx} href={cat.seoUrl} className="group block h-full">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#0A2540]/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A2540] bg-[#0A2540]/5 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {cat.tag}
                </span>
                <div className="p-2 rounded-xl bg-[#0A2540]/5 flex-shrink-0">
                  <span className="text-[#0A2540]">{cat.icon}</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mb-1">{cat.title}</h3>
              <p className="text-sm text-slate-500 flex-grow">{cat.subtitle}</p>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#0A2540]">
                Explore roles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Link href="/domains" className="inline-flex items-center gap-2 text-sm font-medium text-[#0A2540] hover:text-[#FFD700] transition-colors">
          View All Finance Roles <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

// Location Section Component
const LocationSection = () => {
  const cities = ["Mumbai", "Bangalore", "Delhi NCR", "Remote", "Pune", "Hyderabad", "Chennai", "Kolkata"];
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">By Location</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Finance Hubs Across India</h2>
        <p className="text-slate-500 text-sm mt-1">Find internships in major financial centres — or work remotely</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cities.map((city) => (
          <Link key={city} href={`/internships/location/${city.toLowerCase()}`}
            className="flex items-center justify-between gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:border-[#0A2540]/40 hover:text-[#0A2540] transition-all group">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-[#10B981] group-hover:scale-110 transition-transform" />
              {city}
            </div>
            <ArrowRight size={13} className="text-[#0A2540]/40 group-hover:translate-x-1 transition-transform group-hover:text-[#FFD700]" />
          </Link>
        ))}
      </div>
    </section>
  );
};

// Testimonial Component
const Testimonial = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-gradient-to-r from-[#0A2540]/5 to-[#0A2540]/10 rounded-2xl p-6 text-center border border-[#0A2540]/10">
      <p className="text-[#0A2540] text-sm italic">"Found my first equity research internship here. The process was smooth and completely free!"</p>
      <p className="text-[#0A2540] font-bold text-xs mt-2">— Riya M., 2nd Year B.Com Student, Delhi University</p>
    </div>
  </div>
);

// Main Page Content Component
export default function HomePageContent() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
    
    const jobSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": []
    };
    
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(jobSchema);
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    router.push(`/internships?${params.toString()}`);
  };

  const quickTags = [
    { name: "Investment Banking", seoUrl: "/investment-banking-internships", icon: <TrendingUp size={14} className="mr-1" /> },
    { name: "Equity Research", seoUrl: "/equity-research-internships", icon: <BarChart3 size={14} className="mr-1" /> },
    { name: "Financial Analyst", seoUrl: "/financial-analyst-internships", icon: <PieChart size={14} className="mr-1" /> },
    { name: "FinTech", seoUrl: "/fintech-internships", icon: <Activity size={14} className="mr-1" /> },
    { name: "CA Articleship", seoUrl: "/ca-articleship-internships", icon: <BookOpen size={14} className="mr-1" /> },
  ];

  if (!isMounted) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A2540] border-t-[#FFD700] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0A2540] font-medium">Loading finance internships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] pt-12 pb-4">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#0A2540] text-xs font-bold px-4 py-2 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
              🇮🇳 India's fastest-growing finance internship platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0A2540] mb-4 leading-tight">
              Finance Internships in India (2026) | Investment Banking, FinTech & Analyst Roles
            </h1>

            <p className="text-slate-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
              Verified finance internships from real companies actively hiring
            </p>

            <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row p-2 shadow-lg">
              <div className="flex flex-1 items-center px-5 py-3 gap-2">
                <Search className="w-5 h-5 text-[#0A2540]/40" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search finance roles (Investment Banking, Equity Research, etc.)"
                  className="w-full outline-none text-sm bg-transparent py-1" />
              </div>
              <div className="flex flex-1 items-center px-5 py-3 gap-2 border-t sm:border-t-0 sm:border-l border-slate-100">
                <MapPin className="w-5 h-5 text-[#0A2540]/40" />
                <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Choose location (Mumbai, Remote, etc.)"
                  className="w-full outline-none text-sm bg-transparent py-1" />
              </div>
              <button type="submit" className="bg-[#0A2540] hover:bg-[#0d2e52] text-white px-8 py-3 rounded-xl font-bold text-sm transition-all">
                Find Internships →
              </button>
            </form>

            <p className="text-sm text-slate-400 mt-6">
              ✨ Apply instantly — no signup required. 100% free for students.
            </p>
          </div>
        </section>

        {/* POPULAR SEARCHES - FIXED WITH CONTAINER WRAP */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <span className="text-slate-500 text-sm font-medium">Popular searches:</span>
            <div className="flex flex-wrap justify-center gap-2">
              {quickTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={tag.seoUrl}
                  className="inline-flex items-center text-sm bg-white border border-slate-200 px-4 py-2 rounded-full text-slate-700 hover:border-[#0A2540]/40 hover:text-[#0A2540] hover:shadow-sm transition-all"
                >
                  {tag.icon}
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* TRUST BAR - COMPACT */}
        <div className="py-2">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5 bg-[#10B981]/10 text-[#0A2540] px-3 py-1 rounded-full">
                <CheckCircle size={14} className="text-[#10B981]" />
                Verified Internships
              </div>
              <div className="flex items-center gap-1.5 text-[#0A2540] px-3 py-1">
                <Clock size={14} className="text-[#10B981]" />
                Updated Daily
              </div>
              <div className="flex items-center gap-1.5 bg-[#FFD700]/20 text-[#0A2540] px-3 py-1 rounded-full">
                <DollarSign size={14} className="text-[#10B981]" />
                Free for Students
              </div>
            </div>
          </div>
        </div>

        {/* INTERNSHIPS SECTION */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Latest Finance Internships</h2>
            <p className="text-slate-500 text-sm mt-1">Verified roles from companies actively hiring now</p>
          </div>
        </div>
        
        {/* AVAILABILITY BADGE */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex flex-col items-center gap-1">
            <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-4 py-2 rounded-full">
              🔥 New roles added daily
            </span>
          </div>
        </div>

        <HomeTrendingInternships />

        {/* CTA LINE */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0A2540]/5 to-[#10B981]/5 px-6 py-3 rounded-full">
              <Rocket size={16} className="text-[#10B981]" />
              <p className="text-[#0A2540] text-sm font-medium">
                Start applying to verified finance internships today — <span className="text-[#10B981]">no signup required</span>
              </p>
            </div>
          </div>
        </div>

        {/* DOMAINS SECTION - AFTER INTERNSHIPS */}
        <FinanceCategories />

        {/* SEO PARAGRAPH */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-[#0A2540] mb-2">Top Finance Internships for Students in India (2026)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Looking for the best finance internships in India? Internify brings you verified opportunities in 
              <strong> Investment Banking, Equity Research, FinTech, Financial Analysis, and CA Articleship</strong>. 
              Unlike generic job portals, every listing is manually verified — no ghost jobs, no spam. 
              Updated daily with active openings across Mumbai, Bangalore, Delhi, and remote. 
              Start your finance career today with internships that actually hire students.
            </p>
          </div>
        </section>

        <Testimonial />

        {/* Why Students Trust Us */}
        <section className="bg-white border-y border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">Why Students Trust Us</span>
              <h2 className="text-3xl font-bold text-[#0A2540] mt-1">Built for Finance Students. <span className="text-[#10B981]">Not Everyone.</span></h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">Unlike generic job portals, every role here is curated only for finance careers in India.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Zero Ghost Jobs", desc: "Every finance internship is manually reviewed — company verified, role confirmed, links tested.", stat: "Manually Verified Roles" },
                { title: "Weekly Career Blogs", desc: "New blog guides every week to help you land finance internships faster.", stat: "Resume tips & Interview prep" },
                { title: "Always Free for Students", desc: "No premium tiers, no pay-to-apply — ever. Companies pay to post. Students apply free.", stat: "₹0 for students" },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#F8FAFC] rounded-xl p-6 border border-slate-200 hover:shadow-md transition-all">
                  <h3 className="font-bold text-[#0A2540] mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm mb-3">{item.desc}</p>
                  <div className="text-[#10B981] font-black text-lg">{item.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION SECTION */}
        <LocationSection />

        {/* FINAL CTA - SIMPLIFIED */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0A2540] rounded-2xl p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Ready to Start Your Finance Career?</h2>
            <p className="text-white text-sm mb-6">✨ Start applying to verified finance internships today — no signup required</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/internships" className="bg-[#FFD700] text-[#0A2540] font-bold px-8 py-3 rounded-xl hover:bg-[#e6c200] transition-all">
                Browse Internships →
              </Link>
              <Link href="/auth/register" className="bg-white/20 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/30 transition-all">
                Create account (optional)
              </Link>
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-10 pb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="col-span-2 lg:col-span-4 space-y-3">
              <Link href="/" className="flex items-center" aria-label="Internify Home">
                <Image 
                  src="/Internify.png" 
                  alt="Internify Logo - Finance Internship Platform for Students"
                  width={180} 
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs">Internify helps finance students discover verified internships across investment banking, equity research, fintech, and corporate finance — making the internship search simple, transparent, and completely free.</p>
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Follow us on</p>
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/join-internify/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow Internify on LinkedIn" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#0077B5] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a 
                    href="https://www.instagram.com/internify.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow Internify on Instagram" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#E4405F] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Instagram size={16} />
                  </a>
                  <a 
                    href="https://x.com/internify83656" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow Internify on Twitter" 
                    className="w-9 h-9 bg-slate-100 text-slate-600 hover:bg-[#1DA1F2] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">For Students</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="/internships" className="hover:text-[#0A2540] transition-colors">All Internships</Link></li>
                <li><Link href="/internships/location/remote" className="hover:text-[#0A2540] transition-colors">Remote Internships</Link></li>
                <li><Link href="/internships?paid=true" className="hover:text-[#0A2540] transition-colors">Paid Internships</Link></li>
                <li><Link href="/resources" className="hover:text-[#0A2540] transition-colors">Career Resources</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><Link href="/about" className="hover:text-[#0A2540] transition-colors">About Us</Link></li>
                <li><Link href="/mission" className="hover:text-[#0A2540] transition-colors">Our Mission</Link></li>
                <li><Link href="/contact" className="hover:text-[#0A2540] transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-[#0A2540] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#0A2540] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-4">
              <h4 className="text-slate-900 font-bold text-sm mb-4">Get in Touch</h4>
              <a href="mailto:internifyhelp@gmail.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0A2540] transition-colors">
                <Mail size={13} /> internifyhelp@gmail.com
              </a>
              <p className="text-xs text-slate-400 mt-3">Response within 24 hours</p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-5 pb-6">
            <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-500 text-center">
              <span>© {new Date().getFullYear()} Internify Pvt. Ltd. · All rights reserved.</span>
              <div className="flex items-center gap-1.5">
                <span>Made with</span>
                <Heart size={10} className="text-red-500 fill-red-500" />
                <span>in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}