// app/categories/investment-banking/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, IndianRupee, ArrowRight, CheckCircle, TrendingUp, Clock, Building2, Users, Search } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

// Types
type Internship = {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  logo: string;
  logoUrl?: string;
  skills: string[];
  description: string;
  isVerified: boolean;
  isClosingSoon: boolean;
  postedAt: string;
};

type CategoryData = {
  title: string;
  description: string;
  longDescription: string;
  tag: string;
  tagColor: string;
  keywords: string[];
  skills: string[];
  companies: string[];
  faqs: { question: string; answer: string }[];
};

// Category data - Investment Banking
const categoryData: CategoryData = {
  title: "Investment Banking",
  description: "M&A, IPOs, deal execution",
  longDescription: "Investment banking internships offer hands-on experience in mergers & acquisitions, IPOs, and corporate finance deals. Work with top banks and boutique firms on live transactions.",
  tag: "Most Competitive",
  tagColor: "bg-amber-50 text-amber-700 border-amber-200",
  keywords: ["investment banking", "M&A", "IPO", "deal execution", "corporate finance", "valuation", "financial modeling", "bulge bracket", "boutique investment bank"],
  skills: ["Financial Modeling", "Valuation", "Excel", "Pitch Books", "DCF", "M&A", "LBO", "Comparable Analysis"],
  companies: ["Goldman Sachs", "Morgan Stanley", "JP Morgan", "Avendus", "JM Financial", "Citi", "Bank of America", "Credit Suisse"],
  faqs: [
    { question: "What does an investment banking intern do?", answer: "Investment banking interns assist in financial modeling, creating pitch books, conducting industry research, company valuations, and supporting deal execution for M&A and capital raising transactions." },
    { question: "What skills are required for investment banking internships?", answer: "Strong financial modeling, valuation techniques (DCF, Comps, LBO), Excel proficiency, PowerPoint skills for pitch books, and understanding of corporate finance concepts." },
    { question: "What is the stipend for investment banking interns?", answer: "Investment banking internships are typically well-paid, with stipends ranging from ₹30,000 to ₹1,00,000+ per month at top firms. Bulge bracket banks often pay ₹75,000+ per month." },
    { question: "How to prepare for investment banking internship interviews?", answer: "Master financial modeling, practice valuation questions, understand recent M&A deals, prepare for technical questions on accounting and finance, and develop strong communication skills." }
  ]
};

// SEO Metadata - Dynamic for search engines
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://internify.in";
  
  return {
    title: "Investment Banking Internships 2026 | M&A, IPO, Deal Execution | Internify",
    description: "Find top investment banking internships in 2026. Work on live M&A deals, IPOs, and corporate finance transactions. Apply to Goldman Sachs, Morgan Stanley, JP Morgan and more.",
    keywords: categoryData.keywords,
    alternates: {
      canonical: `${baseUrl}/categories/investment-banking`,
    },
    openGraph: {
      title: "Investment Banking Internships 2026 | M&A, IPO, Deal Execution",
      description: "Find top investment banking internships in 2026. Work on live M&A deals, IPOs, and corporate finance transactions.",
      url: `${baseUrl}/categories/investment-banking`,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og/investment-banking.png`,
          width: 1200,
          height: 630,
          alt: "Investment Banking Internships",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Investment Banking Internships 2026 | Internify",
      description: "Find top investment banking internships. Work on M&A deals and IPOs.",
    },
  };
}

// Generate JSON-LD Schema for SEO
function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Investment Banking Internships 2026",
    "description": categoryData.longDescription,
    "url": "https://internify.in/categories/investment-banking",
    "provider": {
      "@type": "Organization",
      "name": "Internify",
      "url": "https://internify.in"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categoryData.companies.map((company, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": company,
          "description": `${company} offers investment banking internships`
        }
      }))
    }
  };
}

// Fetch internships - Replace with your actual API call
async function getInvestmentBankingInternships(): Promise<Internship[]> {
  try {
    const headersList = headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    
    // Fetch from your API - replace with actual endpoint
    const res = await fetch(`${protocol}://${host}/api/internships?category=investment-banking&limit=10`, {
      cache: "no-store", // Or use revalidate for ISR
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch internships:", error);
    return [];
  }
}

// Generate structured data for each internship
function generateInternshipSchema(internship: Internship) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": internship.title,
    "description": internship.description,
    "hiringOrganization": {
      "@type": "Organization",
      "name": internship.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": internship.location
      }
    },
    "employmentType": "INTERN",
    "datePosted": internship.postedAt || new Date().toISOString(),
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
}

export default async function InvestmentBankingPage() {
  const internships = await getInvestmentBankingInternships();
  const jsonLd = generateJsonLd();

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Individual internship schemas */}
      {internships.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(internships.map(generateInternshipSchema))
          }}
        />
      )}

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section - SEO Optimized H1 */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] text-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Breadcrumb for SEO */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/categories" className="hover:text-white">Categories</Link>
              <span>/</span>
              <span className="text-white">Investment Banking</span>
            </nav>
            
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4 ${categoryData.tagColor}`}>
              {categoryData.tag}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Investment Banking Internships 2026
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl">
              {categoryData.longDescription}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Briefcase size={18} className="text-[#10B981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{internships.length}+</p>
                  <p className="text-xs text-white/60">Active Internships</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Building2 size={18} className="text-[#10B981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{categoryData.companies.length}+</p>
                  <p className="text-xs text-white/60">Top Banks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Users size={18} className="text-[#10B981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,200+</p>
                  <p className="text-xs text-white/60">Students Placed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Internship Listings */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0A2540]">
                  Available Investment Banking Internships
                </h2>
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-500">{internships.length} opportunities</span>
                </div>
              </div>

              {internships.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Briefcase size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#0A2540] mb-2">No internships found</h3>
                  <p className="text-slate-500 mb-4">Check back soon for new investment banking opportunities!</p>
                  <Link 
                    href="/internships" 
                    className="inline-flex items-center gap-2 text-[#10B981] font-medium"
                  >
                    Browse all internships <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {internships.map((internship) => (
                    <Link 
                      key={internship.id} 
                      href={`/internships/${internship.id}`} 
                      className="block group"
                    >
                      <article className="bg-white rounded-xl border border-slate-200 hover:border-[#0A2540]/30 hover:shadow-lg transition-all duration-300 p-5">
                        <div className="flex items-start gap-4">
                          {/* Logo */}
                          <div className="w-14 h-14 bg-gradient-to-br from-[#0A2540] to-[#1a3a5c] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                            {internship.logoUrl ? (
                              <img 
                                src={internship.logoUrl} 
                                alt={internship.company}
                                className="w-10 h-10 object-contain"
                              />
                            ) : (
                              <TrendingUp size={24} className="text-white" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-bold text-[#0A2540] group-hover:text-[#10B981] transition-colors">
                                {internship.title}
                              </h3>
                              {internship.isClosingSoon && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-200 flex-shrink-0">
                                  <Clock size={10} />
                                  Closing Soon
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-medium text-slate-700">{internship.company}</span>
                              {internship.isVerified && (
                                <CheckCircle size={13} className="text-[#10B981] flex-shrink-0" />
                              )}
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <MapPin size={12} className="text-[#10B981]" />
                                {internship.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase size={12} className="text-[#10B981]" />
                                {internship.duration}
                              </span>
                              <span className="flex items-center gap-1 font-medium text-[#10B981]">
                                <IndianRupee size={12} />
                                {internship.stipend}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                              {internship.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {internship.skills?.slice(0, 4).map((skill, i) => (
                                <span 
                                  key={i}
                                  className="text-[10px] px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Skills */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0A2540] mb-4">Key Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryData.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="text-sm px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Companies */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0A2540] mb-4">Top Investment Banks Hiring</h3>
                <ul className="space-y-2">
                  {categoryData.companies.map((company, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle size={14} className="text-[#10B981] flex-shrink-0" />
                      <span>{company}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Categories - SEO Internal Linking */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0A2540] mb-4">Related Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/categories/equity-research" className="flex items-center gap-2 text-slate-600 hover:text-[#10B981] transition-colors">
                      <ArrowRight size={12} />
                      Equity Research Internships
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/corporate-finance" className="flex items-center gap-2 text-slate-600 hover:text-[#10B981] transition-colors">
                      <ArrowRight size={12} />
                      Corporate Finance Internships
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/portfolio-management" className="flex items-center gap-2 text-slate-600 hover:text-[#10B981] transition-colors">
                      <ArrowRight size={12} />
                      Portfolio Management Internships
                    </Link>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#0A2540] to-[#1a3a5c] text-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Ready to break into Investment Banking?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get personalized internship alerts and application tips for top investment banks.
                </p>
                <Link 
                  href="/auth/signup"
                  className="block w-full bg-[#10B981] hover:bg-[#059669] text-white py-2.5 rounded-lg font-medium text-sm text-center transition-all"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section - SEO Rich Content */}
          <div className="mt-12 bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-[#0A2540] mb-6">
              Frequently Asked Questions About Investment Banking Internships
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryData.faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-200 pb-4">
                  <h3 className="font-semibold text-[#0A2540] mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-500">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom SEO Content */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Looking for investment banking internships in India? Browse opportunities at Goldman Sachs, Morgan Stanley, JP Morgan, Avendus, JM Financial, and more top investment banks. 
              Gain experience in M&A, IPOs, financial modeling, valuation, and deal execution.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}