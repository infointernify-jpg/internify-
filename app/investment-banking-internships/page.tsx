"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  MapPin, Clock, IndianRupee, Building2,
  ChevronRight, CheckCircle, ArrowRight,
  Calendar, Briefcase, TrendingUp, Bell, Twitter, Linkedin, Award, Users, Sparkles, Wallet, Tag
} from "lucide-react";
import Header from "../components/Header";

type Internship = {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string[];
  isActivelyHiring: boolean;
  isVerified: boolean;
  logoUrl?: string;
  description: string;
  workMode: string;
  createdAt: string;
  applyLink?: string;
  category: string;
};

const getCompanyInitials = (company: string) => {
  if (!company) return "IN";
  const words = company.split(" ");
  if (words.length === 1) return company.substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const getLocationDisplay = (location: string, workMode: string) => {
  const cleanLocation = location?.replace(/, India$/, '').replace(/ India$/, '').trim();
  if (workMode === "Remote") return "Remote";
  if (workMode === "Hybrid") return `${cleanLocation} (Hybrid)`;
  return cleanLocation;
};

const formatStipend = (stipend: string) => {
  if (!stipend || stipend === "Not Disclosed" || stipend === "Not disclosed" || stipend === "") {
    return "Stipend not disclosed";
  }
  if (stipend.includes("₹")) return stipend;
  if (!isNaN(Number(stipend)) && stipend !== "") {
    return `₹${Number(stipend).toLocaleString()}/month`;
  }
  return `₹${stipend}`;
};

const formatPostedDate = (date: string) => {
  if (!date) return "Recently";
  const postedDate = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

const topCompanies = [
  "Goldman Sachs", "Morgan Stanley", "J.P. Morgan", "Avendus",
  "Kotak Mahindra Bank", "Bank of America", "Citibank", "Nomura"
];

const locations = ["Mumbai", "Bengaluru", "Delhi NCR", "Remote"];

export default function InvestmentBankingPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchInvestmentBankingInternships();
  }, []);

  const fetchInvestmentBankingInternships = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/internships');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        const ibInternships = data.filter((job: Internship) => 
          job.category === "Investment Banking" || 
          job.category?.toLowerCase().includes("investment banking") ||
          job.title?.toLowerCase().includes("investment banking")
        );
        setInternships(ibInternships);
      }
    } catch (error) {
      console.error("Error fetching IB internships:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <Head>
        <title>Investment Banking Internships in India 2026 | Internify</title>
        <meta name="description" content="Explore verified investment banking internships across top firms like Goldman Sachs, JPMorgan, Morgan Stanley, and leading boutique advisory firms. Apply to roles in financial modeling, valuation, M&A, and capital markets — no signup required." />
        <meta name="keywords" content="investment banking internships India, IB internships, M&A internships, financial modeling internships, what is investment banking" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://internify.com/investment-banking-internships-india" />
      </Head>

      <Header />

      <main className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* ===== BREADCRUMB ===== */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#0A2540] transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#0A2540] font-medium">Investment Banking Internships</span>
          </nav>

          {/* ===== HERO SECTION ===== */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#0A2540]/5 px-4 py-2 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[#0A2540]">Investment Banking</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0A2540] mb-4">
              Investment Banking Internships in India <span className="text-[#10B981]">(2026)</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Explore verified investment banking internships across top firms like Goldman Sachs, JPMorgan, 
              Morgan Stanley, and leading boutique advisory firms. Apply to roles in financial modeling, 
              valuation, M&A, and capital markets — <span className="text-[#10B981] font-medium">no signup required</span>.
            </p>
            <p className="text-xs text-slate-400 mt-3">
              Updated daily with the latest investment banking internship opportunities across India.
            </p>
          </div>

          {/* ===== STATS STRIP ===== */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0A2540]">{internships.length || 1}+</div>
              <div className="text-xs text-slate-400">Active Roles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0A2540]">25+</div>
              <div className="text-xs text-slate-400">Companies Hiring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0A2540]">Daily</div>
              <div className="text-xs text-slate-400">Updated Daily</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0A2540]">100%</div>
              <div className="text-xs text-slate-400">All listings manually verified</div>
            </div>
          </div>

          {/* ===== LATEST INTERNSHIPS SECTION ===== */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-[#0A2540]">Latest Investment Banking Internships</h2>
              <p className="text-sm text-slate-400 mt-1">Verified roles from companies actively hiring now</p>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />)}
              </div>
            ) : internships.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                <Briefcase size={48} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No investment banking internships available right now.</p>
                <button className="mt-4 px-5 py-2 bg-[#0A2540] text-white text-sm rounded-lg hover:bg-[#1a3a5c] transition inline-flex items-center gap-2">
                  <Bell size={14} /> Get Notified
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {internships.map((job) => (
                  <div
                    key={job.id}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#BDA6CE] transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() => window.open(job.applyLink || `/internships/${job.id}`, '_blank')}
                  >
                    <div className="p-5">
                      <div className="flex gap-4">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                          {!imageErrors[job.id] && job.logoUrl ? (
                            <div className="rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden w-16 h-16">
                              <img 
                                src={job.logoUrl} 
                                alt={job.company} 
                                className="object-contain w-12 h-12"
                                onError={() => handleImageError(job.id)}
                              />
                            </div>
                          ) : (
                            <div className="rounded-xl bg-gradient-to-br from-[#0A2540] to-[#1a3a5c] flex items-center justify-center w-16 h-16 shadow-sm">
                              <span className="text-white font-bold text-xl">{getCompanyInitials(job.company)}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title Row */}
                          <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                            <div className="flex-1">
                              <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#BDA6CE] transition-colors">
                                {job.title}
                              </h2>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-sm text-gray-600 font-medium">{job.company}</span>
                                {job.isActivelyHiring && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                                    <TrendingUp size={10} />
                                    Trending
                                  </span>
                                )}
                                {job.isVerified && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                    <CheckCircle size={10} />
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                            <button className="px-5 py-2 bg-gradient-to-r from-[#8B6BA3] to-[#BDA6CE] hover:from-[#7A5A92] hover:to-[#A896C8] text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap">
                              Apply →
                            </button>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                            {job.description?.substring(0, 120)}...
                          </p>

                          {/* Details Row */}
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <MapPin size={14} className="text-[#BDA6CE] flex-shrink-0" />
                              <span>{getLocationDisplay(job.location, job.workMode)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Clock size={14} className="text-[#BDA6CE] flex-shrink-0" />
                              <span>{job.duration || "Flexible"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm">
                              <Wallet size={14} className="text-green-500 flex-shrink-0" />
                              <span className="font-semibold text-green-600">
                                {formatStipend(job.stipend)}
                              </span>
                            </div>
                          </div>

                          {/* Skills Tags - Removed category tag from footer */}
                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {job.skills.slice(0, 4).map((skill: string, i: number) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer Tags - Removed category, only posted date */}
                          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md">
                              <Calendar size={10} />
                              Posted {formatPostedDate(job.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ===== SEO CONTENT BLOCKS ===== */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                <Briefcase size={16} className="text-[#10B981]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0A2540]">What is Investment Banking?</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Investment banking is a specialized financial service that helps corporations, governments, and institutions raise capital, 
              execute mergers and acquisitions (M&A), and provide strategic advisory services. Investment bankers work on complex financial 
              transactions including IPOs, debt offerings, restructurings, and leveraged buyouts. The role requires strong analytical 
              skills, financial modeling expertise, and the ability to work in fast-paced, high-pressure environments.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                <Award size={16} className="text-[#10B981]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0A2540]">Top Skills Required for Investment Banking Internships</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              To succeed in investment banking internships, students should have strong analytical and financial 
              skills. Key skills include financial modeling, valuation techniques (DCF, comparables), Excel 
              proficiency, accounting fundamentals, and PowerPoint for presentations. Knowledge of financial 
              statements and attention to detail are essential.
            </p>
          </div>

          {/* ===== TOP COMPANIES ===== */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                <Building2 size={16} className="text-[#10B981]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0A2540]">Top Companies Hiring Investment Banking Interns in India</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Top companies offering investment banking internships in India include Goldman Sachs, JPMorgan Chase, 
              Morgan Stanley, and leading boutique advisory firms. Opportunities are available in major financial 
              hubs like Mumbai, Bengaluru, and Delhi, as well as remote roles with global teams.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {topCompanies.map((bank, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-2 text-center">
                  <span className="text-xs font-medium text-[#0A2540]">{bank}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                <Users size={16} className="text-[#10B981]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0A2540]">Who Should Apply?</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Investment banking internships are ideal for B.Com, BBA, MBA, CA, and finance-focused students. 
              Candidates with strong quantitative skills, interest in financial markets, and willingness to 
              work in fast-paced environments are well suited for these roles.
            </p>
          </div>

          {/* ===== LOCATION BLOCK ===== */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-[#10B981]" />
              </div>
              <h2 className="text-lg font-semibold text-[#0A2540]">Investment Banking Internships by Location</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {locations.map((loc, idx) => (
                <Link key={idx} href={`/internships/location/${loc.toLowerCase()}`}>
                  <span className="inline-block px-4 py-2 bg-slate-100 text-[#0A2540] text-sm rounded-full hover:bg-[#10B981]/10 hover:text-[#10B981] transition">
                    {loc}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ===== FAQ SECTION - SEO OPTIMIZED QUESTIONS ===== */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#0A2540] mb-4 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">What is investment banking?</h3>
                <p className="text-xs text-slate-500">Investment banking helps companies raise capital, execute M&A deals, and provides financial advisory services. Investment bankers work on IPOs, debt offerings, mergers, and restructurings.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">What is the salary of an investment banking intern in India?</h3>
                <p className="text-xs text-slate-500">Investment banking interns in India earn between ₹30,000 to ₹1,00,000 per month depending on the firm. Top global banks like Goldman Sachs and Morgan Stanley offer stipends at the higher end.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">How to get an investment banking internship at Goldman Sachs?</h3>
                <p className="text-xs text-slate-500">Build strong financial modeling skills, maintain a high GPA (7.5+), network with professionals on LinkedIn, prepare for technical interviews, and apply 6-8 months in advance through their career portal.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">What do investment banking interns do day to day?</h3>
                <p className="text-xs text-slate-500">IB interns build financial models, prepare pitch decks, conduct market research, analyze companies for M&A, support live deals, and help with client presentations. Work hours are typically long but rewarding.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">What is the difference between investment banking and corporate finance?</h3>
                <p className="text-xs text-slate-500">Investment banking focuses on external transactions like M&A, IPOs, and capital raising for clients. Corporate finance manages a company's internal finances including budgeting, forecasting, and treasury operations.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">Do investment banking internships lead to full-time jobs?</h3>
                <p className="text-xs text-slate-500">Yes, many top investment banks offer pre-placement offers (PPOs) to high-performing interns. Converting an internship to a full-time role is common in investment banking.</p>
              </div>
            </div>
          </div>

          {/* ===== INTERNAL LINKS ===== */}
          <div className="bg-slate-50 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold text-[#0A2540] mb-3 text-center">Explore Related Finance Roles</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/equity-research-internships" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-500 hover:border-[#10B981] hover:text-[#10B981] transition">Equity Research Internships</Link>
              <Link href="/financial-analyst-internships" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-500 hover:border-[#10B981] hover:text-[#10B981] transition">Financial Analyst Internships</Link>
              <Link href="/fintech-internships" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-500 hover:border-[#10B981] hover:text-[#10B981] transition">FinTech Internships</Link>
              <Link href="/corporate-finance-internships" className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-500 hover:border-[#10B981] hover:text-[#10B981] transition">Corporate Finance Internships</Link>
            </div>
          </div>

          {/* ===== CTA SECTION ===== */}
          <div className="bg-[#0A2540] rounded-xl p-8 text-center">
            <h3 className="text-white text-xl font-semibold mb-2">Start applying to verified investment banking internships today</h3>
            <p className="text-white/60 text-sm mb-5">No signup required — apply directly to verified roles</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/internships" className="bg-[#FFD700] text-[#0A2540] font-medium px-6 py-2.5 rounded-lg hover:bg-[#e6c200] transition">
                Browse all finance internships →
              </Link>
              <Link href="/equity-research-internships" className="bg-white/10 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-white/15 transition">
                Explore equity research roles →
              </Link>
            </div>
            <p className="text-white/30 text-[10px] mt-4">✨ Free for students • Verified listings • Updated daily</p>
          </div>

        </div>
      </main>
    </>
  );
}