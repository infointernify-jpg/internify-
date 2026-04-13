"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Search, MapPin, ChevronRight, TrendingUp, Shield, Clock,
  BarChart3, Landmark, Building2, Heart, Linkedin, Instagram,
  Twitter, Mail, ArrowRight, BookOpen, DollarSign, PieChart,
  Activity, CheckCircle, ChevronDown,
} from "lucide-react";
import Link from "next/link";

// ── Dynamic components with ssr:false ───────────────────
const HomeTrendingInternships = dynamic(
  () => import("@/components/TrendingInternships"), { ssr: false }
);
const ProfileDropdown = dynamic(
  () => import("@/components/ProfileDropdown"), { ssr: false }
);
const HowItWorks = dynamic(
  () => import("@/components/HowItWorks"), { ssr: false }
);
const StatsSection = dynamic(
  () => import("@/components/StatsSection"), { ssr: false }
);

// ── Types ───────────────────────────────────────────────────
interface City { city: string; seoUrl: string; }

const FALLBACK_CITIES: City[] = [
  { city: "Bangalore", seoUrl: "/internships/location/bangalore" },
  { city: "Mumbai", seoUrl: "/internships/location/mumbai" },
  { city: "Remote", seoUrl: "/internships/location/remote" },
  { city: "Delhi NCR", seoUrl: "/internships/location/delhi-ncr" },
  { city: "Pune", seoUrl: "/internships/location/pune" },
  { city: "Hyderabad", seoUrl: "/internships/location/hyderabad" },
  { city: "Chennai", seoUrl: "/internships/location/chennai" },
  { city: "Bhubaneswar", seoUrl: "/internships/location/bhubaneswar" },
  { city: "Kolkata", seoUrl: "/internships/location/kolkata" },
  { city: "Jaipur", seoUrl: "/internships/location/jaipur" },
  { city: "Lucknow", seoUrl: "/internships/location/lucknow" },
  { city: "Ahmedabad", seoUrl: "/internships/location/ahmedabad" },
];

// ── Finance Category Card ───────────────────────────────────
const FinanceCategoryCard = ({
  title, subtitle, icon, tag, seoUrl, featured = false,
}: {
  title: string; subtitle: string; icon: React.ReactNode;
  tag: string; seoUrl: string; featured?: boolean;
}) => (
  <Link href={seoUrl} className={`group block ${featured ? "sm:col-span-2" : ""}`}>
    <div className={`relative h-full rounded-2xl p-6 border transition-all duration-300 overflow-hidden
      ${featured
        ? "bg-[#0A2540] border-[#0A2540] hover:bg-[#0d2e52]"
        : "bg-white border-slate-200 hover:border-[#0A2540]/30 hover:shadow-xl"
      }`}>
      <div className="relative flex flex-col h-full gap-3">
        <div className="flex items-start justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full
            ${featured ? "bg-white/10 text-[#FFD700]" : "bg-[#0A2540]/5 text-[#0A2540]"}`}>
            {tag}
          </span>
          <div className={`p-2 rounded-xl group-hover:scale-110 transition-transform
            ${featured ? "bg-white/10" : "bg-[#0A2540]/5"}`}>
            <span className={featured ? "text-[#FFD700]" : "text-[#0A2540]"}>{icon}</span>
          </div>
        </div>
        <div>
          <h3 className={`text-base font-bold mb-1 ${featured ? "text-white" : "text-[#0A2540]"}`}>{title}</h3>
          <p className={`text-sm leading-relaxed ${featured ? "text-blue-200" : "text-slate-500"}`}>{subtitle}</p>
        </div>
        <div className={`flex items-center gap-1 mt-auto text-xs font-semibold
          ${featured ? "text-[#FFD700]" : "text-[#0A2540]"}`}>
          Explore roles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </Link>
);

// ── City Chip ───────────────────────────────────────────────
const CityChip = ({ city, seoUrl }: { city: string; seoUrl: string }) => (
  <Link href={seoUrl}
    className="flex items-center gap-2 bg-white border border-slate-200 hover:border-[#0A2540]/40 hover:bg-slate-50 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-[#0A2540] transition-all group">
    <MapPin size={13} className="text-[#10B981] group-hover:scale-110 transition-transform flex-shrink-0" />
    {city}
  </Link>
);

// ── Accordion FAQ ───────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "What types of finance internships are on Internify?", a: "We feature roles across Investment Banking, Equity Research, Financial Analysis, FinTech, CA Articleship, Portfolio Management, Risk & Compliance, and Corporate Finance — all manually verified before going live." },
    { q: "Is Internify free for students?", a: "100% free. No premium tiers, no pay-to-apply, no hidden fees. Ever. Companies pay to post — students never pay to apply." },
    { q: "How are internships verified?", a: "Every listing is manually reviewed: company legitimacy confirmed, role clarity checked, links tested. Average review time is 4 hours. No ghost jobs, no fake companies." },
    { q: "How do I apply quickly?", a: "Click 'Quick Apply' on any listing. Your Internify profile is shared automatically. Average application takes under 30 seconds." },
    { q: "Can I find remote finance internships?", a: "Yes. Use the 'Remote' filter to find work-from-home roles in equity research, financial modeling, FinTech, and more — available nationwide." },
    { q: "Do you have paid finance internships?", a: "Both paid (💰) and unpaid/educational (📚) roles are clearly marked. Paid internships show stipend amounts when available." },
    { q: "What happens after I apply?", a: "Your application goes directly to the company's hiring team. Most respond within 5–7 business days. Track applications in your dashboard." },
    { q: "How often are new finance roles added?", a: "We add verified finance internships Monday–Friday. Peak seasons see 150+ daily listings across all finance verticals." },
  ];
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest block mb-2">FAQ</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">Everything You Need to Know</h2>
        <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">Quick answers for finance students ready to launch their careers.</p>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx}
            className={`rounded-xl border overflow-hidden transition-all duration-200
              ${open === idx ? "border-[#0A2540]/20 bg-[#f8faff]" : "border-slate-200 bg-white hover:border-slate-300"}`}
            itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left gap-4"
              aria-expanded={open === idx}>
              <span className="font-semibold text-[#0A2540] text-sm sm:text-base" itemProp="name">{faq.q}</span>
              <ChevronDown size={16} className={`text-[#0A2540]/40 flex-shrink-0 transition-transform duration-200 ${open === idx ? "rotate-180" : ""}`} />
            </button>
            {open === idx && (
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4"
                itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Ticker Bar ──────────────────────────────────────────────
const TickerBar = () => {
  const items = [
    "📈 Investment Banking", "💹 Equity Research", "🏦 Financial Analyst",
    "💳 FinTech", "📊 Portfolio Management", "🧾 CA Articleship",
    "🔍 Risk & Compliance", "💰 Corporate Finance", "📉 Derivatives",
  ];
  return (
    <div className="bg-[#0A2540] overflow-hidden py-2.5 border-b border-white/10">
      <div className="flex whitespace-nowrap" style={{ animation: "ticker 30s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white/70 text-xs font-medium mx-6 flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// ── Loading Component ───────────────────────────────────────
const LoadingSpinner = () => (
  <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-[#0A2540] border-t-[#FFD700] rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[#0A2540] font-medium">Loading finance internships...</p>
    </div>
  </div>
);

// ── Main Page ───────────────────────────────────────────────
export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [popularCities, setPopularCities] = useState<City[]>(FALLBACK_CITIES);
  const [loadingCities, setLoadingCities] = useState(true);

  // Handle mounting - THIS IS THE KEY FIX
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle SEO and analytics (only runs after mounted)
  useEffect(() => {
    if (!isMounted) return;
    
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-CZM79LK7MR", { page_path: window.location.pathname });
    }
    
    const faqSchema = {
      "@context": "https://schema.org", 
      "@type": "FAQPage",
      "mainEntity": [
        { 
          "@type": "Question", 
          "name": "What types of finance internships are on Internify?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Investment Banking, Equity Research, FinTech, CA Articleship, and more — all manually verified." 
          } 
        },
        { 
          "@type": "Question", 
          "name": "Is Internify free for students?", 
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "100% free. Companies pay to post." 
          } 
        },
      ]
    };
    
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [isMounted]);

  // Fetch city data
  useEffect(() => {
    async function fetchCityData() {
      try {
        const res = await fetch("/api/city-counts");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const valid = data
            .filter((d: any) => typeof d?.city === "string" && typeof d?.seoUrl === "string")
            .map((d: any) => ({ city: d.city, seoUrl: d.seoUrl }));
          if (valid.length > 0) { 
            setPopularCities(valid); 
            setLoadingCities(false);
            return;
          }
        }
        setPopularCities(FALLBACK_CITIES);
      } catch { 
        setPopularCities(FALLBACK_CITIES);
      } finally { 
        setLoadingCities(false); 
      }
    }
    fetchCityData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    router.push(`/internships?${params.toString()}`);
  };

  const quickTags = [
    { name: "Investment Banking", seoUrl: "/internships/role/investment-banking" },
    { name: "Equity Research", seoUrl: "/internships/role/equity-research" },
    { name: "Financial Analyst", seoUrl: "/internships/role/finance" },
    { name: "FinTech", seoUrl: "/internships/role/fintech" },
    { name: "CA Articleship", seoUrl: "/internships/role/ca-articleship" },
  ];

  // CRITICAL: Show loading spinner until mounted
  // This ensures server and client render the same thing initially
  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans" suppressHydrationWarning>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="bg-[#0A2540] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <Link href="/" aria-label="Internify Home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center shadow-sm">
              <TrendingUp size={16} className="text-[#0A2540]" strokeWidth={2.5} />
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              Intern<span className="text-[#FFD700]">ify</span>
            </span>
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-[#FFD700]/80 border border-[#FFD700]/30 px-2 py-0.5 rounded-full">
              Finance
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/internships" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Finance Roles</Link>
            <Link href="/community" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Learning Hub</Link>
            <Link href="/blog" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Blog</Link>
          </nav>

          <div className="flex items-center gap-2">
            {!session ? (
              <>
                <Link href="/auth/signin" className="text-sm font-semibold text-white/70 hover:text-white px-4 py-2 rounded-lg transition-all">
                  Sign In
                </Link>
                <Link href="/auth/register"
                  className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A2540] text-sm font-black px-5 py-2.5 rounded-xl transition-all shadow-md hover:-translate-y-0.5">
                  Get Started Free →
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      </header>

      {/* ── TICKER ─────────────────────────────────────────── */}
      <TickerBar />

      <main>
        {/* ── HERO ───────────────────────────────────────── */}
        <section className="relative bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] pt-20 pb-16 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
            <div className="absolute top-10 right-1/4 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#0A2540]/5 border border-[#0A2540]/15 text-[#0A2540] text-xs font-bold px-4 py-2 rounded-full mb-7">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse inline-block" />
              Finance Internships Only — Verified Daily
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-[#0A2540] mb-5 tracking-tight leading-[1.08]">
              Finance Internships in India<br />
              <span className="relative">
                That{" "}
                <span className="relative inline-block">
                  <span className="text-[#0A2540]">Actually Hire</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[4px] bg-[#FFD700] rounded-full" />
                </span>
                {" "}Students
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Verified roles in{" "}
              <span className="text-[#0A2540] font-semibold">Investment Banking, Equity Research, FinTech & Financial Analysis.</span>
              {" "}No ghost jobs. No spam. 100% free.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-3xl mx-auto bg-white border-2 border-slate-200 focus-within:border-[#0A2540]/40 rounded-2xl flex flex-col sm:flex-row items-stretch p-2 mb-7 shadow-xl shadow-slate-200/60 transition-all duration-200"
              role="search" aria-label="Search finance internships">
              <div className="flex flex-1 items-center px-4 py-3 gap-3 border-b sm:border-b-0 sm:border-r border-slate-100">
                <Search className="w-4 h-4 text-[#0A2540]/40 flex-shrink-0" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Role (e.g. IB Analyst, Equity Research)"
                  className="w-full outline-none text-sm text-slate-800 font-medium placeholder:text-slate-400 bg-transparent"
                  aria-label="Search by finance role" />
              </div>
              <div className="flex flex-1 items-center px-4 py-3 gap-3">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City or Remote"
                  className="w-full outline-none text-sm text-slate-800 font-medium placeholder:text-slate-400 bg-transparent"
                  aria-label="Location" />
              </div>
              <button type="submit"
                className="bg-[#0A2540] hover:bg-[#0d2e52] text-white px-6 py-3 m-1 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-md whitespace-nowrap">
                Find Internships →
              </button>
            </form>

            {/* Quick tags */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              <span className="text-slate-500 text-xs font-medium">Popular:</span>
              {quickTags.map((tag) => (
                <Link key={tag.name} href={tag.seoUrl}
                  className="inline-flex items-center bg-white border border-slate-200 hover:border-[#0A2540]/40 hover:text-[#0A2540] text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm">
                  {tag.name}
                </Link>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-5 mt-10 text-xs text-slate-500 font-medium">
              {[
                { icon: <CheckCircle size={13} className="text-[#10B981]" />, text: "100% Verified Listings" },
                { icon: <Clock size={13} className="text-[#10B981]" />, text: "Updated Daily" },
                { icon: <DollarSign size={13} className="text-[#10B981]" />, text: "Always Free for Students" },
                { icon: <Shield size={13} className="text-[#10B981]" />, text: "Finance Roles Only" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">{b.icon}{b.text}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRENDING INTERNSHIPS ────────────────────────── */}
        <HomeTrendingInternships />

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <HowItWorks />

        {/* ── STATS ────────────────────────────────────────── */}
        <div className="bg-[#0A2540]">
          <StatsSection />
        </div>

        {/* ── FINANCE DOMAINS ──────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest block mb-2">Finance Verticals</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">Explore by Finance Domain</h2>
              <p className="text-slate-500 text-sm mt-1.5">Specialised roles for serious finance career starters</p>
            </div>
            <Link href="/internships" className="flex items-center gap-1.5 text-[#0A2540] text-sm font-bold border border-[#0A2540]/20 hover:bg-[#0A2540]/5 px-4 py-2 rounded-lg transition-all whitespace-nowrap">
              View All <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FinanceCategoryCard title="Investment Banking" subtitle="M&A, IPOs, deal execution, and financial modeling" icon={<Building2 size={18} />} tag="Most Competitive" seoUrl="/internships/role/investment-banking" featured />
            <FinanceCategoryCard title="Equity Research" subtitle="Fundamental analysis, sector reports, buy/sell calls" icon={<BarChart3 size={18} />} tag="High Demand" seoUrl="/internships/role/equity-research" />
            <FinanceCategoryCard title="FinTech" subtitle="Payments, lending, trading platforms, blockchain" icon={<Activity size={18} />} tag="Fastest Growing" seoUrl="/internships/role/fintech" />
            <FinanceCategoryCard title="Financial Analyst" subtitle="FP&A, budgeting, forecasting, variance analysis" icon={<PieChart size={18} />} tag="Entry Friendly" seoUrl="/internships/role/finance" />
            <FinanceCategoryCard title="CA Articleship" subtitle="Audit, taxation, compliance with CA firms & Big 4" icon={<BookOpen size={18} />} tag="ICAI Approved" seoUrl="/internships/role/ca-articleship" />
            <FinanceCategoryCard title="Portfolio Management" subtitle="Asset allocation, fund management, risk-adjusted returns" icon={<TrendingUp size={18} />} tag="PMS & AMC" seoUrl="/internships/role/portfolio-management" />
            <FinanceCategoryCard title="Risk & Compliance" subtitle="Credit risk, market risk, regulatory compliance" icon={<Shield size={18} />} tag="Banking Sector" seoUrl="/internships/role/risk-compliance" />
            <FinanceCategoryCard title="Corporate Finance" subtitle="Treasury, capital structure, investor relations" icon={<Landmark size={18} />} tag="Corporates" seoUrl="/internships/role/corporate-finance" />
          </div>
        </section>

        {/* ── WHY INTERNIFY ────────────────────────────────── */}
        <section className="bg-white border-y border-slate-100 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest block mb-2">Why Students Trust Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-3">
                Built for Finance Students.{" "}
                <span className="text-[#10B981]">Not Everyone.</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">
                We built Internify to end ghost listings and wasted applications for finance aspirants.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: <Shield size={20} className="text-[#0A2540]" />, tag: "Manual Review", title: "Zero Ghost Jobs", desc: "Every finance internship is manually reviewed — company verified, role confirmed, links tested. Average 4-hour review.", stat: "100% verified" },
                { icon: <Clock size={20} className="text-[#0A2540]" />, tag: "Daily Updates", title: "Fresh Roles Every Morning", desc: "New finance internships added Monday–Friday. Peak season brings 150+ new listings daily across all finance verticals.", stat: "50–150 new daily" },
                { icon: <Heart size={20} className="text-[#0A2540]" />, tag: "Always Free", title: "Students Never Pay", desc: "No premium tiers, no pay-to-apply, no hidden fees — ever. Companies pay to post. Students apply free.", stat: "₹0 for students" },
              ].map((card, idx) => (
                <div key={idx} className="group bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 hover:border-[#0A2540]/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A2540] border border-[#0A2540]/15 px-2.5 py-1 rounded-full bg-white">{card.tag}</span>
                    <div className="w-10 h-10 bg-[#0A2540]/5 rounded-xl flex items-center justify-center group-hover:bg-[#0A2540]/10 transition-colors">{card.icon}</div>
                  </div>
                  <h3 className="text-[#0A2540] font-bold text-base mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                  <div className="text-[#10B981] font-black text-lg">{card.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR CITIES ───────────────────────────────── */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest block mb-2">By Location</span>
              <h2 className="text-3xl font-bold text-[#0A2540]">Finance Hubs Across India</h2>
              <p className="text-slate-500 text-sm mt-1.5">Find finance internships in major financial centres — or work remotely</p>
            </div>
            {loadingCities ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[...Array(12)].map((_, i) => <div key={i} className="bg-white h-14 rounded-xl border border-slate-200 animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {popularCities.map((city, i) => <CityChip key={i} city={city.city} seoUrl={city.seoUrl} />)}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative rounded-3xl overflow-hidden bg-[#0A2540] p-10 md:p-14 text-center">
            <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <span className="inline-block bg-[#FFD700]/10 text-[#FFD700] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-[#FFD700]/20">
                Finance Careers Start Here
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Your Finance Career<br />Starts With One Internship
              </h2>
              <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
                Join students already applying to Investment Banking, Equity Research, and FinTech roles — completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/internships"
                  className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A2540] font-black px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-xl text-sm">
                  Browse Finance Internships →
                </Link>
                <Link href="/auth/register"
                  className="bg-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/15 transition-all text-sm border border-white/10">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <div className="bg-white border-t border-slate-100">
          <FAQ />
        </div>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <footer className="bg-[#0A2540] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
            <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
              <div className="col-span-2 lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center">
                    <TrendingUp size={16} className="text-[#0A2540]" strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-black text-xl">Intern<span className="text-[#FFD700]">ify</span></span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                  India's finance-focused internship platform. Manually verified roles in Investment Banking, Equity Research, FinTech & more — always free for students.
                </p>
                <div className="flex gap-2 pt-1">
                  {[
                    { href: "https://www.linkedin.com/company/join-internify/", icon: <Linkedin size={14} />, label: "LinkedIn" },
                    { href: "https://www.instagram.com/internify.in/", icon: <Instagram size={14} />, label: "Instagram" },
                    { href: "https://x.com/internify83656", icon: <Twitter size={14} />, label: "Twitter" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-9 h-9 bg-white/5 text-white/50 border border-white/10 hover:border-[#FFD700]/40 hover:text-[#FFD700] rounded-lg flex items-center justify-center transition-all">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <h4 className="text-white font-bold text-sm mb-4">Finance Roles</h4>
                <ul className="space-y-2.5 text-sm text-white/50">
                  {[
                    ["Investment Banking", "/internships/role/investment-banking"],
                    ["Equity Research", "/internships/role/equity-research"],
                    ["FinTech", "/internships/role/fintech"],
                    ["CA Articleship", "/internships/role/ca-articleship"],
                    ["Remote Finance", "/internships/location/remote"],
                  ].map(([l, h]) => (
                    <li key={l}><Link href={h} className="hover:text-[#FFD700] transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h4 className="text-white font-bold text-sm mb-4">Company</h4>
                <ul className="space-y-2.5 text-sm text-white/50">
                  {[
                    ["About Us", "/about"],
                    ["Our Mission", "/mission"],
                    ["Contact Us", "/contact"],
                    ["Privacy Policy", "/privacy"],
                    ["Terms of Service", "/terms"],
                    ["Safety Guidelines", "/safety"],
                  ].map(([l, h]) => (
                    <li key={l}><Link href={h} className="hover:text-[#FFD700] transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <h4 className="text-white font-bold text-sm mb-4">Get in Touch</h4>
                <a href="mailto:internifyhelp@gmail.com"
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-[#FFD700] transition-colors">
                  <Mail size={13} /> internifyhelp@gmail.com
                </a>
                <p className="text-xs text-white/30 mt-2">Response within 24 hours</p>
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs text-white/50 leading-relaxed">
                    <span className="text-[#FFD700] font-semibold">Finance roles only.</span>{" "}
                    Every listing is relevant if you're serious about a finance career.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
              <span>© {new Date().getFullYear()} Internify Pvt. Ltd. · All rights reserved.</span>
              <div className="flex items-center gap-1.5">
                Made with <Heart size={10} className="text-[#FFD700] fill-[#FFD700]" /> in India 🇮🇳
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}