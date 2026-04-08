'use client'

import Link from 'next/link'
import { 
  CheckCircle, 
  Lightbulb, 
  Target, 
  Clock, 
  Award, 
  ChevronRight, 
  TrendingUp,
  Globe,
  MapPin,
  Sparkles,
  BarChart3,
  Code2,
  Megaphone,
  MessageCircle
} from 'lucide-react'

export default function HowToGetFirstInternshipIndia() {
  return (
    <article className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
      {/* Breadcrumb Navigation */}
      <nav className='flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap' aria-label='Breadcrumb'>
        <Link href='/' className='hover:text-blue-600 transition-colors'>Home</Link>
        <span>/</span>
        <Link href='/blog' className='hover:text-blue-600 transition-colors'>Blog</Link>
        <span>/</span>
        <span className='text-gray-900 font-medium'>Internship Guide India (No Experience)</span>
      </nav>

      {/* Hero Section */}
      <header className='mb-8'>
        <div className='inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full mb-4'>
          <TrendingUp className='w-4 h-4 text-green-600' />
          <span className='text-xs font-semibold text-green-700 uppercase tracking-wider'>2026 Guide • For College Students</span>
        </div>
        
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight'>
          How to Get an Internship in India{' '}
          <span className='bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'>(No Experience)</span>
        </h1>
        
        <p className='text-xl text-gray-600 mb-4 max-w-3xl leading-relaxed'>
          Struggling to land your first internship with zero experience? This step-by-step guide shows you exactly what works in 2026 — from building skills to cracking interviews.
        </p>

        {/* Simple Stats - No Overclaims */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 my-6'>
          {[
            { value: '10-15', label: 'Apps per week', icon: Target },
            { value: '2-6', label: 'Weeks to offer', icon: Clock },
            { value: '30-50', label: 'Avg applications', icon: BarChart3 },
            { value: '100%', label: 'Free platform', icon: Sparkles }
          ].map((stat, idx) => (
            <div key={idx} className='bg-gray-50 rounded-xl p-3 text-center'>
              <stat.icon className='w-5 h-5 text-green-600 mx-auto mb-1' />
              <p className='text-lg font-bold text-gray-900'>{stat.value}</p>
              <p className='text-xs text-gray-500'>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Author & Meta */}
        <div className='flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              IN
            </div>
            <div>
              <p className='font-semibold text-gray-900'>Internify Team</p>
              <p className='text-xs'>Practical guide for Indian students</p>
            </div>
          </div>
          <div className='flex items-center gap-1.5'>
            <Clock className='w-4 h-4' />
            <span>Updated April 8, 2026 • 10 min read</span>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className='bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200' aria-label='Table of contents'>
        <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
          <Target className='w-5 h-5 text-green-600' />
          What You'll Learn
        </h2>
        <ul className='grid sm:grid-cols-2 gap-2'>
          {[
            'Skills you actually need (not what courses sell)',
            'How to build a resume with no experience',
            'Where to find real internships in India',
            'How to apply for internships the right way',
            'How many applications does it really take?',
            'How to crack internship interviews as a beginner',
            'Follow-up email template that works',
            'FAQ: Internships for beginners in India'
          ].map((item, idx) => (
            <li key={idx}>
              <a href={`#section-${idx + 1}`} className='flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors group'>
                <ChevronRight className='w-4 h-4 text-green-500 flex-shrink-0' />
                <span className='group-hover:underline text-sm'>{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className='prose prose-lg prose-green max-w-none'>
        
        {/* SECTION 1: Skills */}
        <section id='section-1' className='scroll-mt-24'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm font-bold'>1</span>
            Skills You Actually Need (Not What Courses Sell)
          </h2>
          
          <p className='text-gray-700 leading-relaxed'>
            Before applying for internships in India, you need job-relevant skills. Based on common requirements across internship listings, here's what companies actually look for:
          </p>

          <div className='grid sm:grid-cols-3 gap-4 my-6 not-prose'>
            {[
              {
                role: '💻 Software Development',
                icon: Code2,
                skills: ['HTML/CSS', 'JavaScript', 'React or Next.js', 'Git & GitHub', 'Basic APIs'],
                demand: '🔥 High demand',
                link: '/internships/software-development'
              },
              {
                role: '📊 Data Analytics',
                icon: BarChart3,
                skills: ['Excel (Advanced)', 'SQL', 'Python basics', 'Power BI or Tableau', 'Statistics'],
                demand: '📈 Growing fast',
                link: '/internships/data-analytics'
              },
              {
                role: '📢 Digital Marketing',
                icon: Megaphone,
                skills: ['SEO basics', 'Content writing', 'Social media', 'Google Analytics', 'Email marketing'],
                demand: '🎯 Always hiring',
                link: '/internships/digital-marketing'
              }
            ].map((domain, idx) => (
              <div key={idx} className='bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all'>
                <domain.icon className='w-8 h-8 text-green-600 mb-3' />
                <h3 className='font-bold text-lg mb-2'>{domain.role}</h3>
                <span className='inline-block text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full mb-3'>{domain.demand}</span>
                <ul className='space-y-2'>
                  {domain.skills.map((skill, i) => (
                    <li key={i} className='flex items-center gap-2 text-sm text-gray-700'>
                      <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
                      {skill}
                    </li>
                  ))}
                </ul>
                <Link href={domain.link} className='inline-flex items-center gap-1 text-green-600 text-sm font-medium mt-4 hover:underline'>
                  Browse {domain.role.split(' ')[1]} internships <ChevronRight className='w-4 h-4' />
                </Link>
              </div>
            ))}
          </div>

          <div className='bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-5 my-6 not-prose'>
            <div className='flex items-start gap-3'>
              <Lightbulb className='w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5' />
              <div>
                <p className='font-semibold text-amber-900 mb-1'>⭐ Important: Projects > Certificates</p>
                <p className='text-amber-800 text-sm'>
                  Companies care more about what you've built than what courses you've taken. A candidate with 2-3 solid projects and no certificates will often get hired over someone with 10 certificates and zero projects. Build real things.
                </p>
              </div>
            </div>
          </div>

          <h3 className='text-xl font-semibold text-gray-900 mt-6 mb-3'>How to get internship without experience in India?</h3>
          <p className='text-gray-700'>Start with projects. Pick a domain (web dev, data, or marketing). Build 2-3 small projects. Put them on GitHub or a portfolio site. Then start applying to entry-level internships that match your skills.</p>
        </section>

        {/* SECTION 2: Resume */}
        <section id='section-2' className='scroll-mt-24 mt-10'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold'>2</span>
            How to Build a Resume With No Experience
          </h2>

          <p className='text-gray-700 leading-relaxed'>
            Recruiters spend <strong>6-7 seconds</strong> scanning each resume. Here's how to make those seconds count:
          </p>

          <div className='grid sm:grid-cols-2 gap-4 my-6 not-prose'>
            <div className='bg-white border border-green-200 rounded-xl p-5'>
              <h4 className='font-bold text-green-700 mb-3 flex items-center gap-2'>
                <CheckCircle className='w-4 h-4' />
                ✅ Do This
              </h4>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'><span className='text-green-500'>✓</span> Keep it <strong>1 page</strong></li>
                <li className='flex items-start gap-2'><span className='text-green-500'>✓</span> Use action verbs: Built, Created, Led</li>
                <li className='flex items-start gap-2'><span className='text-green-500'>✓</span> Add projects with live links (GitHub/Netlify)</li>
                <li className='flex items-start gap-2'><span className='text-green-500'>✓</span> Customize for each role</li>
              </ul>
            </div>
            <div className='bg-white border border-red-200 rounded-xl p-5'>
              <h4 className='font-bold text-red-700 mb-3 flex items-center gap-2'>
                <span className='text-red-500'>✗</span> ❌ Avoid
              </h4>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-start gap-2'><span className='text-red-500'>✗</span> "Seeking a challenging opportunity..." (generic)</li>
                <li className='flex items-start gap-2'><span className='text-red-500'>✗</span> Irrelevant hobbies or personal details</li>
                <li className='flex items-start gap-2'><span className='text-red-500'>✗</span> Spelling or grammar mistakes</li>
                <li className='flex items-start gap-2'><span className='text-red-500'>✗</span> Fancy designs or photos</li>
              </ul>
            </div>
          </div>

          <div className='bg-gray-900 text-white rounded-xl p-5 my-6 not-prose'>
            <p className='font-medium mb-2 flex items-center gap-2'>📄 <span className='text-green-400'>Good Resume Example:</span></p>
            <p className='text-gray-300 text-sm font-mono'>
              Built a responsive weather app using React and OpenWeather API<br/>
              → 500+ monthly users<br/>
              → Deployed on Netlify<br/>
              → Code available on GitHub
            </p>
          </div>
        </section>

        {/* SECTION 3: Where to Find Internships */}
        <section id='section-3' className='scroll-mt-24 mt-10'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold'>3</span>
            Where to Find Real Internships in India
          </h2>

          <p className='text-gray-700 leading-relaxed'>
            Not all platforms have genuine listings. Here's where to find active internship opportunities:
          </p>

          <div className='overflow-x-auto my-6 not-prose'>
            <table className='min-w-full bg-white border border-gray-200 rounded-xl text-sm'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left font-semibold text-gray-900'>Platform</th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-900'>Verified Listings</th>
                  <th className='px-4 py-3 text-left font-semibold text-gray-900'>Free to Use</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                <tr className='bg-green-50'>
                  <td className='px-4 py-3 font-medium text-green-700'>Internify</td>
                  <td className='px-4 py-3'>Yes</td>
                  <td className='px-4 py-3'>Yes</td>
                </tr>
                <tr>
                  <td className='px-4 py-3'>LinkedIn</td>
                  <td className='px-4 py-3'>Mixed</td>
                  <td className='px-4 py-3'>Yes</td>
                </tr>
                <tr>
                  <td className='px-4 py-3'>Internshala</td>
                  <td className='px-4 py-3'>Some verified</td>
                  <td className='px-4 py-3'>Free + paid features</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 my-6 not-prose'>
            <h4 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <Target className='w-5 h-5 text-green-600' />
              Browse Active Internships
            </h4>
            <div className='flex flex-wrap gap-3'>
              <Link href='/internships/remote' className='inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all border border-green-200'>
                <Globe className='w-4 h-4' />
                Remote Internships
              </Link>
              <Link href='/internships/bangalore' className='inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all border border-green-200'>
                <MapPin className='w-4 h-4' />
                Bangalore Internships
              </Link>
              <Link href='/internships/paid' className='inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all border border-green-200'>
                <Award className='w-4 h-4' />
                Paid Internships
              </Link>
              <Link href='/internships' className='inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-all'>
                Browse All →
              </Link>
            </div>
          </div>

          <h3 className='text-xl font-semibold text-gray-900 mt-6 mb-3'>How to apply for internships in India?</h3>
          <p className='text-gray-700'>Start by filtering by your skills (software, data, marketing). Focus on roles that mention "fresher" or "entry-level." Create a <Link href="/internships" className='text-green-600 hover:underline'>free account on Internify</Link> to save jobs and track applications.</p>
        </section>

        {/* SECTION 4: Application Strategy */}
        <section id='section-4' className='scroll-mt-24 mt-10'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold'>4</span>
            How to Apply for Internships the Right Way
          </h2>

          <p className='text-gray-700 leading-relaxed'>
            Quality beats quantity. Here's a simple 3-step process:
          </p>

          <div className='space-y-4 my-6 not-prose'>
            {[
              { step: '1', title: 'Research the company (5 minutes)', desc: 'Understand what they do. Mention something specific in your application.' },
              { step: '2', title: 'Match keywords from the job description', desc: 'If they want "Python + Excel," those exact words should be in your resume.' },
              { step: '3', title: 'Write a short, specific cover message', desc: '3-4 sentences showing you did research and why you\'re interested.' }
            ].map((item, idx) => (
              <div key={idx} className='flex gap-4 p-4 bg-gray-50 rounded-xl'>
                <div className='w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold flex-shrink-0'>{item.step}</div>
                <div>
                  <p className='font-semibold text-gray-900'>{item.title}</p>
                  <p className='text-gray-600 text-sm'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white border border-gray-200 rounded-xl p-5 my-6 not-prose'>
            <p className='font-semibold text-gray-900 mb-2'>📝 Sample Cover Message:</p>
            <div className='bg-gray-50 p-4 rounded-lg text-sm text-gray-700'>
              "Hi, I came across your Digital Marketing internship and was impressed by your recent campaign.<br/><br/>
              I've been running a small Instagram page (500+ followers) where I create content and analyze insights. I'm comfortable with Canva, SEO basics, and social media scheduling.<br/><br/>
              Would love the opportunity to contribute and learn from your team."
            </div>
          </div>
        </section>

        {/* SECTION 5: How Many Applications */}
        <section id='section-5' className='scroll-mt-24 mt-10'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center text-sm font-bold'>5</span>
            How Many Applications Does It Really Take?
          </h2>

          <p className='text-gray-700 leading-relaxed'>
            Based on experiences shared by students who got their first internship:
          </p>

          <div className='bg-gray-50 rounded-xl p-6 my-6 not-prose'>
            <div className='space-y-4'>
              <div>
                <div className='flex justify-between text-sm mb-1'>
                  <span>Applications until first interview</span>
                  <span className='font-semibold'>15-25</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div className='bg-blue-500 h-2 rounded-full' style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className='flex justify-between text-sm mb-1'>
                  <span>Applications until first offer</span>
                  <span className='font-semibold'>30-50</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div className='bg-green-500 h-2 rounded-full' style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
            <p className='text-center text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200'>
              📊 <strong>Key insight:</strong> Many students quit before 20 applications. Consistency over 4-6 weeks makes the difference.
            </p>
          </div>

          <div className='bg-green-50 border border-green-200 rounded-xl p-5 my-6 not-prose'>
            <p className='font-semibold text-green-800 flex items-center gap-2'>
              <Target className='w-5 h-5' />
              Your Weekly Target:
            </p>
            <p className='text-green-700 text-sm mt-1'>
              Apply to <strong>10-15 internships per week</strong>. Track applications in a spreadsheet. After 4 weeks, you'll likely have 2-4 interview calls.
            </p>
          </div>

          <h3 className='text-xl font-semibold text-gray-900 mt-6 mb-3'>Why am I not getting internships?</h3>
          <p className='text-gray-700'>Common reasons: generic resume, applying without customization, lack of projects (certificates alone don't help), or not applying enough. Fix these and try again.</p>
        </section>

        {/* SECTION 6: Interview */}
        <section id='section-6' className='scroll-mt-24 mt-10'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold'>6</span>
            How to Crack Internship Interviews as a Beginner
          </h2>

          <p className='text-gray-700 leading-relaxed'>
            You don't need to be perfect. Interviewers typically check 3 things:
          </p>

          <div className='grid sm:grid-cols-3 gap-4 my-6 not-prose'>
            {[
              { title: '🔧 Your Projects', desc: 'Can you explain what you built and why?' },
              { title: '🧠 Problem-Solving', desc: 'How do you think through challenges?' },
              { title: '⚡ Attitude', desc: 'Are you willing to learn and grow?' }
            ].map((item, idx) => (
              <div key={idx} className='bg-white border border-gray-200 rounded-xl p-4'>
                <p className='font-bold text-gray-900 mb-2'>{item.title}</p>
                <p className='text-sm text-gray-600'>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className='bg-gray-900 text-white rounded-xl p-5 my-6 not-prose'>
            <p className='font-medium mb-3'>🎤 Common Question: "Tell me about yourself."</p>
            <p className='text-gray-300 text-sm'>
              <strong>Structure (60 seconds):</strong>
            </p>
            <ul className='text-gray-300 text-sm mt-2 space-y-1 list-disc list-inside'>
              <li>Past: What you're studying</li>
              <li>Present: Skills you're building + projects</li>
              <li>Future: Why this internship fits</li>
            </ul>
            <div className='mt-3 p-3 bg-gray-800 rounded-lg text-sm'>
              💡 Example: "I'm a 3rd-year CS student who's built 3 web projects including a portfolio and weather app. I'm looking for an internship where I can contribute to real products while improving my React skills."
            </div>
          </div>
        </section>

        {/* SECTION 7: Follow Up */}
        <section id='section-7' className='scroll-mt-24 mt-10'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm font-bold'>7</span>
            Follow-Up Email Template That Works
          </h2>

          <p className='text-gray-700 leading-relaxed'>
            If you haven't heard back after <strong>5-7 business days</strong>, send a polite follow-up:
          </p>

          <div className='bg-gray-50 border border-gray-200 rounded-xl p-5 my-6 not-prose'>
            <div className='font-mono text-sm space-y-2'>
              <p><span className='text-gray-500'>Subject:</span> Following up on Internship Application - [Role] - [Your Name]</p>
              <p className='pt-2'>Hi [Hiring Manager Name],</p>
              <p>I wanted to follow up on my application for the [Role] internship I submitted on [Date].</p>
              <p>I'm really interested in [Company Name]'s work, and I'd love the opportunity to contribute.</p>
              <p>Please let me know if there's any additional information I can provide.</p>
              <p>Best regards,<br/>[Your Name]</p>
            </div>
            <p className='text-xs text-gray-500 mt-4 pt-3 border-t border-gray-200'>
              💡 Don't follow up more than twice. If no response after second follow-up (1 week later), move on.
            </p>
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <section id='section-8' className='scroll-mt-24 mt-10'>
          <h2 className='flex items-center gap-3 text-2xl font-bold text-gray-900 mb-4'>
            <span className='w-8 h-8 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center text-sm font-bold'>8</span>
            FAQ: Internships for Beginners in India
          </h2>

          <div className='space-y-4 my-6 not-prose'>
            {[
              { q: 'How to get internship in India with no experience?', a: 'Focus on building 2-3 solid projects. Create a targeted resume. Apply to 10-15 internships per week. Customize each application. Most students get their first offer within 4-6 weeks.' },
              { q: 'Which year is best for internship in India?', a: '2nd and 3rd year are ideal. However, 1st year students can also apply for virtual internships and learning-oriented roles, especially during winter breaks.' },
              { q: 'Why am I not getting internships?', a: 'Common reasons: generic resume without keywords, applying randomly without customization, lack of projects, or not applying enough. Many students quit before 30 applications.' },
              { q: 'Are unpaid internships worth it in India?', a: 'Only if they offer real skill development and project work you can add to your portfolio. Otherwise, focus on paid internships or stipend-based roles.' },
              { q: 'How many applications to get first internship?', a: 'Most get their first interview after 15-25 applications and their first offer after 30-50 applications. Consistency matters more than volume.' },
              { q: 'Internship tips for freshers in India?', a: 'Start with projects. Pick one domain. Build a portfolio. Apply strategically (not randomly). Follow up professionally. Don\'t quit after 10 rejections.' }
            ].map((faq, idx) => (
              <div key={idx} className='bg-white border border-gray-200 rounded-xl p-4'>
                <p className='font-semibold text-gray-900 mb-2 flex items-center gap-2'>
                  <MessageCircle className='w-4 h-4 text-green-500' />
                  {faq.q}
                </p>
                <p className='text-gray-600 text-sm pl-6'>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <div className='bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 my-10 not-prose text-white'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div>
              <h3 className='text-2xl font-bold mb-2'>🎯 Ready to Start Your Internship Search?</h3>
              <p className='text-green-100 text-sm max-w-md'>
                Browse internships on Internify. Updated daily. 100% free.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Link 
                href='/internships' 
                className='bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all text-center shadow-lg hover:shadow-xl'
              >
                Browse All Internships →
              </Link>
              <Link 
                href='/auth/register' 
                className='bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all text-center'
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className='border-t border-gray-200 pt-8 mt-8 not-prose'>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>📚 More Internship Guides</h3>
          <div className='grid sm:grid-cols-3 gap-4'>
            {[
              { title: 'Remote vs In-Office Internships: Which is Better?', link: '/blog/remote-vs-office-internships' },
              { title: 'Top 10 Skills Employers Look for in Interns', link: '/blog/top-skills-for-interns' },
              { title: 'How to Negotiate Your Internship Stipend', link: '/blog/negotiate-internship-stipend' }
            ].map((post, idx) => (
              <Link key={idx} href={post.link} className='group'>
                <div className='bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors'>
                  <p className='font-medium text-gray-900 group-hover:text-green-600 transition-colors'>{post.title}</p>
                  <span className='text-green-600 text-sm group-hover:underline'>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}