export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  tag: string;
  tagColor: string;
  keywords: string[];
  skills: string[];
  companies: string[];
  seoTitle: string;
  seoDescription: string;
};

export const categories: Category[] = [
  {
    id: "investment-banking",
    title: "Investment Banking",
    slug: "investment-banking",
    description: "M&A, IPOs, deal execution",
    longDescription: "Investment banking internships offer hands-on experience in mergers & acquisitions, IPOs, and corporate finance deals. Work with top banks and boutique firms on live transactions.",
    icon: "TrendingUp",
    tag: "Most Competitive",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    keywords: ["investment banking", "M&A", "IPO", "deal execution", "corporate finance", "valuation"],
    skills: ["Financial Modeling", "Valuation", "Excel", "Pitch Books", "DCF", "M&A"],
    companies: ["Goldman Sachs", "Morgan Stanley", "JP Morgan", "Avendus", "JM Financial"],
    seoTitle: "Investment Banking Internships 2026 | M&A, IPO, Deal Execution",
    seoDescription: "Find top investment banking internships in 2026. Work on M&A deals, IPOs, and corporate finance transactions."
  },
  {
    id: "equity-research",
    title: "Equity Research",
    slug: "equity-research",
    description: "Fundamental analysis, sector reports",
    longDescription: "Equity research internships provide deep exposure to financial analysis, sector research, and investment thesis development.",
    icon: "BarChart3",
    tag: "High Demand",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    keywords: ["equity research", "fundamental analysis", "sector reports", "stock analysis"],
    skills: ["Financial Analysis", "Report Writing", "Excel", "Bloomberg", "Valuation"],
    companies: ["Motilal Oswal", "Edelweiss", "HDFC Securities", "ICICI Securities", "Axis Capital"],
    seoTitle: "Equity Research Internships 2026 | Fundamental Analysis",
    seoDescription: "Find equity research internships at top brokerages and AMCs."
  },
  {
    id: "fintech",
    title: "FinTech",
    slug: "fintech",
    description: "Payments, lending, trading platforms",
    longDescription: "FinTech internships place you at the intersection of finance and technology.",
    icon: "Zap",
    tag: "Fastest Growing",
    tagColor: "bg-green-50 text-green-700 border-green-200",
    keywords: ["fintech", "payments", "lending", "trading platforms"],
    skills: ["Product Management", "Data Analysis", "SQL", "Python", "Business Analysis"],
    companies: ["Paytm", "PhonePe", "Razorpay", "Zerodha", "CRED", "Groww"],
    seoTitle: "FinTech Internships 2026 | Payments & Lending",
    seoDescription: "Find FinTech internships at top startups and companies."
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    slug: "financial-analyst",
    description: "FP&A, budgeting, forecasting",
    longDescription: "Financial Analyst internships offer experience in financial planning & analysis, budgeting, and forecasting.",
    icon: "Briefcase",
    tag: "Entry Friendly",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    keywords: ["financial analyst", "FP&A", "budgeting", "forecasting"],
    skills: ["Excel", "Financial Analysis", "Budgeting", "Forecasting", "Variance Analysis"],
    companies: ["Amazon", "Microsoft", "Unilever", "Tata Group", "Reliance"],
    seoTitle: "Financial Analyst Internships 2026 | FP&A",
    seoDescription: "Find financial analyst internships in FP&A, budgeting, and forecasting."
  },
  {
    id: "ca-articleship",
    title: "CA Articleship",
    slug: "ca-articleship",
    description: "Audit, taxation, compliance",
    longDescription: "CA Articleship opportunities with ICAI approved firms in audit, taxation, and compliance.",
    icon: "Award",
    tag: "ICAI Approved",
    tagColor: "bg-orange-50 text-orange-700 border-orange-200",
    keywords: ["CA articleship", "audit", "taxation", "compliance", "ICAI", "GST"],
    skills: ["Audit", "Taxation", "GST", "Accounting Standards", "Excel"],
    companies: ["Deloitte", "PwC", "EY", "KPMG", "BDO", "Grant Thornton"],
    seoTitle: "CA Articleship 2026 | ICAI Approved",
    seoDescription: "Find CA Articleship opportunities with ICAI approved firms."
  },
  {
    id: "risk-compliance",
    title: "Risk & Compliance",
    slug: "risk-compliance",
    description: "Credit risk, market risk",
    longDescription: "Risk & Compliance internships provide exposure to credit risk, market risk, and regulatory compliance.",
    icon: "Shield",
    tag: "Banking Sector",
    tagColor: "bg-red-50 text-red-700 border-red-200",
    keywords: ["risk management", "compliance", "credit risk", "market risk"],
    skills: ["Risk Analysis", "Regulatory Knowledge", "Excel", "SQL", "Internal Controls"],
    companies: ["HDFC Bank", "ICICI Bank", "Axis Bank", "SBI", "Kotak Mahindra"],
    seoTitle: "Risk & Compliance Internships 2026 | Banking",
    seoDescription: "Find risk management and compliance internships at top banks."
  },
  {
    id: "corporate-finance",
    title: "Corporate Finance",
    slug: "corporate-finance",
    description: "Treasury, capital structure",
    longDescription: "Corporate Finance internships offer exposure to treasury operations and working capital management.",
    icon: "Building2",
    tag: "Corporates",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    keywords: ["corporate finance", "treasury", "capital structure"],
    skills: ["Financial Analysis", "Treasury", "Excel", "Cash Flow", "Capital Budgeting"],
    companies: ["Tata Motors", "Mahindra", "Aditya Birla", "L&T", "Infosys"],
    seoTitle: "Corporate Finance Internships 2026 | Treasury",
    seoDescription: "Find corporate finance internships in treasury and working capital."
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    slug: "portfolio-management",
    description: "Asset allocation, fund management",
    longDescription: "Portfolio Management internships with PMS and AMC firms. Learn asset allocation and portfolio construction.",
    icon: "PieChart",
    tag: "PMS & AMC",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    keywords: ["portfolio management", "asset allocation", "fund management", "PMS"],
    skills: ["Portfolio Theory", "Asset Allocation", "Excel", "Bloomberg", "Investment Analysis"],
    companies: ["SBI Mutual Fund", "HDFC AMC", "ICICI Prudential", "Motilal Oswal PMS"],
    seoTitle: "Portfolio Management Internships 2026 | PMS & AMC",
    seoDescription: "Find portfolio management internships with top PMS and AMC firms."
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map(cat => cat.slug);
}
