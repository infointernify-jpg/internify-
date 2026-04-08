'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Briefcase,
  X,
  Sparkles,
  ChevronRight
} from "lucide-react"

// ONLY articles that ACTUALLY EXIST with proper page.tsx files
const posts = [
  { 
    slug: "how-to-get-first-internship", 
    title: "How to Get Your First Internship in India (No Experience)", 
    description: "Step-by-step guide to land your first internship with zero experience. Skills, resume tips, application strategy, and interview prep that works in 2026.",
    date: "Apr 8, 2026", 
    readTime: "10 min",
    category: "internship-guides",
    featured: true,
    author: "Internify Team",
  },
  // ONLY add new articles here AFTER creating their page.tsx files
]

const categories = [
  { id: "all", name: "All Posts", icon: BookOpen },
  { id: "internship-guides", name: "Internship Guides", icon: Briefcase },
  { id: "career-tips", name: "Career Tips", icon: TrendingUp },
  { id: "student-success", name: "Student Success", icon: Users },
]

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Free Resources • Updated Weekly</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Blog & Resources
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Tips, guides, and strategies to help you land your dream internship and kickstart your career.
            </p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = selectedCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue-400" />
                      </div>
                      {post.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime} read
                        </span>
                      </div>
                      
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{post.author}</span>
                        <span className="text-blue-600 text-sm font-medium group-hover:underline flex items-center gap-1">
                          Read More <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? `No results for "${searchQuery}"` : "No articles in this category yet"}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* More Coming Soon Message */}
        {posts.length === 1 && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📚 More Articles Coming Soon!</h3>
            <p className="text-gray-600 text-sm">
              We're working on new guides about remote internships, resume tips, interview questions, and more.
              Check back weekly for fresh content!
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Get Internship Tips In Your Inbox</h3>
          <p className="text-blue-100 mb-6">
            Subscribe to get notified when new articles are published + weekly internship guides.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              const email = (e.currentTarget.elements[0] as HTMLInputElement).value
              console.log('Email submitted:', email)
              alert('Thanks for subscribing! You\'ll hear from us soon.')
              e.currentTarget.reset()
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-blue-100 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  )
}