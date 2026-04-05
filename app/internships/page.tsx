import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  MapPin, Clock, Wallet, Briefcase, Building2, 
  Search, CheckCircle, X, Rocket, SlidersHorizontal,
  Calendar, Users, Award, TrendingUp, Filter, ChevronRight,
  Star, Eye, ExternalLink, User, Shield, Zap, Globe,
  Home, Briefcase as BriefcaseIcon, DollarSign, Tag, Code,
  ArrowLeft
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
    
    if (searchParams.category && searchParams.category !== "All") where.category = searchParams.category;
    if (searchParams.mode && searchParams.mode !== "All") where.workMode = searchParams.mode;
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

  const activeFilterCount = Object.values(searchParams).filter(v => v && v !== "All Locations" && v !== "" && v !== "All").length;
  const totalCompanies = [...new Set(internships.map(i => i.company))].length;
  const verifiedCount = internships.filter(i => i.verified).length;

  const categories = [
    { name: "All", value: "", icon: "🎯", color: "gray", count: internships.length },
    { name: "Data Analyst", value: "Data Analyst", icon: "📊", color: "blue", count: internships.filter(i => i.category === "Data Analyst").length },
    { name: "Software", value: "Software", icon: "💻", color: "green", count: internships.filter(i => i.category === "Software").length },
    { name: "Marketing", value: "Marketing", icon: "📢", color: "purple", count: internships.filter(i => i.category === "Marketing").length },
    { name: "Finance", value: "Finance", icon: "💰", color: "amber", count: internships.filter(i => i.category === "Finance").length },
    { name: "Design", value: "Design", icon: "🎨", color: "pink", count: internships.filter(i => i.category === "Design").length },
    { name: "HR", value: "HR", icon: "👥", color: "indigo", count: internships.filter(i => i.category === "HR").length },
  ];

  const workModes = [
    { name: "All", value: "", icon: Globe, color: "gray" },
    { name: "Remote", value: "Remote", icon: Home, color: "green" },
    { name: "On-site", value: "On-site", icon: Building2, color: "blue" },
    { name: "Hybrid", value: "Hybrid", icon: Zap, color: "purple" },
  ];

  const locations = [
    { name: "All Locations", value: "", icon: "🌍" },
    { name: "Remote", value: "Remote", icon: "🏠" },
    { name: "Bangalore", value: "Bangalore", icon: "🏙️" },
    { name: "Mumbai", value: "Mumbai", icon: "🌆" },
    { name: "Delhi", value: "Delhi", icon: "🏛️" },
    { name: "Hyderabad", value: "Hyderabad", icon: "💎" },
    { name: "Chennai", value: "Chennai", icon: "🏖️" },
    { name: "Pune", value: "Pune", icon: "📚" },
  ];

  const getFilterUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as any);
    if (value === "All" || value === "" || value === "All Locations") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    return `/internships${query ? `?${query}` : ''}`;
  };

  const clearFilters = () => "/internships";

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string; border: string }> = {
      blue: { bg: "bg-blue-50", text: "text-blue-700", hover: "hover:bg-blue-100", border: "border-blue-200" },
      green: { bg: "bg-green-50", text: "text-green-700", hover: "hover:bg-green-100", border: "border-green-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-700", hover: "hover:bg-purple-100", border: "border-purple-200" },
      amber: { bg: "bg-amber-50", text: "text-amber-700", hover: "hover:bg-amber-100", border: "border-amber-200" },
      pink: { bg: "bg-pink-50", text: "text-pink-700", hover: "hover:bg-pink-100", border: "border-pink-200" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-700", hover: "hover:bg-indigo-100", border: "border-indigo-200" },
      gray: { bg: "bg-gray-50", text: "text-gray-700", hover: "hover:bg-gray-100", border: "border-gray-200" },
    };
    return colors[color] || colors.gray;
  };

  // Function to truncate description to exactly 2 lines (approx 120 chars)
  const truncateDescription = (description: string, maxLength: number = 120) => {
    if (!description) return "";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
      {/* Hero Section with Back Button Inside */}
      <div className="relative bg-gradient-to-r from-[#8B6BA3] via-[#BDA6CE] to-[#D4B8E8] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl"></div>
        
        {/* Back Button - Positioned at top left inside banner */}
        <div className="relative max-w-7xl mx-auto px-4 pt-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-lg text-white transition-all duration-200 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Internship
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8">
              Launch your career with top companies and exciting opportunities
            </p>
          </div>
          
          <form action="/internships" method="GET" className="max-w-3xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#BDA6CE] transition-colors" size={20} />
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search || ''}
                placeholder="Search by title, company, skills, or location..."
                className="w-full pl-12 pr-32 py-3.5 bg-white text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#BDA6CE] shadow-lg transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-1.5 bg-gradient-to-r from-[#8B6BA3] to-[#BDA6CE] text-white text-sm font-medium rounded-lg hover:from-[#7A5A92] hover:to-[#A896C8] transition shadow-md">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Filter size={16} className="text-[#BDA6CE]" />
                    Filters
                  </h3>
                  {activeFilterCount > 0 && (
                    <button onClick={() => window.location.href = clearFilters()} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                      <X size={12} /> Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Tag size="1rem" className="text-[#BDA6CE]" />
                    Category
                  </h3>
                </div>
                <div className="p-2 space-y-1">
                  {categories.map((cat) => {
                    const colors = getColorClasses(cat.color);
                    const isActive = (searchParams.category === cat.value) || (cat.value === "" && !searchParams.category);
                    return (
                      <Link
                        key={cat.name}
                        href={getFilterUrl('category', cat.value)}
                        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive 
                            ? `${colors.bg} ${colors.text} font-medium shadow-sm` 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                        {cat.count > 0 && (
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? colors.bg + ' bg-opacity-50' : 'bg-gray-100'} text-gray-600`}>
                            {cat.count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Work Mode Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <BriefcaseIcon size="1rem" className="text-[#BDA6CE]" />
                    Work Mode
                  </h3>
                </div>
                <div className="p-2 space-y-1">
                  {workModes.map((mode) => {
                    const colors = getColorClasses(mode.color);
                    const isActive = (searchParams.mode === mode.value) || (mode.value === "" && !searchParams.mode);
                    const Icon = mode.icon;
                    const count = internships.filter(i => mode.value === "" || i.workMode === mode.value).length;
                    return (
                      <Link
                        key={mode.name}
                        href={getFilterUrl('mode', mode.value)}
                        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive 
                            ? `${colors.bg} ${colors.text} font-medium shadow-sm` 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={14} />
                          <span>{mode.name}</span>
                        </span>
                        {count > 0 && (
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? colors.bg + ' bg-opacity-50' : 'bg-gray-100'} text-gray-600`}>
                            {count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Location Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin size="1rem" className="text-[#BDA6CE]" />
                    Location
                  </h3>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  {locations.map((loc) => {
                    const isActive = (searchParams.location === loc.value) || (loc.value === "" && !searchParams.location);
                    const count = internships.filter(i => loc.value === "" || i.location?.includes(loc.value)).length;
                    return (
                      <Link
                        key={loc.name}
                        href={getFilterUrl('location', loc.value)}
                        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-emerald-50 text-emerald-700 font-medium shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{loc.icon}</span>
                          <span>{loc.name}</span>
                        </span>
                        {count > 0 && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Stipend Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <DollarSign size="1rem" className="text-[#BDA6CE]" />
                    Stipend
                  </h3>
                </div>
                <div className="p-2 space-y-1">
                  <Link
                    href={getFilterUrl('type', 'Paid')}
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      searchParams.type === 'Paid'
                        ? 'bg-amber-50 text-amber-700 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>💰</span> Paid Internships
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {internships.filter(i => i.stipendAmount).length}
                    </span>
                  </Link>
                  <Link
                    href={getFilterUrl('type', 'Unpaid')}
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      searchParams.type === 'Unpaid'
                        ? 'bg-gray-100 text-gray-900 font-medium shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>📝</span> Unpaid Internships
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {internships.filter(i => !i.stipendAmount).length}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            
            {/* Active Filters Chips */}
            {activeFilterCount > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Active filters:</span>
                  {searchParams.search && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      Search: {searchParams.search}
                      <Link href={getFilterUrl('search', '')} className="hover:text-red-500"><X size={10} /></Link>
                    </span>
                  )}
                  {searchParams.category && (
                    <Link href={getFilterUrl('category', '')} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 transition">
                      {searchParams.category} <X size={10} />
                    </Link>
                  )}
                  {searchParams.mode && (
                    <Link href={getFilterUrl('mode', '')} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full hover:bg-indigo-100 transition">
                      {searchParams.mode} <X size={10} />
                    </Link>
                  )}
                  {searchParams.location && (
                    <Link href={getFilterUrl('location', '')} className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full hover:bg-emerald-100 transition">
                      {searchParams.location} <X size={10} />
                    </Link>
                  )}
                  {searchParams.type && (
                    <Link href={getFilterUrl('type', '')} className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full hover:bg-amber-100 transition">
                      {searchParams.type} <X size={10} />
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-900">{internships.length}</span> opportunities</p>
            </div>

            {/* Internship Cards */}
            {internships.length > 0 ? (
              <div className="space-y-4">
                {internships.map((job: any) => (
                  <div key={job.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#BDA6CE] transition-all duration-300 overflow-hidden">
                    <div className="p-5">
                      <div className="flex gap-4">
                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          <CompanyLogo companyName={job.company} logoUrl={job.companyLogo} size="lg" />
                        </div>
                        
                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header with Title and Actions */}
                          <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                            <div className="flex-1">
                              <Link href={`/internships/${job.id}`}>
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#BDA6CE] transition-colors">
                                  {job.title}
                                </h2>
                              </Link>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-sm text-gray-600 font-medium">{job.company}</span>
                                {job.verified && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                    <CheckCircle size={10} /> Verified
                                  </span>
                                )}
                                {job.isTrending && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                                    <TrendingUp size={10} /> Trending
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              {job.applyLink && (
                                <a
                                  href={job.applyLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-5 py-2 bg-gradient-to-r from-[#8B6BA3] to-[#BDA6CE] hover:from-[#7A5A92] hover:to-[#A896C8] text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                                >
                                  Apply Now
                                </a>
                              )}
                              <Link
                                href={`/internships/${job.id}`}
                                className="px-5 py-2 border-2 border-gray-300 hover:border-[#BDA6CE] text-gray-700 hover:text-[#BDA6CE] text-sm font-semibold rounded-lg transition-all bg-white"
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                          
                          {/* Role Description - ONLY 2 LINES */}
                          {job.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                              {truncateDescription(job.description, 120)}
                            </p>
                          )}
                          
                          {/* Key Details Grid */}
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <MapPin size={14} className="text-[#BDA6CE] flex-shrink-0" />
                              <span>{job.location || "Remote"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Clock size={14} className="text-[#BDA6CE] flex-shrink-0" />
                              <span>{job.duration || "Flexible"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm">
                              {job.stipendAmount ? (
                                <>
                                  <Wallet size={14} className="text-green-500 flex-shrink-0" />
                                  <span className="font-semibold text-green-600">{job.stipendAmount}</span>
                                </>
                              ) : (
                                <>
                                  <Wallet size={14} className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-500">Unpaid</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Briefcase size={14} className="text-[#BDA6CE] flex-shrink-0" />
                              <span>{job.workMode || "On-site"}</span>
                            </div>
                          </div>
                          
                          {/* Skills Tags */}
                          {job.skills && job.skills.length > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center gap-1 mb-1.5">
                                <Code size={12} className="text-[#BDA6CE]" />
                                <span className="text-xs font-semibold text-gray-600">Skills</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {job.skills.slice(0, 8).map((skill: string, i: number) => (
                                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                                    {skill}
                                  </span>
                                ))}
                                {job.skills.length > 8 && (
                                  <span className="px-2 py-0.5 text-gray-500 text-xs">
                                    +{job.skills.length - 8} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Footer Info */}
                          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                            {job.category && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md">
                                <Tag size={10} /> {job.category}
                              </span>
                            )}
                            {job.openings && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-md">
                                <Users size={10} /> {job.openings} openings
                              </span>
                            )}
                            {job.createdAt && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md">
                                <Calendar size={10} /> Posted {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="max-w-sm mx-auto">
                  <Rocket size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
                  <p className="text-sm text-gray-500 mb-4">We couldn't find any internships matching your criteria.</p>
                  <button onClick={() => window.location.href = clearFilters()} className="px-5 py-2 bg-gradient-to-r from-[#8B6BA3] to-[#BDA6CE] text-white text-sm font-medium rounded-lg hover:from-[#7A5A92] hover:to-[#A896C8] transition shadow-sm">
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}