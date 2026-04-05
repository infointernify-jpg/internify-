import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  MapPin, Clock, Wallet, Briefcase, Building2, 
  Search, CheckCircle, X, Rocket, SlidersHorizontal
} from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";

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
    { name: "All", value: "", icon: "🌍" },
    { name: "Remote", value: "Remote", icon: "🏠" },
    { name: "On-site", value: "On-site", icon: "🏢" },
    { name: "Hybrid", value: "Hybrid", icon: "🔄" },
  ];

  const locations = [
    { name: "Bangalore", value: "Bangalore", icon: "🏙️" },
    { name: "Mumbai", value: "Mumbai", icon: "🌆" },
    { name: "Remote", value: "Remote", icon: "🏠" },
    { name: "Delhi", value: "Delhi", icon: "🏛️" },
    { name: "Hyderabad", value: "Hyderabad", icon: "💎" },
    { name: "Pune", value: "Pune", icon: "📚" },
    { name: "Chennai", value: "Chennai", icon: "🏖️" },
  ];

  const getFilterUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as any);
    if (value === "All" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    return `/internships${query ? `?${query}` : ''}`;
  };

  const clearFilters = () => "/internships";

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          
          {/* Title + Search Row */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Find Your Internship</h1>
              <p className="text-xs text-gray-500">{internships.length} opportunities available</p>
            </div>
            
            <form action="/internships" method="GET" className="w-64">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  type="text"
                  name="search"
                  defaultValue={searchParams.search || ''}
                  placeholder="Search..."
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>

          {/* Stats Chips */}
          <div className="flex gap-2 mb-3">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded-full">
              <Briefcase size={10} className="text-blue-500" />
              <span className="text-xs text-blue-600">{internships.length}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-full">
              <Building2 size={10} className="text-purple-500" />
              <span className="text-xs text-purple-600">{totalCompanies}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full">
              <CheckCircle size={10} className="text-green-500" />
              <span className="text-xs text-green-600">{internships.filter(i => i.verified).length}</span>
            </div>
          </div>

          {/* Filter Area - Reduced Size */}
          <div className="bg-gray-50 rounded-lg p-2.5">
            
            {/* Category Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="text-[11px] text-gray-500 w-14">Category:</span>
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={getFilterUrl('category', cat.value)}
                    className={`px-1.5 py-0.5 text-[11px] rounded transition ${
                      (searchParams.category === cat.value) || (cat.value === "" && !searchParams.category)
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span className="mr-0.5 text-[10px]">{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Work Mode Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="text-[11px] text-gray-500 w-14">Mode:</span>
              <div className="flex flex-wrap gap-1">
                {workModes.map((mode) => (
                  <Link
                    key={mode.name}
                    href={getFilterUrl('mode', mode.value)}
                    className={`px-1.5 py-0.5 text-[11px] rounded transition ${
                      (searchParams.mode === mode.value) || (mode.value === "" && !searchParams.mode)
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span className="mr-0.5 text-[10px]">{mode.icon}</span>
                    {mode.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Location Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="text-[11px] text-gray-500 w-14">Location:</span>
              <div className="flex flex-wrap gap-1">
                {locations.slice(0, 6).map((loc) => (
                  <Link
                    key={loc.name}
                    href={getFilterUrl('location', loc.value)}
                    className={`px-1.5 py-0.5 text-[11px] rounded transition ${
                      searchParams.location === loc.value
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span className="mr-0.5 text-[10px]">{loc.icon}</span>
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stipend Row */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-gray-500 w-14">Stipend:</span>
              <div className="flex flex-wrap gap-1">
                <Link
                  href={getFilterUrl('type', 'Paid')}
                  className={`px-1.5 py-0.5 text-[11px] rounded transition ${
                    searchParams.type === 'Paid'
                      ? "bg-amber-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  💰 Paid
                </Link>
                <Link
                  href={getFilterUrl('type', 'Unpaid')}
                  className={`px-1.5 py-0.5 text-[11px] rounded transition ${
                    searchParams.type === 'Unpaid'
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  Unpaid
                </Link>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-1 mt-2 pt-1.5 border-t border-gray-100">
              {searchParams.category && (
                <Link href={getFilterUrl('category', '')} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full">
                  {searchParams.category} <X size={8} />
                </Link>
              )}
              {searchParams.mode && (
                <Link href={getFilterUrl('mode', '')} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] rounded-full">
                  {searchParams.mode} <X size={8} />
                </Link>
              )}
              {searchParams.location && (
                <Link href={getFilterUrl('location', '')} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] rounded-full">
                  {searchParams.location} <X size={8} />
                </Link>
              )}
              {searchParams.type && (
                <Link href={getFilterUrl('type', '')} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] rounded-full">
                  {searchParams.type} <X size={8} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Internship Listings */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        
        {internships.length > 0 ? (
          <div className="space-y-3">
            {internships.map((job: any) => (
              <div key={job.id} className="bg-white rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="p-3">
                  
                  <div className="flex gap-3">
                    <CompanyLogo companyName={job.company} logoUrl={job.companyLogo} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={`/internships/${job.id}`} className="hover:underline">
                            <h2 className="font-semibold text-gray-900 text-sm">{job.title}</h2>
                          </Link>
                          <p className="text-xs text-gray-500">{job.company}</p>
                        </div>
                        <div className="flex gap-1.5">
                          {job.applyLink && (
                            <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md">
                              Apply
                            </a>
                          )}
                          <Link href={`/internships/${job.id}`} className="px-2.5 py-1 border border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 text-xs font-medium rounded-md">
                            Details
                          </Link>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {job.workMode && (
                          <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] rounded-full">{job.workMode}</span>
                        )}
                        {job.category && (
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full">{job.category}</span>
                        )}
                        {job.verified && (
                          <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] rounded-full flex items-center gap-0.5">
                            <CheckCircle size={8} /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-gray-500">
                    {job.location && (
                      <span className="flex items-center gap-0.5"><MapPin size={10} /> {job.location}</span>
                    )}
                    {job.duration && (
                      <span className="flex items-center gap-0.5"><Clock size={10} /> {job.duration}</span>
                    )}
                    {job.stipendAmount ? (
                      <span className="flex items-center gap-0.5 text-green-600"><Wallet size={10} /> {job.stipendAmount}</span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-gray-400"><Wallet size={10} /> Unpaid</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
            <Rocket size={32} className="text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No internships found</h3>
            <p className="text-xs text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}