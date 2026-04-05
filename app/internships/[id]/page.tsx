"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  MapPin, Clock, Wallet, Briefcase, Building2, 
  CheckCircle, ExternalLink, Calendar,
  ChevronLeft, Globe, Laptop,
  Share2, Bookmark, FileText, Gift, Code
} from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";

function formatStipendDetail(amount: string | number | null | undefined, isPaid: boolean): string {
  if (!isPaid) return "Unpaid";
  if (!amount) return "Not specified";
  return String(amount);
}

// ✅ Fix: Proper typing for params in App Router
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function InternshipDetailPage({ params }: PageProps) {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  // ✅ Unwrap params promise
  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Update page title dynamically when job loads
  useEffect(() => {
    if (job && job.title && job.company) {
      document.title = `${job.title} at ${job.company} | Internify`;
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        const description = job.description?.substring(0, 160) || `Apply for ${job.title} internship at ${job.company}. ${job.location} • ${job.duration}`;
        metaDesc.setAttribute('content', description);
      }
    }
  }, [job]);

  useEffect(() => {
    async function fetchJob() {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/internships/${id}`);
        if (!response.ok) {
          throw new Error("Job not found");
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link 
            href="/internships" 
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
          >
            <ChevronLeft size={16} />
            Back to Internships
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        
        {/* Company Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  loading="lazy"
                  className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <Building2 size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600 mt-1">{job.company}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {job.workMode && (
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                    {job.workMode}
                  </span>
                )}
                {job.internshipType && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                    {job.internshipType}
                  </span>
                )}
                {job.category && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {job.category}
                  </span>
                )}
                {job.verified && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                    <CheckCircle size={12} />
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                title="Share"
              >
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => {
                  const saved = localStorage.getItem('savedInternships');
                  const savedArray = saved ? JSON.parse(saved) : [];
                  if (!savedArray.includes(job.id)) {
                    savedArray.push(job.id);
                    localStorage.setItem('savedInternships', JSON.stringify(savedArray));
                    alert('Saved to bookmarks!');
                  } else {
                    alert('Already saved!');
                  }
                }}
                className="p-2 text-gray-400 hover:text-yellow-600 rounded-full hover:bg-yellow-50 transition-colors"
                title="Save"
              >
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Company Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <Building2 size={18} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Company Overview</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {job.aboutCompany || `${job.company} is looking for talented interns to join their team.`}
              </p>
              {job.companyWebsite && (
                <a
                  href={job.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-3"
                >
                  <Globe size={14} />
                  Visit Website
                </a>
              )}
            </div>
            
            {/* Internship Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <Briefcase size={18} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Internship Details</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    <MapPin size={12} />
                    Location
                  </p>
                  <p className="font-medium text-gray-900">{job.location || "Not specified"}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    <Clock size={12} />
                    Duration
                  </p>
                  <p className="font-medium text-gray-900">{job.duration || "Not specified"}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    <Wallet size={12} />
                    Stipend
                  </p>
                  <p className={`font-medium ${job.paid ? 'text-green-600' : 'text-gray-500'}`}>
                    {formatStipendDetail(job.stipendAmount, job.paid)}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    <Calendar size={12} />
                    Posted
                  </p>
                  <p className="font-medium text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <FileText size={18} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Job Description</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                  <Code size={18} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Skills Required</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Perks & Benefits */}
            {job.perks && job.perks.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                  <Gift size={18} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Perks & Benefits</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.perks.map((perk: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-lg">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Apply Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Ready to apply?</h3>
              
              {job.applyLink ? (
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ExternalLink size={16} />
                </a>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg mb-4">
                  <p className="text-sm text-gray-500">No application link available</p>
                  <p className="text-xs text-gray-400 mt-1">Contact the company directly</p>
                </div>
              )}

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Posted on</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                
                {job.applyBy && (
                  <div>
                    <p className="text-xs text-gray-500">Apply by</p>
                    <p className="text-sm font-medium text-orange-600">
                      {new Date(job.applyBy).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Company Info Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">About the Company</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{job.company}</span>
                </div>
                {job.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                )}
                {job.companyWebsite && (
                  <a 
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Globe size={16} />
                    Visit website
                  </a>
                )}
              </div>
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Share this opportunity</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={14} />
                Copy Link
              </button>
            </div>

            {/* Similar Internships Section - SEO & User Experience */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Similar Internships</h3>
              <p className="text-xs text-gray-500 text-center py-4">
                More opportunities coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}