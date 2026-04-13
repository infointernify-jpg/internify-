"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, MapPin, Briefcase, IndianRupee, Filter, X,
  ChevronRight, Building2, Clock, CheckCircle, ArrowRight,
  Eye, Calendar, TrendingUp, Shield, Heart, Sparkles, Wallet, Code, Tag
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
  postedAt: string;
  isActivelyHiring: boolean;
  isVerified: boolean;
  logoUrl?: string;
  companyLogo?: string;
  category: string;
  description: string;
  workMode: string;
  createdAt: string;
  applyLink?: string;
  paid?: boolean;
  stipendAmount?: string;
};

// Helper function to get company initials for logo fallback
const getCompanyInitials = (company: string) => {
  if (!company) return "IN";
  const words = company.split(" ");
  if (words.length === 1) {
    return company.substring(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

// Helper function to get location display
const getLocationDisplay = (location: string, workMode: string) => {
  const cleanLocation = location?.replace(/, India$/, '').replace(/ India$/, '').trim();
  if (workMode === "Remote") return "Remote";
  if (workMode === "Hybrid") return `${cleanLocation} (Hybrid)`;
  return `${cleanLocation} (On-site)`;
};

// Helper function to get numeric stipend value for filtering
const getStipendValue = (job: Internship): number => {
  // Check stipendAmount first
  if (job.stipendAmount && job.stipendAmount !== "Not Disclosed" && job.stipendAmount !== "") {
    const num = parseInt(job.stipendAmount);
    if (!isNaN(num)) return num;
  }
  // Check stipend field
  if (job.stipend && job.stipend !== "Not Disclosed" && job.stipend !== "Not disclosed" && job.stipend !== "") {
    const num = parseInt(job.stipend);
    if (!isNaN(num)) return num;
  }
  return 0;
};

// Helper function to format stipend for display
const formatStipend = (stipend: string, paid?: boolean, stipendAmount?: string) => {
  if (stipendAmount && stipendAmount !== "Not Disclosed" && stipendAmount !== "") {
    if (!isNaN(Number(stipendAmount))) {
      return `₹${Number(stipendAmount).toLocaleString()}/month`;
    }
    if (!stipendAmount.includes("₹")) {
      return `₹${stipendAmount}/month`;
    }
    return stipendAmount;
  }
  
  if (stipend && stipend !== "Not Disclosed" && stipend !== "Not disclosed" && stipend !== "") {
    if (!isNaN(Number(stipend))) {
      return `₹${Number(stipend).toLocaleString()}/month`;
    }
    if (!stipend.includes("₹")) {
      return `₹${stipend}`;
    }
    return stipend;
  }
  
  if (paid === false) {
    return "Unpaid";
  }
  
  return "Stipend not disclosed";
};

export default function InternshipsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allInternships, setAllInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState("relevant");
  
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [minStipend, setMinStipend] = useState(0);
  const [workFromHome, setWorkFromHome] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  // Fetch internships on mount
  useEffect(() => {
    fetchInternships();
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [allInternships, searchKeyword, selectedCategory, selectedLocation, minStipend, workFromHome, partTime, sortBy]);

  const fetchInternships = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/internships`);
      const data = await res.json();
      let internshipsData = Array.isArray(data) ? data : [];
      
      setAllInternships(internshipsData);
    } catch (error) {
      console.error("Error fetching internships:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allInternships];
    
    // Filter by search keyword
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }
    
    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }
    
    // Filter by minimum stipend - FIXED
    if (minStipend > 0) {
      filtered = filtered.filter(job => {
        const stipendValue = getStipendValue(job);
        return stipendValue >= minStipend;
      });
    }
    
    // Filter by work from home
    if (workFromHome) {
      filtered = filtered.filter(job => job.workMode === "Remote");
    }
    
    // Filter by part time
    if (partTime) {
      filtered = filtered.filter(job => job.internshipType === "Part-time");
    }
    
    // Apply sorting
    if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "stipend") {
      filtered = [...filtered].sort((a, b) => {
        const stipendA = getStipendValue(a);
        const stipendB = getStipendValue(b);
        return stipendB - stipendA;
      });
    }
    
    setFilteredInternships(filtered);
    setTotalCount(filtered.length);
  };

  const clearFilters = () => {
    setSearchKeyword("");
    setSelectedCategory("");
    setSelectedLocation("");
    setMinStipend(0);
    setWorkFromHome(false);
    setPartTime(false);
    setSortBy("relevant");
    // Update URL without filters
    router.push("/internships");
  };

  const handleImageError = (jobId: string) => {
    setImageErrors(prev => ({ ...prev, [jobId]: true }));
  };

  const categories = [
    "Investment Banking", "Equity Research", "FinTech", "Financial Analyst",
    "CA Articleship", "Risk & Compliance", "Corporate Finance", "Portfolio Management"
  ];

  const locations = ["Mumbai", "Bangalore", "Delhi NCR", "Remote", "Pune", "Hyderabad", "Chennai", "Kolkata"];

  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (!description) return "";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  const formatPostedDate = (date: string) => {
    const postedDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <Link href="/" className="hover:text-[#0A2540]">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#0A2540] font-medium">Internships</span>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0A2540]">Finance Internships in India</h1>
              <p className="text-slate-500 text-sm mt-2">Updated daily</p>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={12} className="text-green-600" />
                <span className="text-green-700 text-xs font-medium">All listings manually verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* NO SIGNUP REMINDER */}
        <div className="mb-6 bg-gradient-to-r from-[#10B981]/10 to-[#0A2540]/10 rounded-xl p-3 text-center border border-[#10B981]/20">
          <p className="text-sm font-medium text-[#0A2540]">
            ✨ Apply instantly — <span className="text-[#10B981] font-bold">no signup required</span>. 100% free for students.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-24">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-[#0A2540] flex items-center gap-2">
                  <Filter size={16} /> Filters
                </h2>
                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600">Clear all</button>
              </div>

              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Keyword Search</label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="e.g. Investment Banking, Mumbai"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Profile</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A2540]"
                >
                  <option value="">All Profiles</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A2540]"
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Min Stipend (₹)</label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={minStipend}
                  onChange={(e) => setMinStipend(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>₹0</span><span>₹10K</span><span>₹20K</span><span>₹30K</span><span>₹40K</span><span>₹50K+</span>
                </div>
                <p className="text-sm text-[#0A2540] font-semibold mt-2">Min: ₹{minStipend.toLocaleString()}/month</p>
              </div>

              <div className="space-y-3 mb-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={workFromHome} onChange={(e) => setWorkFromHome(e.target.checked)} className="w-4 h-4 rounded border-slate-300" />
                  <span className="text-sm text-slate-600">Work from home</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={partTime} onChange={(e) => setPartTime(e.target.checked)} className="w-4 h-4 rounded border-slate-300" />
                  <span className="text-sm text-slate-600">Part-time</span>
                </label>
              </div>

              {(searchKeyword || selectedCategory || selectedLocation || minStipend > 0 || workFromHome || partTime) && (
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2">Active filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchKeyword && <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">🔍 {searchKeyword}</span>}
                    {selectedCategory && <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">📁 {selectedCategory}</span>}
                    {selectedLocation && <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">📍 {selectedLocation}</span>}
                    {minStipend > 0 && <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">💰 ₹{minStipend}+</span>}
                    {workFromHome && <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">🏠 Work from home</span>}
                    {partTime && <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">⏰ Part-time</span>}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Internships List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-5">
                {[1,2,3,4,5].map(i => <div key={i} className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />)}
              </div>
            ) : filteredInternships.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A2540] mb-2">No internships found</h3>
                  <p className="text-sm text-slate-500 mb-6">We couldn't find any internships matching your criteria.</p>
                  <button onClick={clearFilters} className="px-6 py-2.5 bg-[#0A2540] text-white text-sm font-medium rounded-lg hover:bg-[#0d2e52] transition shadow-sm">
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-slate-500">Showing {filteredInternships.length} internships</p>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-[#0A2540]"
                  >
                    <option value="relevant">Sort by: Most Relevant</option>
                    <option value="newest">Sort by: Newest first</option>
                    <option value="stipend">Sort by: Highest stipend</option>
                  </select>
                </div>

                {filteredInternships.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => window.open(job.applyLink || `/internships/${job.id}`, '_blank')}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-[#BDA6CE] transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="p-5">
                      <div className="flex gap-4">
                        {/* Company Logo */}
                        <div className="flex-shrink-0">
                          {!imageErrors[job.id] && (job.logoUrl || job.companyLogo) ? (
                            <div className="rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden w-16 h-16">
                              <img 
                                src={job.logoUrl || job.companyLogo}
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
                                {job.isVerified && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                    <CheckCircle size={10} />
                                    Verified
                                  </span>
                                )}
                                {job.isActivelyHiring && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                                    <TrendingUp size={10} />
                                    Trending
                                  </span>
                                )}
                              </div>
                            </div>
                            <button className="px-5 py-2 bg-gradient-to-r from-[#8B6BA3] to-[#BDA6CE] hover:from-[#7A5A92] hover:to-[#A896C8] text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap">
                              Apply→
                            </button>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                            {truncateDescription(job.description, 100)}
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
                              <span className={`font-semibold ${job.paid === false ? 'text-gray-500' : 'text-green-600'}`}>
                                {formatStipend(job.stipend, job.paid, job.stipendAmount)}
                              </span>
                            </div>
                          </div>

                          {/* Skills Section */}
                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {job.skills.slice(0, 6).map((skill: string, i: number) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                                  {skill}
                                </span>
                              ))}
                              {job.skills.length > 6 && (
                                <span className="px-2 py-0.5 text-gray-400 text-xs">
                                  +{job.skills.length - 6} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer Tags */}
                          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md">
                              <Tag size={10} />
                              {job.category || "Finance"}
                            </span>
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
        </div>
      </main>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-100 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0A2540]">Find Your Perfect Finance Internship</h2>
            <p className="text-slate-500 text-sm mt-2">Browse verified finance internships from top companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#10B981]">{totalCount}+</p>
              <p className="text-xs text-slate-500">Active Internships</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#10B981]">50+</p>
              <p className="text-xs text-slate-500">Companies Hiring</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#10B981]">100%</p>
              <p className="text-xs text-slate-500">All listings manually verified</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#10B981]">Free</p>
              <p className="text-xs text-slate-500">Free for students</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}