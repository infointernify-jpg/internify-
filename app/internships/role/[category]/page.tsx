import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Clock, Wallet, Briefcase, CheckCircle, Calendar, TrendingUp, Award, Users } from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";

// ✅ SEO METADATA - Dynamically generated for each category
export async function generateMetadata({ params }: { params: { category: string } }) {
  const { category } = params;
  
  const categoryMapping: Record<string, string> = {
    "data-analyst": "Data Analyst",
    "software-development": "Software Development",
    "marketing": "Marketing",
    "finance": "Finance",
    "ui-ux-design": "UI/UX Design",
    "human-resources": "Human Resources",
    "digital-marketing": "Digital Marketing",
    "sales": "Sales",
    "business-operations": "Business Operations",
    "content-writing": "Content Writing",
    "graphic-design": "Graphic Design",
    "product-management": "Product Management"
  };
  
  const displayName = categoryMapping[category] || category.replace(/-/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return {
    title: `${displayName} Internships in India 2026 | Apply Now | Internify`,
    description: `Find verified ${displayName.toLowerCase()} internships in India. Top companies hiring for ${displayName.toLowerCase()} roles. 100% free, no spam, apply in minutes.`,
    keywords: `${displayName.toLowerCase()} internships, ${displayName.toLowerCase()} jobs, internship in India, ${displayName.toLowerCase()} training, ${displayName.toLowerCase()} career`,
    openGraph: {
      title: `${displayName} Internships in India 2026 | Internify`,
      description: `Apply to top ${displayName.toLowerCase()} internships. Real companies, verified listings. Start your career today!`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  let { category } = params;
  
  // 🔥 Map URL slugs to database categories
  const categoryMapping: Record<string, string> = {
    "data-analyst": "Data",
    "software-development": "Software",
    "marketing": "Marketing",
    "finance": "Finance",
    "ui-ux-design": "UI/UX Design",
    "human-resources": "Human Resources",
    "digital-marketing": "Digital Marketing",
    "sales": "Sales",
    "business-operations": "Business Operations",
    "content-writing": "Content Writing",
    "graphic-design": "Graphic Design",
    "product-management": "Product Management"
  };
  
  // Get the actual database category name
  const dbCategory = categoryMapping[category] || category;
  
  const displayName = category.replace(/-/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  // Get internships count for stats
  const totalInternships = await prisma.internship.count({
    where: { published: true, category: dbCategory },
  });
  
  const internships = await prisma.internship.findMany({
    where: {
      published: true,
      category: dbCategory,
    },
    orderBy: { createdAt: "desc" },
  });

  // Get unique companies count
  const uniqueCompanies = [...new Set(internships.map(job => job.company))].length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            {displayName} Internships in India 2026
          </h1>
          <p className="text-blue-100 text-center mt-2">
            {internships.length} opportunities found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* ✅ SEO INTRO TEXT - CRITICAL FOR RANKING */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Why Choose {displayName} Internships?</h2>
          </div>
          <p className="text-gray-600 mb-3 leading-relaxed">
            Looking for the best <strong className="text-gray-900">{displayName.toLowerCase()} internships in India</strong>? 
            Internify brings you verified opportunities from top companies across Bangalore, Mumbai, Delhi, Hyderabad, 
            Pune, Chennai, and remote locations. Whether you're a student, recent graduate, or looking to switch careers, 
            {displayName.toLowerCase()} internships offer hands-on experience and real-world projects.
          </p>
          <p className="text-gray-600 mb-3 leading-relaxed">
            Companies are actively hiring <strong className="text-gray-900">{displayName.toLowerCase()} interns</strong> 
            for roles that offer competitive stipends, flexible work arrangements, and the opportunity to work on 
            cutting-edge technologies. Many of these internships lead to full-time job offers (PPO) based on performance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Currently, we have {totalInternships} active {displayName.toLowerCase()} internships</strong> from 
            {uniqueCompanies}+ trusted companies. All listings are manually verified, 100% free to apply, and updated daily. 
            Start your career journey today with Internify!
          </p>
          
          {/* Stats Badges */}
          <div className="flex flex-wrap gap-4 mt-5 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={14} className="text-green-600" />
              </div>
              <span className="text-sm text-gray-600">{totalInternships}+ Live Internships</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Award size={14} className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">100% Verified Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users size={14} className="text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">{uniqueCompanies}+ Hiring Companies</span>
            </div>
          </div>
        </div>

        {/* Popular Locations Section - Internal Linking */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Locations for {displayName} Internships</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/internships/location/bangalore" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Bangalore
            </Link>
            <Link href="/internships/location/mumbai" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Mumbai
            </Link>
            <Link href="/internships/location/remote" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Remote
            </Link>
            <Link href="/internships/location/delhi" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Delhi NCR
            </Link>
            <Link href="/internships/location/hyderabad" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Hyderabad
            </Link>
            <Link href="/internships/location/pune" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Pune
            </Link>
            <Link href="/internships/location/chennai" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Chennai
            </Link>
          </div>
        </div>

        {/* Internships List */}
        {internships.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Latest {displayName} Internship Opportunities</h2>
              <p className="text-sm text-gray-500">Showing {internships.length} of {totalInternships} internships</p>
            </div>
            <div className="space-y-4">
              {internships.map((job: any) => (
                <div key={job.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <CompanyLogo companyName={job.company} logoUrl={job.companyLogo} size="md" />
                      <div className="flex-1">
                        <Link href={`/internships/${job.id}`} className="hover:underline">
                          <h2 className="font-semibold text-gray-900 text-lg">{job.title}</h2>
                        </Link>
                        <p className="text-sm text-gray-500">{job.company}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {job.workMode && (
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded">
                              {job.workMode}
                            </span>
                          )}
                          {job.verified && (
                            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded flex items-center gap-0.5">
                              <CheckCircle size={10} /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link 
                      href={`/internships/${job.id}`} 
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg whitespace-nowrap transition-colors shadow-sm"
                    >
                      Apply Now →
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location || "Remote"}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {job.duration || "Flexible"}</span>
                    {job.stipendAmount ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <Wallet size={12} /> {job.stipendAmount}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400"><Wallet size={12} /> Unpaid</span>
                    )}
                    <span className="flex items-center gap-1"><Calendar size={12} /> Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No {displayName} Internships Found</h3>
            <p className="text-gray-500 mb-6">
              We don't have any {displayName.toLowerCase()} internships at the moment. 
              Check back soon or explore other categories!
            </p>
            <Link href="/internships" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Browse All Internships →
            </Link>
          </div>
        )}

        {/* ✅ FAQ Section for Category - Helps with SEO */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions About {displayName} Internships</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">Q1: How to get a {displayName.toLowerCase()} internship with no experience?</h4>
              <p className="text-gray-600 text-sm mt-1">Build a strong portfolio, work on personal projects, contribute to open source, and highlight your skills on your resume. Many companies hire interns based on potential and learning attitude.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Q2: What is the average stipend for {displayName.toLowerCase()} interns in India?</h4>
              <p className="text-gray-600 text-sm mt-1">{displayName} internships typically offer stipends ranging from ₹8,000 to ₹25,000 per month, depending on the company, location, and your skills.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Q3: Are remote {displayName.toLowerCase()} internships available?</h4>
              <p className="text-gray-600 text-sm mt-1">Yes! Many companies offer remote or hybrid {displayName.toLowerCase()} internships. Use the "Remote" filter on our platform to find work-from-home opportunities.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Q4: How to apply for {displayName.toLowerCase()} internships on Internify?</h4>
              <p className="text-gray-600 text-sm mt-1">Simply create your free profile, browse internships, and click "Apply Now". Your application will be sent directly to the company.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Start Your Career?</h3>
          <p className="text-gray-600 mb-4">Join thousands of students who found their dream internships on Internify.</p>
          <Link href="/auth/register" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Create Free Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}