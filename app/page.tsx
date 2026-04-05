"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Search, Sparkles, Shield, Zap, Heart, MapPin, Building2, Users, Code, PenTool,
  Database, Instagram, Linkedin, Mail, Twitter, TrendingUp, ChevronRight,
  Braces, BarChart3, Palette, Megaphone, Landmark, CheckCircle
} from "lucide-react";
import Link from "next/link";
import { trackEvent } from '@/lib/amplitude';

// Lazy load components that are below the fold
const HomeTrendingInternships = dynamic(() => import('@/components/TrendingInternships'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-xl" />,
  ssr: false
});

const ProfileDropdown = dynamic(() => import('@/components/ProfileDropdown'), {
  ssr: false
});

const HowItWorks = dynamic(() => import('@/components/HowItWorks'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-50 rounded-xl" />,
  ssr: false
});

const StatsSection = dynamic(() => import('@/components/StatsSection'), {
  ssr: false
});

// ─── Category Card (Links to SEO-friendly URLs) ─────────────────────────────
const CategoryCard = ({
  title, subtitle, icon, color, span = "", seoUrl,
}: {
  title: string; subtitle: string; icon: React.ReactNode;
  color: string; span?: string; seoUrl: string;
}) => (
  <Link href={seoUrl} className={`group block ${span}`}>
    <div className="relative h-full bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform duration-200`}>
            {icon}
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-xs text-slate-600 font-medium">{subtitle}</p>
        </div>
        <div className="flex items-center h-full mt-1">
          <div className="bg-slate-100 group-hover:bg-blue-100 rounded-full p-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
            <ChevronRight size={18} className="text-slate-500 group-hover:text-blue-600 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// ─── City Card Component ─────────────────────────────────────────────────────
const CityCard = ({ city, count, seoUrl }: { city: string; count: number; seoUrl: string }) => (
  <Link href={seoUrl} className="bg-white p-4 rounded-xl text-center hover:shadow-lg transition-all border border-slate-200 hover:border-green-300 group">
    <MapPin size={24} className="mx-auto text-green-500 mb-2 group-hover:scale-110 transition-transform" />
    <h3 className="font-semibold text-slate-800 text-sm">{city}</h3>
    {count > 0 ? (
      <p className="text-xs text-gray-500">{count}+ internships</p>
    ) : (
      <p className="text-xs text-gray-400">Explore opportunities</p>
    )}
    <p className="text-xs text-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View →</p>
  </Link>
);

// ─── FAQ Component ─────────────────────────────────────────────────────────
const FAQ = () => {
  const faqs = [
    {
      q: "Are the internships on Internify verified?",
      a: "Yes! Every single internship listing is manually reviewed by our team before publishing. We verify company details and remove ghost listings to ensure you only apply to genuine opportunities."
    },
    {
      q: "Is Internify really free for students?",
      a: "Absolutely. Internify is 100% free for students. We never charge for applications, resume downloads, or access to listings. We charge companies to post, not students to apply."
    },
    {
      q: "How often are new internships posted?",
      a: "We update our listings daily with fresh, verified opportunities. Popular roles like Frontend Development, Data Analytics, and Marketing fill up quickly, so we recommend checking back regularly."
    },
    {
      q: "Can I find remote internships on Internify?",
      a: "Yes! We have a dedicated 'Remote' filter. Many companies offer work-from-home or hybrid internships. Simply select 'Remote' in the location filter to find opportunities you can do from anywhere."
    },
    {
      q: "What types of internships are available?",
      a: "We have internships across 20+ domains including Software Development, Data Science, UI/UX, Marketing, Finance, HR, and more. Both paid and unpaid opportunities are clearly marked."
    },
    {
      q: "How do I apply for internships?",
      a: "Simply create your free profile, search for internships by role or location, and click 'Quick Apply'. Your profile information is automatically shared with the company. It takes less than 30 seconds."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
          Everything you need to know about finding internships on Internify
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:shadow-md transition-all">
            <h3 className="font-bold text-slate-800 mb-2 flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              {faq.q}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [popularCities, setPopularCities] = useState<any[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);

  // Track page view
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-CZM79LK7MR", {
        page_path: window.location.pathname,
      })
    }
    
    trackEvent('Page Viewed', {
      page: 'homepage',
      timestamp: new Date().toISOString()
    });
  }, [])

  // Fetch dynamic city counts
  useEffect(() => {
    async function fetchCityCounts() {
      try {
        const response = await fetch('/api/city-counts');
        const data = await response.json();
        setPopularCities(data);
      } catch (error) {
        console.error("Error fetching city counts:", error);
        // Fallback - show cities without counts
        const fallbackCities = [
          "Bangalore", "Mumbai", "Remote", "Delhi NCR", "Pune", "Hyderabad", 
          "Chennai", "Bhubaneswar", "Kolkata", "Jaipur", "Lucknow", "Ahmedabad"
        ];
        setPopularCities(fallbackCities.map(city => ({
          city: city,
          count: 0,
          seoUrl: `/internships/location/${city.toLowerCase().replace(/\s+/g, '')}`
        })));
      } finally {
        setLoadingCities(false);
      }
    }
    fetchCityCounts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    trackEvent('Search Performed', {
      query: searchQuery,
      location: location,
      timestamp: new Date().toISOString()
    });
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/internships?${params.toString()}`);
  };

  // Updated: Direct SEO URLs instead of query search
  const quickTags = [
    { name: "Frontend Dev", icon: <Braces size={14} />, seoUrl: "/internships/role/software-development" },
    { name: "Data Analyst", icon: <BarChart3 size={14} />, seoUrl: "/internships/role/data-analyst" },
    { name: "UI/UX Design", icon: <Palette size={14} />, seoUrl: "/internships/role/ui-ux-design" },
    { name: "Marketing", icon: <Megaphone size={14} />, seoUrl: "/internships/role/marketing" },
    { name: "Finance", icon: <Landmark size={14} />, seoUrl: "/internships/role/finance" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* ─── HEADER ───────────────────────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/Internify.png" 
              alt="Internify Logo"
              width={200} 
              height={45}
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link href="/internships" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Internships</Link>
             <Link href="/community" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Learning Journey</Link>
            <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-2">
            {!session ? (
              <>
                <Link href="/auth/signin" className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">Sign In</Link>
                <Link href="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0">Get Started — Free</Link>
              </>
            ) : (
              <div className="ml-2">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white pt-14 pb-8 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl" />
            <div className="absolute top-10 right-1/4 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse inline-block" />
              🚀 Now Live · Verified Internships Added Daily
            </div>

            <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-[60px] font-black text-slate-900 mb-5 tracking-tight leading-[1.08]">
              Find Internships in India 2026 That{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Actually Hire</span> Students
            </h1>

            <p className="text-slate-600 text-base sm:text-lg mb-7 max-w-2xl mx-auto leading-relaxed">
              Land your dream role with hand-picked, verified internships from real companies.{" "}
              <span className="text-green-600 font-semibold">No spam, no ghost jobs, 100% free</span>. Search by role or city and apply in minutes.
            </p>

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="max-w-4xl mx-auto bg-white border-2 border-slate-200 hover:border-blue-300 focus-within:border-blue-400 shadow-xl shadow-slate-200/60 rounded-2xl flex flex-col sm:flex-row items-stretch p-2 mb-6 transition-all duration-200"
              role="search"
              aria-label="Search internships"
            >
              <div className="flex flex-1 items-center px-4 py-3 gap-2 border-b sm:border-b-0 sm:border-r border-slate-100 min-w-0">
                <Search className="w-5 h-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Role (e.g. Frontend, Data Analyst)"
                  className="w-full outline-none text-sm sm:text-base text-slate-800 font-medium placeholder:text-slate-400 bg-transparent truncate"
                  aria-label="Search by internship role or keyword"
                />
              </div>
              <div className="flex flex-1 items-center px-4 py-3 gap-2 min-w-0">
                <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, Remote, Mumbai"
                  className="w-full outline-none text-sm sm:text-base text-slate-800 font-medium placeholder:text-slate-400 bg-transparent truncate"
                  aria-label="Search by internship location"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 m-1 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 whitespace-nowrap"
                aria-label="Search for internships"
              >
                Search →
              </button>
            </form>

            {/* Popular Roles with Direct SEO URLs */}
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
              <span className="text-slate-600 font-medium">Popular Roles:</span>
              {quickTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={tag.seoUrl}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 text-slate-600 px-3 py-1.5 rounded-full font-medium transition-all"
                  aria-label={`Browse ${tag.name} internships`}
                >
                  {tag.icon}
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Internships Component */}
        <HomeTrendingInternships />
        
        <HowItWorks />
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-700">
          <StatsSection />
        </div>

        {/* ─── POPULAR DOMAINS SECTION ────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1.5">Explore by Field</p>
              <h2 className="text-3xl font-black text-slate-900">Popular Domains for Internships</h2>
              <p className="text-slate-600 text-sm mt-1.5">Pick what you're passionate about and start exploring</p>
            </div>
            <Link href="/internships" className="flex items-center gap-1.5 text-blue-600 text-sm font-bold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all whitespace-nowrap">View All Internships <ChevronRight size={15} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard title="Software Development" subtitle="Web, Mobile, Backend" icon={<Code className="w-5 h-5 text-white" />} color="bg-gradient-to-br from-blue-500 to-blue-700" span="lg:col-span-2" seoUrl="/internships/role/software-development" />
            <CategoryCard title="Data Science & AI" subtitle="Analytics, ML, SQL" icon={<Database className="w-5 h-5 text-white" />} color="bg-gradient-to-br from-indigo-500 to-indigo-700" seoUrl="/internships/role/data-analyst" />
            <CategoryCard title="UI/UX Design" subtitle="UI/UX, Branding, Figma" icon={<PenTool className="w-5 h-5 text-white" />} color="bg-gradient-to-br from-purple-500 to-purple-700" seoUrl="/internships/role/ui-ux-design" />
            <CategoryCard title="Finance & Accounting" subtitle="Analysis, Accounting" icon={<TrendingUp className="w-5 h-5 text-white" />} color="bg-gradient-to-br from-emerald-500 to-emerald-700" seoUrl="/internships/role/finance" />
            <CategoryCard title="Digital Marketing" subtitle="Growth, SEO, Content" icon={<Zap className="w-5 h-5 text-white" />} color="bg-gradient-to-br from-orange-500 to-orange-700" seoUrl="/internships/role/marketing" />
            <CategoryCard title="Business Operations" subtitle="Strategy, Operations" icon={<Building2 className="w-5 h-5 text-white" />} color="bg-gradient-to-br from-slate-500 to-slate-700" seoUrl="/internships/role/business-operations" />
            <CategoryCard title="Human Resources" subtitle="Talent, Culture, Recruiting" icon={<Users className="w-5 h-5 text-white" />} color="bg-gradient-to-br from-pink-500 to-pink-700" seoUrl="/internships/role/human-resources" />
          </div>
        </section>

        {/* ─── POPULAR CITIES SECTION (Dynamic Counts) ────────────────────────── */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-1.5">Find Your Location</p>
              <h2 className="text-3xl font-black text-slate-900">Popular Cities for Internships</h2>
              <p className="text-slate-600 text-sm mt-1.5 max-w-2xl mx-auto">Discover internship opportunities in your preferred city</p>
            </div>
            {loadingCities ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl text-center border border-slate-200 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popularCities.map((city) => (
                  <CityCard key={city.city} city={city.city} count={city.count} seoUrl={city.seoUrl} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* WHY INTERNIFY SECTION */}
        <section className="bg-gradient-to-b from-white to-slate-50/80 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Why Students Trust Us</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Built for Students. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Powered by Trust.</span>
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto">
                We built Internify to end the cycle of ghost listings, spam applications, and paywalled opportunities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Shield className="w-5 h-5 text-white" />, gradient: "from-blue-600 to-blue-500", tag: "Verified", title: "Carefully Reviewed Listings", desc: "Every internship is manually verified before publishing.", highlight: "100% genuine opportunities" },
                { icon: <Zap className="w-5 h-5 text-white" />, gradient: "from-emerald-600 to-teal-500", tag: "Real-time", title: "Only Active Openings", desc: "Listings are automatically removed when positions close.", highlight: "Zero ghost listings. Zero wasted effort." },
                { icon: <Heart className="w-5 h-5 text-white" />, gradient: "from-purple-600 to-pink-500", tag: "Free Forever", title: "100% Free, Always", desc: "No pay-to-apply, no premium tiers, no hidden fees.", highlight: "We charge companies, not students." },
              ].map((card, idx) => (
                <div key={idx} className="group bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="relative z-10 mb-2"><span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{card.tag}</span></div>
                  <div className="relative z-10 mb-3"><div className={`w-10 h-10 bg-gradient-to-br ${card.gradient} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-all`}>{card.icon}</div></div>
                  <div><h3 className="text-sm font-bold text-gray-900">{card.title}</h3><p className="text-gray-500 text-xs leading-relaxed mt-1">{card.desc}</p><p className="text-xs font-semibold text-blue-600 mt-2">{card.highlight}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ />

        {/* FOOTER */}
        <footer className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-10 pb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8">
              <div className="col-span-2 lg:col-span-4 space-y-3">
                <Link href="/" className="flex items-center">
                  <Image 
                    src="/Internify.png" 
                    alt="Internify Logo"
                    width={200} 
                    height={45}
                    priority
                  />
                </Link>
                <p className="text-sm text-slate-800 leading-relaxed max-w-xs">Internify helps students discover genuine internships and connect with verified companies — making the internship search simple, transparent, and completely free.</p>
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Follow us on</p>
                  <div className="flex gap-2">
                    <a href="https://www.linkedin.com/company/join-internify/" target="_blank" rel="noopener noreferrer" aria-label="Follow Internify on LinkedIn" className="w-9 h-9 bg-slate-50 text-slate-500 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-lg flex items-center justify-center transition-all">
                      <Linkedin size={15} aria-hidden="true" /><span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://www.instagram.com/internify.in/" target="_blank" rel="noopener noreferrer" aria-label="Follow Internify on Instagram" className="w-9 h-9 bg-slate-50 text-slate-500 border border-slate-200 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 rounded-lg flex items-center justify-center transition-all">
                      <Instagram size={15} aria-hidden="true" /><span className="sr-only">Instagram</span>
                    </a>
                    <a href="https://x.com/internify83656" target="_blank" rel="noopener noreferrer" aria-label="Follow Internify on Twitter" className="w-9 h-9 bg-slate-50 text-slate-500 border border-slate-200 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 rounded-lg flex items-center justify-center transition-all">
                      <Twitter size={15} aria-hidden="true" /><span className="sr-only">Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-slate-900 font-bold text-sm mb-4">For Students</h4>
                <ul className="space-y-2.5 text-sm text-slate-500">
                  <li><Link href="/internships" className="hover:text-blue-600 transition-colors">Internships</Link></li>
                  <li><Link href="/internships/location/remote" className="hover:text-blue-600 transition-colors">Remote Internships</Link></li>
                  <li><Link href="/resources" className="hover:text-blue-600 transition-colors">Career Resources</Link></li>
                </ul>
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-slate-900 font-bold text-sm mb-4">Company</h4>
                <ul className="space-y-2.5 text-sm text-slate-500">
                  <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                  <li><Link href="/mission" className="hover:text-blue-600 transition-colors">Our Mission</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                  <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
              <div className="lg:col-span-4">
                <h4 className="text-slate-900 font-bold text-sm mb-4">Get in Touch</h4>
                <a href="mailto:internifyhelp@gmail.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors" aria-label="Email Internify support">
                  <Mail size={13} className="flex-shrink-0" aria-hidden="true" /> internifyhelp@gmail.com
                </a>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-5 pb-6">
              <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-500 text-center">
                <span>© {new Date().getFullYear()} Internify Pvt. Ltd. · All rights reserved.</span>
                <div className="flex items-center gap-1.5"><span>Made with</span><Heart size={10} className="text-red-500 fill-red-500 animate-pulse" aria-hidden="true" /><span>in India 🇮🇳</span></div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}