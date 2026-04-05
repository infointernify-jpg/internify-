import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Clock, Wallet, Briefcase, CheckCircle, Calendar, TrendingUp, Award, Users, Building2, Sparkles } from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";

// ✅ SEO METADATA - Dynamically generated for each city
export async function generateMetadata({ params }: { params: { city: string } }) {
  const { city } = params;
  
  const cityNames: Record<string, string> = {
    'bangalore': 'Bangalore', 'mumbai': 'Mumbai', 'delhi': 'Delhi', 
    'pune': 'Pune', 'hyderabad': 'Hyderabad', 'chennai': 'Chennai', 
    'remote': 'Remote', 'bhubaneswar': 'Bhubaneswar', 'kolkata': 'Kolkata',
    'jaipur': 'Jaipur', 'lucknow': 'Lucknow', 'ahmedabad': 'Ahmedabad'
  };
  const displayName = cityNames[city.toLowerCase()] || city.charAt(0).toUpperCase() + city.slice(1);
  
  return {
    title: `Internships in ${displayName} 2026 | Apply Now | Internify`,
    description: `Find verified internships in ${displayName} for students. Top companies hiring in ${displayName} across software, marketing, data analytics & more. 100% free, apply in minutes.`,
    keywords: `internships in ${displayName.toLowerCase()}, ${displayName.toLowerCase()} internships, ${displayName.toLowerCase()} jobs for students, ${displayName.toLowerCase()} hiring, ${displayName.toLowerCase()} careers`,
    openGraph: {
      title: `Internships in ${displayName} 2026 | Internify`,
      description: `Apply to top internships in ${displayName}. Real companies, verified listings. Start your career today!`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const { city } = params;
  
  const cityNames: Record<string, string> = {
    'bangalore': 'Bangalore', 'mumbai': 'Mumbai', 'delhi': 'Delhi', 
    'pune': 'Pune', 'hyderabad': 'Hyderabad', 'chennai': 'Chennai', 
    'remote': 'Remote', 'bhubaneswar': 'Bhubaneswar', 'kolkata': 'Kolkata',
    'jaipur': 'Jaipur', 'lucknow': 'Lucknow', 'ahmedabad': 'Ahmedabad'
  };
  const displayName = cityNames[city.toLowerCase()] || city.charAt(0).toUpperCase() + city.slice(1);
  
  const where: any = { published: true };
  if (city.toLowerCase() === 'remote') {
    where.workMode = 'Remote';
  } else {
    where.location = { contains: displayName, mode: 'insensitive' };
  }
  
  const totalInternships = await prisma.internship.count({ where });
  const internships = await prisma.internship.findMany({ where, orderBy: { createdAt: "desc" } });
  
  // Get unique companies count
  const uniqueCompanies = [...new Set(internships.map(job => job.company))].length;
  
  // Get unique categories in this city
  const categoriesInCity = [...new Set(internships.map(job => job.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Internships in {displayName} 2026
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
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin size={20} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Internships in {displayName} – Your Career Starts Here</h2>
          </div>
          <p className="text-gray-600 mb-3 leading-relaxed">
            Looking for the best <strong className="text-gray-900">internships in {displayName}</strong>? 
            Internify brings you verified opportunities from top companies hiring in {displayName}. 
            Whether you're a student, recent graduate, or looking to gain hands-on experience, 
            {displayName} offers a thriving job market with opportunities across software development, 
            data analytics, marketing, finance, and more.
          </p>
          <p className="text-gray-600 mb-3 leading-relaxed">
            Companies in {displayName} are actively hiring interns for roles that offer competitive stipends, 
            flexible work arrangements, and real-world project experience. Many internships lead to 
            full-time job offers (PPO) based on performance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Currently, we have {totalInternships} active internships in {displayName}</strong> from 
            {uniqueCompanies}+ trusted companies. All listings are manually verified, 100% free to apply, 
            and updated daily. Start your career journey in {displayName} today with Internify!
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

        {/* Popular Categories Section - Internal Linking */}
        {categoriesInCity.length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Internship Categories in {displayName}</h3>
            <div className="flex flex-wrap gap-3">
              {categoriesInCity.map((category) => {
                const categorySlug = category?.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link 
                    key={category} 
                    href={`/internships/role/${categorySlug}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                  >
                    {category} Internships
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Popular Roles Section */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Internship Roles in {displayName}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/internships/role/software-development" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Software Development
            </Link>
            <Link href="/internships/role/data-analyst" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Data Analyst
            </Link>
            <Link href="/internships/role/marketing" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Marketing
            </Link>
            <Link href="/internships/role/finance" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Finance
            </Link>
            <Link href="/internships/role/ui-ux-design" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              UI/UX Design
            </Link>
            <Link href="/internships/role/human-resources" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Human Resources
            </Link>
          </div>
        </div>

        {/* Internships List */}
        {internships.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Latest Internship Opportunities in {displayName}</h2>
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
                          {job.category && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                              {job.category}
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
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {job.duration}</span>
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
            <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Internships Found in {displayName}</h3>
            <p className="text-gray-500 mb-6">
              We don't have any internships in {displayName} at the moment. 
              Check back soon or explore other cities!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/internships" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Browse All Internships →
              </Link>
              <Link href="/internships/location/remote" className="inline-block px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors">
                Explore Remote Internships →
              </Link>
            </div>
          </div>
        )}

        {/* ✅ FAQ Section for City - Helps with SEO */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions About Internships in {displayName}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">Q1: How to find internships in {displayName}?</h4>
              <p className="text-gray-600 text-sm mt-1">You can find internships in {displayName} on Internify. We list verified opportunities from top companies. Use filters to search by category, work mode, and stipend.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Q2: What is the average stipend for interns in {displayName}?</h4>
              <p className="text-gray-600 text-sm mt-1">Internship stipends in {displayName} typically range from ₹8,000 to ₹25,000 per month, depending on the role, company, and your skills.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Q3: Are there remote internships available from {displayName} companies?</h4>
              <p className="text-gray-600 text-sm mt-1">Yes! Many companies based in {displayName} offer remote or hybrid internships. Check the "Remote" filter on our platform.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Q4: Which industries are hiring interns in {displayName}?</h4>
              <p className="text-gray-600 text-sm mt-1">{displayName} has opportunities across IT, software development, marketing, finance, e-commerce, and startup ecosystems.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Q5: How to apply for internships in {displayName} on Internify?</h4>
              <p className="text-gray-600 text-sm mt-1">Simply create your free profile, browse internships, and click "Apply Now". Your application will be sent directly to the company.</p>
            </div>
          </div>
        </div>

        {/* Other Cities Section - Internal Linking */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore Internships in Other Cities</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/internships/location/bangalore" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Bangalore
            </Link>
            <Link href="/internships/location/mumbai" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Mumbai
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
            <Link href="/internships/location/remote" className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors">
              Remote
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-100">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={20} className="text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Ready to Start Your Career in {displayName}?</h3>
          </div>
          <p className="text-gray-600 mb-4">Join thousands of students who found their dream internships on Internify.</p>
          <Link href="/auth/register" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Create Free Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}