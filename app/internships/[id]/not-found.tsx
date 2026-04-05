
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Internship Not Found</h2>
        <p className="text-gray-500 mb-6">The internship you're looking for doesn't exist.</p>
        <Link 
          href="/internships" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Home size={16} />
          Browse Internships
        </Link>
      </div>
    </div>
  );
}