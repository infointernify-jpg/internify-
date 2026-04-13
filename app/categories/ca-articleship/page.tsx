import { notFound } from "next/navigation";
import { MapPin, Briefcase, IndianRupee, ArrowRight, CheckCircle, Award } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "CA Articleship Internships 2026 | Top Opportunities", description: "Find top CA Articleship internships. Apply now!" };

export default function CategoryPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4 bg-orange-50 text-orange-700 border-orange-200">ICAI Approved</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CA Articleship Internships</h1>
          <p className="text-lg text-white/80 max-w-3xl">Find the best CA Articleship internships at top companies.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#0A2540] mb-6">Available Internships</h2>
            <div className="space-y-4">
              {Deloitte,PwC,EY,KPMG,BDO.Split(',')[0..2] -join ',' -replace '"', ''}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-[#0A2540] mb-4">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {Audit,Taxation,GST,Accounting Standards,Excel.Split(',')[0..4] -join ',' -replace '"', ''}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-[#0A2540] mb-4">Top Companies</h3>
              <ul className="space-y-2">
                {Deloitte,PwC,EY,KPMG,BDO.Split(',')[0..4] -join ',' -replace '"', ''}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
