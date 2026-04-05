import Link from "next/link"

export default function BlogIndex() {
  const posts = [
    { slug: "how-to-get-first-internship", title: "How to Get Your First Internship in 2026", date: "Jan 2026", readTime: "10 min" },
    { slug: "remote-internships-guide", title: "Remote Internships Guide 2026", date: "Jan 2026", readTime: "8 min" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Blog & Resources</h1>
      <p className="text-gray-600 mb-8">Tips and guides to help you land your dream internship</p>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="block p-6 border rounded-lg hover:shadow-lg hover:border-blue-300 transition cursor-pointer">
              <h2 className="text-xl font-bold mb-2 hover:text-blue-600">{post.title}</h2>
              <p className="text-gray-500 text-sm">{post.date} • {post.readTime} read</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
