"use client";

import Link from "next/link";
import Head from "next/head";
import {
  Building2, TrendingUp, Shield, PieChart, Landmark,
  Activity, BookOpen, BarChart3, Briefcase, ArrowRight,
  CheckCircle, Clock, DollarSign, Users, Target, Award
} from "lucide-react";
import Header from "../components/Header";

export default function FinanceDomainsPage() {
  const domains = [
    {
      title: "Investment Banking",
      tag: "Most Competitive",
      description: "M&A, IPOs, deal execution, financial modeling, valuation, and capital raising for corporations and institutions.",
      icon: <Building2 size={20} />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      skills: ["Financial Modeling", "Valuation", "Excel", "M&A", "Deal Execution"],
      slug: "/investment-banking-internships-india"
    },
    {
      title: "Equity Research",
      tag: "High Demand",
      description: "Fundamental analysis, sector research, stock recommendations, financial modeling, and investment thesis development.",
      icon: <TrendingUp size={20} />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      skills: ["Financial Analysis", "Sector Research", "Bloomberg", "Valuation", "Report Writing"],
      slug: "/equity-research-internships"
    },
    {
      title: "FinTech",
      tag: "Fastest Growing",
      description: "Payments, lending, trading platforms, blockchain, digital banking, and financial technology innovation.",
      icon: <Activity size={20} />,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      skills: ["Python", "SQL", "Data Analysis", "Payments", "Blockchain"],
      slug: "/fintech-internships"
    },
    {
      title: "Financial Analyst",
      tag: "Entry Friendly",
      description: "FP&A, budgeting, forecasting, financial reporting, data analysis, and business decision support.",
      icon: <BarChart3 size={20} />,
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-700",
      skills: ["Excel", "Financial Reporting", "Budgeting", "Forecasting", "Data Analysis"],
      slug: "/financial-analyst-internships"
    },
    {
      title: "CA Articleship",
      tag: "ICAI Approved",
      description: "Audit, taxation, compliance, financial reporting, and statutory requirements for organizations.",
      icon: <BookOpen size={20} />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      skills: ["Audit", "Taxation", "Compliance", "Accounting Standards", "Tally"],
      slug: "/ca-articleship-internships"
    },
    {
      title: "Risk & Compliance",
      tag: "Banking Sector",
      description: "Credit risk, market risk, operational risk, regulatory compliance, and risk mitigation strategies.",
      icon: <Shield size={20} />,
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      skills: ["Risk Assessment", "Statistical Modeling", "SQL", "Basel Norms", "Compliance"],
      slug: "/risk-compliance-internships"
    },
    {
      title: "Corporate Finance",
      tag: "Corporates",
      description: "Treasury, capital structure, financial planning, working capital management, and corporate strategy.",
      icon: <Landmark size={20} />,
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      skills: ["Treasury Management", "Capital Budgeting", "Financial Planning", "Excel", "Valuation"],
      slug: "/corporate-finance-internships"
    },
    {
      title: "Portfolio Management",
      tag: "PMS & AMC",
      description: "Asset allocation, fund management, investment research, wealth management, and client portfolio optimization.",
      icon: <PieChart size={20} />,
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      skills: ["Asset Allocation", "Investment Research", "Risk Management", "Bloomberg", "CFA"],
      slug: "/portfolio-management-internships"
    }
  ];

  const certifications = [
    { name: "CFA (Chartered Financial Analyst)", provider: "CFA Institute" },
    { name: "FRM (Financial Risk Manager)", provider: "GARP" },
    { name: "CA (Chartered Accountant)", provider: "ICAI" },
    { name: "CMA (Certified Management Accountant)", provider: "IMA" },
    { name: "NISM Certifications", provider: "SEBI" },
    { name: "Financial Modeling Certification", provider: "FMVA" }
  ];

  return (
    <>
      <Head>
        <title>Finance Domains & Career Guide | Internify</title>
        <meta name="description" content="Complete guide to finance domains including Investment Banking, Equity Research, FinTech, Portfolio Management, and more. Learn about careers, skills, and certifications." />
        <meta name="keywords" content="finance domains, finance careers, investment banking, equity research, fintech, portfolio management, CA articleship" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://internify.com/domains" />
      </Head>

      <Header />

      <main className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#0A2540] transition">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#0A2540] font-medium">Finance Domains</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#0A2540]/5 px-4 py-2 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[#0A2540]">Career Guide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0A2540] mb-4">
              Finance Domains & <span className="text-[#10B981]">Career Guide</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Explore top finance domains, career paths, required skills, and certifications. 
              Find the perfect finance career for your future.
            </p>
          </div>

          {/* Domains Grid */}
          <h2 className="text-2xl font-bold text-[#0A2540] mb-6 text-center">Finance Domains Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {domains.map((domain, idx) => (
              <Link key={idx} href={domain.slug} className="group block h-full">
                <div className="bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#10B981]/30 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <div className={`p-4 ${domain.bgColor} border-b border-slate-100`}>
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${domain.textColor} bg-white shadow-sm`}>
                        {domain.icon}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${domain.bgColor} ${domain.textColor}`}>
                        {domain.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-bold text-[#0A2540] mb-2 group-hover:text-[#10B981] transition">
                      {domain.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                      {domain.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#10B981] group-hover:gap-2 transition-all">
                      Explore Roles <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* How to Choose a Finance Domain */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-[#0A2540] mb-4 text-center">How to Choose the Right Finance Domain?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target size={20} className="text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-[#0A2540] mb-1">1. Assess Your Interests</h3>
                <p className="text-xs text-slate-500">Do you enjoy analyzing companies? Working with numbers? Building financial models? Client interaction?</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users size={20} className="text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-[#0A2540] mb-1">2. Understand Work Culture</h3>
                <p className="text-xs text-slate-500">Investment banking has long hours. Equity research requires deep analysis. FinTech is fast-paced and innovative.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award size={20} className="text-[#10B981]" />
                </div>
                <h3 className="font-semibold text-[#0A2540] mb-1">3. Plan Your Certifications</h3>
                <p className="text-xs text-slate-500">CFA for investment roles, FRM for risk, CA for audit/tax, or specialized fintech certifications.</p>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-[#0A2540] mb-4 text-center">Top Finance Certifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={14} className="text-[#10B981]" />
                    <h3 className="font-semibold text-sm text-[#0A2540]">{cert.name}</h3>
                  </div>
                  <div className="text-xs text-slate-500">
                    <span>🏢 {cert.provider}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Progression */}
          <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] rounded-xl p-6 mb-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Your Finance Career Journey</h2>
            <p className="text-white/60 text-sm mb-5">Typical progression from internship to leadership</p>
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">Internship</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">Analyst</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">Associate</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">VP</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">Director</span>
              <span className="text-white/40">→</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">MD/C-Suite</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-[#0A2540] mb-4 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">Which finance domain is right for me?</h3>
                <p className="text-xs text-slate-500">It depends on your interests. Investment banking for deal-making, equity research for analysis, FinTech for technology, CA for audit/tax.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">Which domain is best for beginners?</h3>
                <p className="text-xs text-slate-500">Financial Analyst and CA Articleship are great entry points. They build strong fundamentals before moving to specialized roles.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">What certifications help in finance?</h3>
                <p className="text-xs text-slate-500">CFA for investment roles, FRM for risk management, CA for audit/tax, and NISM for capital markets.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A2540] mb-1">Can I switch between finance domains?</h3>
                <p className="text-xs text-slate-500">Yes, many professionals switch between domains. Strong fundamentals in financial modeling and analysis help in transitioning.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#0A2540] rounded-xl p-8 text-center">
            <h3 className="text-white text-xl font-semibold mb-2">Ready to start your finance career?</h3>
            <p className="text-white/60 text-sm mb-5">Explore internships across all finance domains - no signup required</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/internships" className="bg-[#FFD700] text-[#0A2540] font-medium px-6 py-2.5 rounded-lg hover:bg-[#e6c200] transition">
                Browse All Internships →
              </Link>
              <Link href="/investment-banking-internships-india" className="bg-white/10 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-white/15 transition">
                Explore Top Domains →
              </Link>
            </div>
            <p className="text-white/30 text-[10px] mt-4">Free for students • 8+ Finance Domains • Updated daily</p>
          </div>

        </div>
      </main>
    </>
  );
}