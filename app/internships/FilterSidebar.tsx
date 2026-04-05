import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import { 
  MapPin, Clock, Wallet, Briefcase, Building2, 
  Search, CheckCircle, Calendar,
  X, Sparkles, Rocket, RefreshCw, 
  Users, Star, Filter, ChevronDown
} from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";

// Mobile filter button component
const MobileFilterButton = () => {
  "use client";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm"
      >
        <Filter size={14} /> Filters
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 overflow-auto lg:hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          {/* Mobile filter content - simplified */}
        </div>
      )}
    </>
  );
};

// Add useState import at top
import { useState } from "react";

interface PageProps {
  searchParams: {
    category?: string;
    mode?: string;
    location?: string;
    type?: string;
    search?: string;
  };
}

export default async function InternshipsPage({ searchParams }: PageProps) {
  
  let internships: any[] = [];

  try {
    const where: any = { published: true };
    
    if (searchParams.category) where.category = searchParams.category;
    if (searchParams.mode) where.workMode = searchParams.mode;
    if (searchParams.location && searchParams.location !== "All Locations") {
      where.location = { contains: searchParams.location, mode: 'insensitive' };
    }
    if (searchParams.type === "Paid") where.stipendAmount = { not: null };
    if (searchParams.type === "Unpaid") where.stipendAmount = null;
    if (searchParams.search) {
      where.OR = [
        { title: { contains: searchParams.search, mode: 'insensitive' } },
        { company: { contains: searchParams.search, mode: 'insensitive' } },
        { description: { contains: searchParams.search, mode: 'insensitive' } },
        { skills: { has: searchParams.search } }
      ];
    }

    internships = await prisma.internship.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database error:", error);
  }

  const activeFilterCount = Object.values(searchParams).filter(v => v && v !== "All Locations" && v !== "").length;
  const totalCompanies = [...new Set(internships.map(i => i.company))].length;
  const totalVerified = internships.filter(i => i.verified).length;

  // Filter options
  const categories = [
    { name: "All", value: "", icon: "🎯" },
    { name: "Software", value: "Software", icon: "💻" },
    { name: "Data", value: "Data", icon: "📊" },
    { name: "Marketing", value: "Marketing", icon: "📢" },
    { name: "Finance", value: "Finance", icon: "💰" },
    { name: "Design", value: "Design", icon: "🎨" },
    { name: "HR", value: "HR", icon: "👥" },
  ];

  const workModes = [
    { name: "All", value: "" },
    { name: "Remote", value: "Remote" },
    { name: "On-site", value: "On-site" },
    { name: "Hybrid", value: "Hybrid" },
  ];

  const locations = [
    "Bangalore", "Mumbai", "Remote", "Delhi", "Hyderabad", "Pune", "Chennai"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header - Compact */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          
          {/* Title + Search Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Internships</h1>
              <p className="text-xs text-gray-500">{internships.length} opportunities</p>
            </div>
            
            <form action="/internships" method="GET" className="w-full sm:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchParams.search || ''}
                  placeholder="Search by title, company..."
                  className="w-full pl-9 pr-16 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
                <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-0.5 bg-blue-600 text-white text-xs rounded-md">
                  Go
                </button>
              </div>
            </form>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex gap-2">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                <Briefcase size={10} className="text-gray-500" />
                <span className="text-xs">{internships.length}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                <Building2 size={10} className="text-gray-500" />
                <span className="text-xs">{totalCompanies}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                <CheckCircle size={10} className="text-green-500" />
                <span className="text-xs">{totalVerified} verified</span>
              </div>
            </div>
            <MobileFilterButton />
          </div>

          {/* Horizontal Category Filters */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={`/internships${cat.value ? `?category=${encodeURIComponent(cat.value)}` : ''}`}
                className={`px-2.5 py-1 text-xs rounded-full transition-all ${
                  searchParams.category === cat.value || (!searchParams.category && cat.value === "")
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="mr-0.5">{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Horizontal Work Mode Filters */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-xs text-gray-400 mr-1">Mode:</span>
            {workModes.map((mode) => (
              <Link
                key={mode.value}
                href={`/internships${mode.value ? `?mode=${mode.value}` : ''}`}
                className={`px-2 py-0.5 text-xs rounded-full ${
                  searchParams.mode === mode.value || (!searchParams.mode && mode.value === "")
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {mode.name}
              </Link>
            ))}
          </div>

          {/* Horizontal Location Filters */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-xs text-gray-400 mr-1">📍</span>
            {locations.map((loc) => (
              <Link
                key={loc}
                href={`/internships?location=${encodeURIComponent(loc)}`}
                className={`px-2 py-0.5 text-xs rounded-full ${
                  searchParams.location === loc
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {loc}
              </Link>
            ))}
          </div>

          {/* Stipend Filter */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs text-gray-400 mr-1">💰</span>
            <Link
              href="/internships?type=Paid"
              className={`px-2 py-0.5 text-xs rounded-full ${
                searchParams.type === "Paid"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Paid
            </Link>
            <Link
              href="/internships?type=Unpaid"
              className={`px-2 py-0.5 text-xs rounded-full ${
                searchParams.type === "Unpaid"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Unpaid
            </Link>
            {activeFilterCount > 0 && (
              <Link
                href="/internships"
                className="px-2 py-0.5 text-xs text-red-500 hover:text-red-600 underline"
              >
                Clear all
              </Link>
            )}
          </div>

          {/* Active Filters Summary */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-gray-100">
              {Object.entries(searchParams).map(([key, value]) => {
                if (!value || key === "search") return null;
                return (
                  <Link
                    key={key}
                    href={`/internships?${new URLSearchParams(
                      Object.fromEntries(Object.entries(searchParams).filter(([k]) => k !== key))
                    ).toString()}`}
                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full"
                  >
                    {value}
                    <X size={8} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        
        {/* Results Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              <Briefcase size={12} className="inline mr-1" />
              {internships.length} internships found
            </span>
          </div>
        </div>

        {/* Internship Cards */}
        {internships.length > 0 ? (
          <div className="space-y-3">
            {internships.map((job: any) => (
              <div
                key={job.id}
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <CompanyLogo companyName={job.company} logoUrl={job.companyLogo} size="sm" />
                      <div className="flex-1">
                        <Link href={`/internships/${job.id}`} className="hover:underline">
                          <h2 className="font-semibold text-gray-900 text-sm">
                            {job.title}
                          </h2>
                        </Link>
                        <p className="text-xs text-gray-500">{job.company}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-1">
                          {job.workMode && (
                            <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                              {job.workMode}
                            </span>
                          )}
                          {job.category && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                              {job.category}
                            </span>
                          )}
                          {job.verified && (
                            <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-xs rounded-full flex items-center gap-0.5">
                              <CheckCircle size={8} /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1.5">
                      {job.applyLink && (
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md"
                        >
                          Apply
                        </a>
                      )}
                      <Link
                        href={`/internships/${job.id}`}
                        className="px-2.5 py-1 border border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 text-xs font-medium rounded-md"
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                  {job.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                      {job.description.substring(0, 120)}...
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-400">
                    {job.location && (
                      <span className="flex items-center gap-0.5">
                        <MapPin size={10} />
                        {job.location}
                      </span>
                    )}
                    {job.duration && (
                      <span className="flex items-center gap-0.5">
                        <Clock size={10} />
                        {job.duration}
                      </span>
                    )}
                    {job.stipendAmount ? (
                      <span className="flex items-center gap-0.5 text-green-600">
                        <Wallet size={10} />
                        {job.stipendAmount}
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-gray-400">
                        <Wallet size={10} />
                        Unpaid
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Rocket size={32} className="text-gray-300 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">No internships found</h3>
            <p className="text-xs text-gray-500 mb-3">Try adjusting your filters</p>
            {activeFilterCount > 0 && (
              <Link href="/internships" className="text-xs text-blue-600 hover:underline">
                Clear all filters
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}