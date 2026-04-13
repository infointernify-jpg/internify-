"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Briefcase, IndianRupee, Calendar, Building2,
  CheckCircle, ArrowLeft, Share2, Heart, Clock,
  TrendingUp, Shield, Award, ExternalLink, Bookmark
} from "lucide-react";
import Header from "@/app/components/Header";

type Internship = {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  stipend: string;
  duration: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  postedAt: string;
  deadline: string;
  isActivelyHiring: boolean;
  isVerified: boolean;
  isTrending: boolean;
  workType: "Remote" | "Hybrid" | "On-site";
  openings: number;
};

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const internshipId = params.id as string;

  useEffect(() => {
    async function fetchInternship() {
      try {
        const res = await fetch(`/api/internships/${internshipId}`);
        if (!res.ok) throw new Error("Internship not found");
        const data = await res.json();
        setInternship(data);
      } catch (error) {
        console.error("Error fetching internship:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInternship();
  }, [internshipId]);

  const handleApply = () => {
    router.push(`/internships/${internshipId}/apply`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Save to localStorage or API
  };

  if (isLoading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="h-96 bg-white rounded-xl border border-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-[#0A2540]">Internship not found</h1>
          <Link href="/internships" className="mt-4 inline-block text-[#10B981] hover:underline">
            ← Back to internships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0A2540] transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to internships
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          
          {/* Actively Hiring Banner */}
          {internship.isActivelyHiring && (
            <div className="bg-green-50 px-6 py-2 border-b border-green-100">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Actively hiring</span>
              </div>
            </div>
          )}

          {/* Header Section */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex gap-4">
                {/* Company Logo */}
                <div className="w-16 h-16 bg-[#0A2540] rounded-xl flex items-center justify-center flex-shrink-0">
                  {internship.companyLogo ? (
                    <img src={internship.companyLogo} alt={internship.company} className="w-10 h-10 object-contain" />
                  ) : (
                    <span className="text-white font-bold text-lg">{internship.company?.substring(0,2).toUpperCase()}</span>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">{internship.title}</h1>
                    {internship.isVerified && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#10B981] bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle size={12} /> Verified
                      </span>
                    )}
                    {internship.isTrending && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        <TrendingUp size={12} /> Trending
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mt-1">{internship.company}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className={`p-2 rounded-lg border transition-all ${isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500'}`}
                >
                  <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                </button>
                <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-500 transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#10B981]" />
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-medium text-slate-700">{internship.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase size={18} className="text-[#10B981]" />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-medium text-slate-700">{internship.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IndianRupee size={18} className="text-[#10B981]" />
              <div>
                <p className="text-xs text-slate-400">Stipend</p>
                <p className="text-sm font-medium text-[#10B981]">{internship.stipend}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-[#10B981]" />
              <div>
                <p className="text-xs text-slate-400">Posted on</p>
                <p className="text-sm font-medium text-slate-700">{internship.postedAt}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0A2540] mb-3">About the Internship</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{internship.description}</p>
            </div>

            {/* Responsibilities */}
            {internship.responsibilities && internship.responsibilities.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#0A2540] mb-3">Key Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                  {internship.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {internship.requirements && internship.requirements.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#0A2540] mb-3">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                  {internship.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {internship.skills && internship.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#0A2540] mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, i) => (
                    <span key={i} className="text-sm px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-slate-50 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} className="text-[#10B981]" />
                  <span>Apply before {internship.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Shield size={16} className="text-[#10B981]" />
                  <span>{internship.openings} openings</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Building2 size={16} />
                <span>{internship.workType}</span>
              </div>
            </div>
          </div>

          {/* Apply Section */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/30">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-xs text-slate-400">Ready to apply?</p>
                <p className="text-sm text-slate-600">Don't miss this opportunity</p>
              </div>
              <button
                onClick={handleApply}
                className="bg-[#0A2540] hover:bg-[#0d2e52] text-white px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                Apply Now <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Similar Internships Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#0A2540] mb-6">Similar Internships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Building2 size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A2540]">Loading...</h3>
                    <p className="text-xs text-slate-400">Similar opportunity</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}