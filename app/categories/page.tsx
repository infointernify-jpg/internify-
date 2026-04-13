import { categories } from "@/lib/categoryData";
import Link from "next/link";
import { TrendingUp, BarChart3, Zap, Briefcase, Award, Shield, Building2, PieChart, ArrowRight } from "lucide-react";

const iconMap: Record<string, any> = { TrendingUp, BarChart3, Zap, Briefcase, Award, Shield, Building2, PieChart };

export const metadata = {
  title: "Finance Internships by Category | Investment Banking, FinTech, CA & More",
  description: "Explore finance internships by category. Find roles in Investment Banking, Equity Research, FinTech, CA Articleship, and more.",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Finance Internships by Category</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Explore specialized internship opportunities across investment banking, fintech, equity research, and more.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Briefcase;
            return (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group bg-white rounded-xl border border-slate-200 hover:border-[#0A2540]/30 hover:shadow-lg transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.tagColor}`}><IconComponent size={24} /></div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${category.tagColor}`}>{category.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">{category.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.skills.slice(0, 3).map((skill, i) => <span key={i} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{skill}</span>)}
                </div>
                <div className="flex items-center gap-2 text-[#10B981] font-medium text-sm group-hover:gap-3 transition-all">Explore roles <ArrowRight size={14} /></div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
