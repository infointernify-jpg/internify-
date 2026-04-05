import { getInternshipById } from "@/data/internships"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function InternshipDetailPage({ params }) {
  const { id } = params
  const internship = getInternshipById(id)
  
  if (!internship) {
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/internships" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to all internships
      </Link>
      
      <div className="border rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">{internship.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{internship.company}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-6 border-b">
          <div>
            <p className="text-gray-500 text-sm">📍 Location</p>
            <p className="font-semibold">{internship.location}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">💰 Stipend</p>
            <p className="font-semibold">{internship.stipend}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">⏱️ Duration</p>
            <p className="font-semibold">{internship.duration}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">📅 Posted</p>
            <p className="font-semibold">{internship.postedDate}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">About the Internship</h2>
          <p className="text-gray-700">{internship.description}</p>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  )
}
