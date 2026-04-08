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
  Braces, BarChart3, Palette, Megaphone, Landmark, CheckCircle, Clock, Award, Globe
} from "lucide-react";
import Link from "next/link";

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

// ─── City Card Component (NO COUNTS) ─────────────────────────────────────────
const CityCard = ({ city, seoUrl }: { city: string; seoUrl: string }) => (
  <Link href={seoUrl} className="bg-white p-4 rounded-xl text-center hover:shadow-lg transition-all border border-slate-200 hover:border-green-300 group">
    <MapPin size={24} className="mx-auto text-green-500 mb-2 group-hover:scale-110 transition-transform" />
    <h3 className="font-semibold text-slate-800 text-sm">{city}</h3>
    <p className="text-xs text-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View →</p>
  </Link>
);

// ─── FAQ Component ───────────────────────────────────────────────────────────
const FAQ = () => {
  const faqs = [
    {
      q: "What is Internify and how does it work?",
      a: "Internify is a free internship marketplace that connects students with verified companies. We charge companies to post internships, so students never pay. Search by role or location, then click 'Quick Apply' to submit your profile in under 30 seconds."
    },
    {
      q: "Are the internships on Internify really manually reviewed?",
      a: "Yes, as of April 2026, 100% of listings undergo a manual review by our team before going live. We verify company legitimacy, role clarity, and safety compliance. Average review time is 4 hours from submission to approval."
    },
    {
      q: "Is Internify really free for students?",
      a: "Yes, Internify is 100% free for students. We never charge for applications, resume downloads, or access to listings. Companies pay to post, not students to apply. No premium tiers or hidden fees exist currently."
    },
    {
      q: "How often are new internships posted?",
      a: "We add new verified internships daily, Monday through Friday. On average, you'll see 50-75 new opportunities every day. Peak seasons (summer and winter breaks) see up to 150+ daily listings."
    },
    {
      q: "Can I find remote internships on Internify?",
      a: "Yes! Use the 'Remote' filter in the location dropdown menu to find work-from-home opportunities. Many companies offer remote, hybrid, or flexible internships. Simply select 'Remote' to see nationwide opportunities."
    },
    {
      q: "What types of internships are available?",
      a: "We currently feature internships across 24 domains including Software Development, Data Science, UI/UX Design, Digital Marketing, Finance, HR, Business Operations, Content Writing, and more. Top categories by volume: Software Development (35%), Marketing (20%), and Data Analytics (15%)."
    },
    {
      q: "How do I know if an internship is paid or unpaid?",
      a: "Both paid and unpaid opportunities are clearly marked with 💰 (paid) or 📚 (unpaid/educational) icons next to each listing. Paid internships show stipend amounts when available. Check your local jurisdiction for unpaid internship regulations."
    },
    {
      q: "How does the Quick Apply process work?",
      a: "Click 'Quick Apply' on any internship, and your Internify profile (education, skills, experience) is automatically shared with the company. The average application takes 25-30 seconds. Some companies may add 1-2 screening questions."
    },
    {
      q: "What happens after I apply?",
      a: "Your application is sent directly to the company's hiring team. Most companies respond within 5-7 business days. You can track all your applications in your dashboard under 'My Applications'."
    },
    {
      q: "How does Internify verify companies?",
      a: "We verify companies through email domain validation, LinkedIn cross-referencing, and manual checks of their hiring history. Companies with verified badges have completed our enhanced screening process."
    },
    {
      q: "Can I apply to international internships?",
      a: "Currently, Internify focuses on India-based internships. Use the 'Remote' filter for nationwide opportunities. International listings are clearly marked and require work authorization."
    },
    {
      q: "What should I do if I find a suspicious listing?",
      a: "Report any suspicious listing immediately using the 'Report' button on the internship card. Our safety team reviews all reports within 24 hours. See our Safety Guidelines for more details."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="faq-heading">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
          <span className="text-sm font-medium text-blue-700">💡 Got Questions? We've Got Answers</span>
        </div>
        <h2 id="faq-heading" className="text-3xl font-black text-slate-900">Frequently Asked Questions About Internify</h2>
        <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
          Everything you need to know about finding verified internships on Internify — from application tips to safety policies
        </p>
      </div>
      
      <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-sm font-semibold text-slate-700 mb-3">Jump to a question:</p>
        <div className="flex flex-wrap gap-2">
          {faqs.slice(0, 6).map((faq, idx) => (
            <a 
              key={idx} 
              href={`#faq-${idx}`}
              className="text-xs bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 px-3 py-1.5 rounded-full transition-all"
            >
              {faq.q.substring(0, 35)}...
            </a>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            id={`faq-${idx}`}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all scroll-mt-24"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <h3 className="font-bold text-slate-800 mb-3 flex items-start gap-2 text-base" itemProp="name">
              <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              {faq.q}
            </h3>
            <div className="text-slate-600 text-sm leading-relaxed pl-6" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div itemProp="text">
                <p>{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <p className="text-slate-700 text-sm">
          Still have questions? <a href="/contact" className="text-blue-600 font-semibold hover:underline">Contact our support team</a> — we typically respond within 24 hours.
        </p>
      </div>
    </section>
  );
};

// Define the City interface (no count)
interface City {
  city: string;
  seoUrl: string;
}

// Fallback cities data with accurate URLs (no counts)
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
  { city: "Ahmedabad", seoUrl: "/internships/location/ahmedabad" }
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [popularCities, setPopularCities] = useState<City[]>(FALLBACK_CITIES);
  const [loadingCities, setLoadingCities] = useState(true);

  // Track page view - Google Analytics only
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-CZM79LK7MR", {
        page_path: window.location.pathname,
      })
    }
    
    // Add FAQ schema dynamically
    const addFAQSchema = () => {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Internify and how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Internify is a free internship marketplace that connects students with verified companies. We charge companies to post internships, so students never pay. Search by role or location, then click 'Quick Apply' to submit your profile in under 30 seconds."
            }
          },
          {
            "@type": "Question",
            "name": "Are the internships on Internify really manually reviewed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, as of April 2026, 100% of listings undergo a manual review by our team before going live. We verify company legitimacy, role clarity, and safety compliance. Average review time is 4 hours from submission to approval."
            }
          },
          {
            "@type": "Question",
            "name": "Is Internify really free for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Internify is 100% free for students. We never charge for applications, resume downloads, or access to listings. Companies pay to post, not students to apply. No premium tiers or hidden fees exist currently."
            }
          }
        ]
      };
      
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    };
    
    addFAQSchema();
  }, [])

  // Fetch dynamic city data
  useEffect(() => {
    async function fetchCityData() {
      try {
        const response = await fetch('/api/city-counts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const validCities = data.filter((item: any) => 
            item && typeof item === 'object' && 
            typeof item.city === 'string' && 
            typeof item.seoUrl === 'string'
          ).map((item: any) => ({
            city: item.city,
            seoUrl: item.seoUrl
          }));
          
          if (validCities.length > 0) {
            setPopularCities(validCities);
          } else {
            console.warn("API returned invalid city data, using fallback");
            setPopularCities(FALLBACK_CITIES);
          }
        } else {
          console.warn("API did not return an array, using fallback data");
          setPopularCities(FALLBACK_CITIES);
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
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
    if (location.trim()) params.set("location", location.trim());
    router.push(`/internships?${params.toString()}`);
  };

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
          <Link href="/" className="flex items-center" aria-label="Internify Home">
            <Image 
              src="/Internify.png" 
              alt="Internify Logo - Free Internship Platform for Students"
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
              🚀 50-75 New Verified Internships Added Daily
            </div>

            <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-[60px] font-black text-slate-900 mb-5 tracking-tight leading-[1.08]">
              Find Verified Internships in India 2026 That{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Actually Hire Students</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg mb-7 max-w-2xl mx-auto leading-relaxed">
              Land your dream role with hand-picked, manually verified internships from real companies.{" "}
              <span className="text-green-600 font-semibold">100% free. No spam. No ghost jobs.</span> Search by role or city and apply in under 30 seconds.
            </p>

            {/* SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="max-w-4xl mx-auto bg-white border-2 border-slate-200 hover:border-blue-300 focus-within:border-blue-400 shadow-xl shadow-slate-200/60 rounded-2xl flex flex-col sm:flex-row items-stretch p-2 mb-6 transition-all duration-200"
              role="search"
              aria-label="Search for internships by role or location"
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
                aria-label="Search for internships now"
              >
                Search Internships →
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
              <p className="text-slate-600 text-sm mt-1.5">24+ domains with 1000+ active opportunities</p>
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

        {/* ─── POPULAR CITIES SECTION (NO COUNTS) ────────────────────────────── */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-1.5">Find Your Location</p>
              <h2 className="text-3xl font-black text-slate-900">Popular Cities for Internships</h2>
              <p className="text-slate-600 text-sm mt-1.5 max-w-2xl mx-auto">Discover internship opportunities in your preferred city — remote options available nationwide</p>
            </div>
            {loadingCities ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl text-center border border-slate-200 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.isArray(popularCities) && popularCities.map((city, index) => (
                  <CityCard key={index} city={city.city} seoUrl={city.seoUrl} />
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
                Built for Students. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Powered by Manual Verification.</span>
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto">
                We built Internify to end ghost listings, spam applications, and paywalled opportunities. Every feature is designed with students first.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Shield className="w-5 h-5 text-white" />, gradient: "from-blue-600 to-blue-500", tag: "Manual Review", title: "Every Listing Verified", desc: "100% of internships are manually reviewed before publishing (avg. 4 hours).", highlight: "No ghost jobs. No fake companies." },
                { icon: <Clock className="w-5 h-5 text-white" />, gradient: "from-emerald-600 to-teal-500", tag: "Daily Updates", desc: "50-75 new verified internships added Monday-Friday. Peak seasons see 150+ daily.", highlight: "Fresh opportunities every morning." },
                { icon: <Heart className="w-5 h-5 text-white" />, gradient: "from-purple-600 to-pink-500", tag: "100% Free", desc: "No premium tiers, no pay-to-apply, no hidden fees. Ever.", highlight: "We charge companies, not students." },
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

        {/* FAQ SECTION */}
        <FAQ />

        {/* FOOTER */}
        <footer className="bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-10 pb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8">
              <div className="col-span-2 lg:col-span-4 space-y-3">
                <Link href="/" className="flex items-center" aria-label="Internify Home">
                  <Image 
                    src="/Internify.png" 
                    alt="Internify Logo - Free Verified Internship Platform for Students"
                    width={200} 
                    height={45}
                    priority
                  />
                </Link>
                <p className="text-sm text-slate-800 leading-relaxed max-w-xs">Internify helps students discover genuine, manually verified internships and connect with legitimate companies — making the internship search simple, transparent, and completely free.</p>
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
                      <Twitter size={15} aria-hidden="true" /><span className="sr-only">Twitter (X)</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-slate-900 font-bold text-sm mb-4">For Students</h4>
                <ul className="space-y-2.5 text-sm text-slate-500">
                  <li><Link href="/internships" className="hover:text-blue-600 transition-colors">All Internships</Link></li>
                  <li><Link href="/internships/location/remote" className="hover:text-blue-600 transition-colors">Remote Internships</Link></li>
                  <li><Link href="/internships?paid=true" className="hover:text-blue-600 transition-colors">Paid Internships</Link></li>
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
                  <li><Link href="/safety" className="hover:text-blue-600 transition-colors">Safety Guidelines</Link></li>
                </ul>
              </div>
              <div className="lg:col-span-4">
                <h4 className="text-slate-900 font-bold text-sm mb-4">Get in Touch</h4>
                <a href="mailto:internifyhelp@gmail.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors" aria-label="Email Internify support">
                  <Mail size={13} className="flex-shrink-0" aria-hidden="true" /> internifyhelp@gmail.com
                </a>
                <p className="text-xs text-slate-400 mt-3">Response within 24 hours</p>
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