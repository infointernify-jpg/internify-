"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Clock, IndianRupee, Building2,
  ChevronRight, Sparkles, Eye, Calendar, Briefcase, CheckCircle
} from "lucide-react";

// Types - Updated to match your data structure
interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  stipendAmount?: string | null;
  duration: string;
  skills: string[];
  postedAt: string;
  isActivelyHiring: boolean;
  isVerified: boolean;
  companyLogo?: string | null;
  category: string;
  description: string;
  shortDescription?: string | null; // Added shortDescription field
  workMode: string;
  createdAt: string;
  applyLink?: string;
  published: boolean;
}

// Helper function to get company initials for fallback
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

// Helper function to format stipend - FIXED: removes duplicate ₹ symbol
const formatStipend = (stipendAmount: string | null | undefined) => {
  if (!stipendAmount || stipendAmount === "Not Disclosed" || stipendAmount === "Not disclosed" || stipendAmount === "") {
    return "Not disclosed";
  }
  
  // Clean the amount
  let cleanAmount = stipendAmount.replace(/\/month$/, '').replace(/per month$/, '').trim();
  
  // Remove any existing ₹ symbol to avoid duplication
  cleanAmount = cleanAmount.replace(/₹/g, '').trim();
  
  // If it's a number, format it
  if (!isNaN(Number(cleanAmount)) && cleanAmount !== "") {
    return `₹${Number(cleanAmount).toLocaleString()}/month`;
  }
  
  // Add ₹ symbol and /month
  return `₹${cleanAmount}/month`;
};

// Helper function to get description -优先使用 shortDescription
const getDescription = (job: Internship) => {
  // First try shortDescription
  if (job.shortDescription && job.shortDescription !== "") {
    let cleanText = job.shortDescription;
    // Remove company name if present at beginning
    const patterns = [
      new RegExp(`^${job.company}\\s+(is\\s+)?(hiring|offering|looking for)\\s+`, 'i'),
      new RegExp(`^${job.company}\\s+`, 'i'),
    ];
    for (const pattern of patterns) {
      cleanText = cleanText.replace(pattern, '');
    }
    cleanText = cleanText.replace(/^(A|An)\s+/i, '');
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    
    if (cleanText.length > 100) {
      return cleanText.substring(0, 100) + "...";
    }
    return cleanText;
  }
  
  // Fallback to description
  if (job.description) {
    let cleanText = job.description;
    const patterns = [
      new RegExp(`^${job.company}\\s+(is\\s+)?(hiring|offering|looking for)\\s+`, 'i'),
      new RegExp(`^${job.company}\\s+`, 'i'),
    ];
    for (const pattern of patterns) {
      cleanText = cleanText.replace(pattern, '');
    }
    cleanText = cleanText.replace(/^(A|An)\s+/i, '');
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    
    if (cleanText.length > 100) {
      return cleanText.substring(0, 100) + "...";
    }
    return cleanText;
  }
  
  return "";
};

// Helper function to format posted date
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

export default function TrendingInternships() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchTrendingInternships();
  }, []);

  const fetchTrendingInternships = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/internships?trending=true&limit=6');
      
      if (!res.ok) {
        throw new Error(`Failed to fetch internships: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (Array.isArray(data) && data.length > 0) {
        console.log("First internship data:", data[0]);
        console.log("Short description:", data[0]?.shortDescription);
        console.log("Stipend amount:", data[0]?.stipendAmount);
        setInternships(data);
      } else {
        setInternships([]);
      }
    } catch (error) {
      console.error("Error fetching trending internships:", error);
      setError("Unable to load internships. Please try again later.");
      setInternships([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (internshipId: string) => {
    setImageErrors(prev => ({ ...prev, [internshipId]: true }));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-white rounded-xl border border-slate-200 animate-pulse">
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 bg-slate-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchTrendingInternships}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No internships available</h3>
          <p className="text-gray-500 text-sm">Check back later for new opportunities.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.slice(0, 6).map((job) => (
          <div
            key={job.id}
            className="group bg-white rounded-2xl border border-slate-200/60 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-[#0A2540]/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="h-1 bg-gradient-to-r from-[#0A2540] via-[#10B981] to-[#0A2540] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-5 flex-1 flex flex-col">
              {/* Header with Company Logo */}
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  {!imageErrors[job.id] && job.companyLogo && job.companyLogo !== "" ? (
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md border border-slate-200 overflow-hidden group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      <img
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        className="w-10 h-10 object-contain"
                        loading="lazy"
                        onError={() => handleImageError(job.id)}
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0A2540] to-[#1a3a5c] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                      <span className="text-white font-bold text-lg">
                        {getCompanyInitials(job.company)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0A2540] transition-colors line-clamp-1 mb-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Building2 size={12} className="text-slate-400" />
                    <span className="text-xs font-medium text-slate-700">{job.company}</span>
                    <span className="inline-flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded-full">
                      <CheckCircle size={10} className="text-green-600" />
                      <span className="text-[9px] font-medium text-green-700">Verified</span>
                    </span>
                    {job.isActivelyHiring && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                        Hiring
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Info Cards - Using stipendAmount with consistent format (FIXED duplicate rupee) */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={13} className="text-emerald-600" />
                  </div>
                  <span className="text-xs text-slate-700 font-medium truncate">{getLocationDisplay(job.location, job.workMode)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={13} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-700 font-medium">{job.duration || "Flexible"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IndianRupee size={13} className="text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-green-700">
                    {formatStipend(job.stipendAmount)}
                  </span>
                </div>
              </div>

              {/* Description - Uses shortDescription first, then description */}
              {(job.shortDescription || job.description) && (
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {getDescription(job)}
                </p>
              )}

              {/* Skills Tags */}
              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.skills.slice(0, 5).map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 5 && (
                    <span className="px-2 py-0.5 text-slate-400 text-[10px] font-medium">
                      +{job.skills.length - 5}
                    </span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar size={10} />
                  <span>Posted {formatPostedDate(job.createdAt)}</span>
                </div>
                {job.applyLink ? (
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-[#0A2540] hover:text-[#1a3a5c] transition-colors group/link"
                  >
                    <span>Apply</span>
                    <ChevronRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <Link href={`/internships/${job.id}`} className="flex items-center gap-1 text-xs font-semibold text-[#0A2540] hover:text-[#1a3a5c] transition-colors group/link">
                    <Eye size={12} />
                    <span>View Details</span>
                    <ChevronRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {internships.length > 0 && (
        <div className="flex justify-center mt-10">
          <Link
            href="/internships"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30"
          >
            View All Finance Internships
            <ChevronRight size={16} className="text-white group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}