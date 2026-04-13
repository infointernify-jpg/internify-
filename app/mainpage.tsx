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
const ProfileDropdown = dynamic(
  () => import("@/components/ProfileDropdown"), { ssr: false }
);

// ── Types ───────────────────────────────────────────────────
interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  logo: string;
}

// ── Featured Internships Data (8 REAL finance roles) ─────
const featuredInternships: Internship[] = [
  {
    id: 1,
    title: "Investment Banking Analyst",
    company: "OakNorth",
    location: "Mumbai (Hybrid)",
    stipend: "₹35,000/month",
    duration: "3 months",
    logo: "ON"
  },
  {
    id: 2,
    title: "Equity Research Intern",
    company: "Infrabyte Consulting",
    location: "Bangalore (Remote)",
    stipend: "₹25,000/month",
    duration: "6 months",
    logo: "IC"
  },
  {
    id: 3,
    title: "FinTech Analyst",
    company: "Razorpay",
    location: "Remote",
    stipend: "₹30,000/month",
    duration: "3 months",
    logo: "RZ"
  },
  {
    id: 4,
    title: "Financial Analyst - FP&A",
    company: "Deloitte",
    location: "Gurgaon",
    stipend: "₹28,000/month",
    duration: "6 months",
    logo: "DL"
  },
  {
    id: 5,
    title: "CA Articleship",
    company: "KPMG",
    location: "Mumbai",
    stipend: "₹20,000/month",
    duration: "3 years",
    logo: "KP"
  },
  {
    id: 6,
    title: "Risk & Compliance Intern",
    company: "HDFC Bank",
    location: "Mumbai",
    stipend: "₹22,000/month",
    duration: "2 months",
    logo: "HB"
  },
  {
    id: 7,
    title: "Corporate Finance Intern",
    company: "Goldman Sachs",
    location: "Bangalore",
    stipend: "₹40,000/month",
    duration: "3 months",
    logo: "GS"
  },
  {
    id: 8,
    title: "Portfolio Management Intern",
    company: "Morgan Stanley",
    location: "Mumbai",
    stipend: "₹38,000/month",
    duration: "3 months",
    logo: "MS"
  }
];

// ── FAQ Data ────────────────────────────────────────────────
const faqs = [
  { q: "What types of finance internships are on Internify?", a: "Investment Banking, Equity Research, Financial Analysis, FinTech, CA Articleship, Portfolio Management, Risk & Compliance, and Corporate Finance — all manually verified." },
  { q: "Is Internify free for students?", a: "100% free. No premium tiers, no pay-to-apply, no hidden fees. Companies pay to post — students never pay." },
  { q: "How are internships verified?", a: "Every listing is manually reviewed — company confirmed, role checked, links tested. No ghost jobs." },
  { q: "Can I find remote finance internships?", a: "Yes. Use the 'Remote' filter to find work-from-home roles in equity research, financial modeling, and FinTech." },
];

// ── FAQ Component ───────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">FAQ</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`rounded-xl border overflow-hidden transition-all duration-200
            ${open === idx ? "border-[#0A2540]/20 bg-[#f8faff]" : "border-slate-200 bg-white"}`}>
            <button onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left gap-4">
              <span className="font-semibold text-[#0A2540] text-sm">{faq.q}</span>
              <ChevronDown size={16} className={`text-[#0A2540]/40 transition-transform duration-200 ${open === idx ? "rotate-180" : ""}`} />
            </button>
            {open === idx && (
              <div className="px-5 pb-5 text-slate-600 text-sm border-t border-slate-100 pt-4">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Finance Categories (ONLY ONCE - NO DUPLICATES) ──────────
const FinanceCategories = () => {
  const categories = [
    { title: "Investment Banking", subtitle: "M&A, IPOs, deal execution", icon: <Building2 size={18} />, tag: "Most Competitive", seoUrl: "/internships/role/investment-banking" },
    { title: "Equity Research", subtitle: "Fundamental analysis, sector reports", icon: <BarChart3 size={18} />, tag: "High Demand", seoUrl: "/internships/role/equity-research" },
    { title: "FinTech", subtitle: "Payments, lending, trading platforms", icon: <Activity size={18} />, tag: "Fastest Growing", seoUrl: "/internships/role/fintech" },
    { title: "Financial Analyst", subtitle: "FP&A, budgeting, forecasting", icon: <PieChart size={18} />, tag: "Entry Friendly", seoUrl: "/internships/role/finance" },
    { title: "CA Articleship", subtitle: "Audit, taxation, compliance", icon: <BookOpen size={18} />, tag: "ICAI Approved", seoUrl: "/internships/role/ca-articleship" },
    { title: "Risk & Compliance", subtitle: "Credit risk, market risk", icon: <Shield size={18} />, tag: "Banking Sector", seoUrl: "/internships/role/risk-compliance" },
    { title: "Corporate Finance", subtitle: "Treasury, capital structure", icon: <Landmark size={18} />, tag: "Corporates", seoUrl: "/internships/role/corporate-finance" },
    { title: "Portfolio Management", subtitle: "Asset allocation, fund management", icon: <TrendingUp size={18} />, tag: "PMS & AMC", seoUrl: "/internships/role/portfolio-management" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">Finance Verticals</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540]">Explore Finance Internship Domains</h2>
        <p className="text-slate-500 text-sm mt-1.5">Specialised roles for serious finance career starters</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <Link key={idx} href={cat.seoUrl} className="group block">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#0A2540]/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A2540] bg-[#0A2540]/5 px-2.5 py-1 rounded-full">
                  {cat.tag}
                </span>
                <div className="p-2 rounded-xl bg-[#0A2540]/5">
                  <span className="text-[#0A2540]">{cat.icon}</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-[#0A2540] mb-1">{cat.title}</h3>
              <p className="text-sm text-slate-500">{cat.subtitle}</p>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#0A2540]">
                Explore roles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ── Trust Bar ──────────────────────────────────────────────
const TrustBar = () => (
  <div className="bg-white border-y border-slate-100 py-4">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
        <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#10B981]" /> 100% Verified Listings</div>
        <div className="flex items-center gap-2"><Clock size={16} className="text-[#10B981]" /> Updated Daily</div>
        <div className="flex items-center gap-2"><DollarSign size={16} className="text-[#10B981]" /> Always Free for Students</div>
        <div className="flex items-center gap-2"><Shield size={16} className="text-[#10B981]" /> Finance Roles Only</div>
      </div>
    </div>
  </div>
);

// ── Location Section (Moved DOWN) ──────────────────────────
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
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:border-[#0A2540]/40 hover:text-[#0A2540] transition-all">
            <MapPin size={13} className="text-[#10B981]" />
            {city}
          </Link>
        ))}
      </div>
    </section>
  );
};

// ── Main Page ───────────────────────────────────────────────
export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
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
      {/* ── 1. NAVBAR (CLEAN - NO DUPLICATES) ───────────────── */}
      <header className="bg-[#0A2540] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center">
              <TrendingUp size={16} className="text-[#0A2540]" />
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              Intern<span className="text-[#FFD700]">ify</span>
            </span>
          </Link>

          {/* CLEAN NAVBAR - ONLY 3 ITEMS (Removed Finance and Finance Roles) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/internships" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Internships</Link>
            <Link href="/domains" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Finance Domains</Link>
            <Link href="/blog" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">Blog</Link>
          </nav>

          <div className="flex items-center gap-2">
            {!session ? (
              <>
                <Link href="/auth/signin" className="text-sm font-semibold text-white/70 hover:text-white px-4 py-2 rounded-lg transition-all">
                  Sign In
                </Link>
                <Link href="/auth/register"
                  className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0A2540] text-sm font-black px-5 py-2.5 rounded-xl transition-all shadow-md">
                  Get Started →
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ── 2. HERO SECTION (FIRST SCREEN - NOTHING BEFORE) ─ */}
        <section className="relative bg-gradient-to-b from-[#EEF2FF] to-[#F8FAFC] pt-16 pb-12">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge - REMOVED "Finance Internships Only" to reduce clutter */}
            <div className="inline-flex items-center gap-2 bg-[#0A2540]/5 border border-[#0A2540]/15 text-[#0A2540] text-xs font-bold px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
              Verified Finance Internships Daily
            </div>

            {/* SEO Optimized H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0A2540] mb-4 leading-tight">
              Best Finance Internships in India<br />
              That <span className="relative inline-block">
                <span className="text-[#0A2540]">Actually Hire Students</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#FFD700] rounded-full" />
              </span>
            </h1>

            {/* SEO Optimized Subtext */}
            <p className="text-slate-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
              Top companies hiring for <span className="text-[#0A2540] font-semibold">Investment Banking, Equity Research, FinTech, Financial Analyst & CA Articleship</span> roles in India.
            </p>

            {/* Search Bar - IMPROVED PLACEHOLDER */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row p-2 shadow-lg">
              <div className="flex flex-1 items-center px-4 py-2 gap-2">
                <Search className="w-4 h-4 text-[#0A2540]/40" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Investment Banking, Equity Research, FinTech, Financial Analyst"
                  className="w-full outline-none text-sm bg-transparent" />
              </div>
              <div className="flex flex-1 items-center px-4 py-2 gap-2 border-t sm:border-t-0 sm:border-l border-slate-100">
                <MapPin className="w-4 h-4 text-[#0A2540]/40" />
                <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Mumbai, Bangalore, Delhi, Remote"
                  className="w-full outline-none text-sm bg-transparent" />
              </div>
              <button type="submit" className="bg-[#0A2540] hover:bg-[#0d2e52] text-white px-6 py-2 rounded-xl font-bold text-sm transition-all">
                Find Internships →
              </button>
            </form>

            {/* Urgency Line - ADDED */}
            <div className="mt-5">
              <p className="text-amber-700 text-sm font-medium bg-amber-50 inline-block px-4 py-2 rounded-full">
                🔥 150+ active finance internships added this week — apply before they close
              </p>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="text-slate-500 text-xs">Popular searches:</span>
              {quickTags.map((tag) => (
                <Link key={tag.name} href={tag.seoUrl}
                  className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-600 hover:border-[#0A2540]/40 hover:text-[#0A2540] transition-all">
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. TRUST BAR ───────────────────────────────────── */}
        <TrustBar />

        {/* ── 4. FINANCE CATEGORIES (MOVED UP - NO DUPLICATES) ─ */}
        <FinanceCategories />

        {/* ── 5. FEATURED INTERNSHIPS ─────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">🔥 Featured</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540]">Latest Finance Internships in India (2026)</h2>
            </div>
            <Link href="/internships" className="text-sm text-[#0A2540] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All Internships <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredInternships.slice(0, 8).map((internship) => (
              <div key={internship.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#0A2540] text-sm line-clamp-2">{internship.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{internship.company}</p>
                  </div>
                  <div className="w-8 h-8 bg-[#0A2540]/5 rounded-lg flex items-center justify-center text-xs font-bold text-[#0A2540] flex-shrink-0 ml-2">
                    {internship.logo}
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500"><MapPin size={12} />{internship.location}</div>
                  <div className="flex items-center gap-1.5 text-[#10B981] font-semibold"><DollarSign size={12} />{internship.stipend}</div>
                  <div className="flex items-center gap-1.5 text-slate-500"><Clock size={12} />{internship.duration}</div>
                </div>
                <button className="w-full mt-3 bg-[#0A2540] text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0d2e52] transition-colors">
                  Quick Apply
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. WHY TRUST US (KEPT - IT'S STRONG) ─────────────── */}
        <section className="bg-white border-y border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">Why Students Trust Us</span>
              <h2 className="text-3xl font-bold text-[#0A2540] mt-1">Built for Finance Students. <span className="text-[#10B981]">Not Everyone.</span></h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">Unlike generic job portals, every role here is curated only for finance careers in India.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Zero Ghost Jobs", desc: "Every finance internship is manually reviewed — company verified, role confirmed, links tested.", stat: "100% verified" },
                { title: "Fresh Roles Daily", desc: "New finance internships added Monday–Friday. Peak season brings 150+ new listings daily.", stat: "50-150 new daily" },
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

        {/* ── 7. LOCATIONS (MOVED DOWN - OPTIONAL) ─────────────── */}
        <LocationSection />

        {/* ── 8. FINAL CTA ────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0A2540] rounded-2xl p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Your Finance Career Starts With One Internship</h2>
            <p className="text-white/60 mb-6">Join 500+ students already applying to Investment Banking, Equity Research, and FinTech roles — completely free.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/internships" className="bg-[#FFD700] text-[#0A2540] font-black px-6 py-3 rounded-xl hover:bg-[#e6c200] transition-all">
                Browse Finance Internships →
              </Link>
              <Link href="/auth/register" className="bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/15 transition-all">
                Create Free Account
              </Link>
            </div>
          </div>
        </section>

        {/* ── 9. FAQ (BOTTOM ONLY FOR SEO) ─────────────────────── */}
        <FAQ />
      </main>

      {/* ── 10. FOOTER ───────────────────────────────────────── */}
      <footer className="bg-[#0A2540] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>© 2026 Internify · Finance Internships in India · Investment Banking · Equity Research · FinTech</span>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-white/70">About</Link>
              <Link href="/privacy" className="hover:text-white/70">Privacy</Link>
              <Link href="/contact" className="hover:text-white/70">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}