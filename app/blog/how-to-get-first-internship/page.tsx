'use client'

import Link from 'next/link'

export default function HowToGetFirstInternship() {
  return (
    <article className='max-w-4xl mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold mb-4'>How to Get Your First Internship in 2026</h1>
      <div className='text-gray-500 mb-8 border-b pb-4'>10 min read • Updated January 2026</div>
      
      <div className='prose prose-lg max-w-none'>
        <p className='text-xl text-gray-600 mb-6'>Landing your first internship feels impossible until you know the right strategy. Here's exactly how to do it.</p>
        
        <h2>1. Build Your Skills First</h2>
        <p>Before applying anywhere, make sure you have the basics covered:</p>
        <ul>
          <li><strong>For developers:</strong> HTML, CSS, JavaScript, React/Next.js</li>
          <li><strong>For data analysts:</strong> Excel, SQL, Python, Tableau</li>
          <li><strong>For marketers:</strong> SEO, content writing, social media</li>
        </ul>
        
        <h2>2. Create a Standout Resume</h2>
        <p>Your resume is your ticket in. Keep it to one page and use action verbs.</p>
        
        <h2>3. Apply to 10-15 Internships Per Week</h2>
        <p>Don't put all your eggs in one basket. Apply widely and customize each application.</p>
        
        <div className='bg-blue-50 p-6 rounded-lg mt-8'>
          <h3 className='font-bold text-lg mb-2'>🎯 Ready to start?</h3>
          <p className='mb-4'>Browse verified internships on Internify — 100% free.</p>
          <Link href='/internships' className='bg-blue-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-blue-700'>Browse Internships →</Link>
        </div>
      </div>
    </article>
  )
}
