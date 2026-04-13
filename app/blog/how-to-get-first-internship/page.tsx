'use client';

import Link from 'next/link';
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
} from 'lucide-react';

export default function HowToGetFirstInternshipIndia() {
  return (
    <article className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
      <nav className='flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap'>
        <Link href='/' className='hover:text-blue-600 transition-colors'>Home</Link>
        <span>/</span>
        <Link href='/blog' className='hover:text-blue-600 transition-colors'>Blog</Link>
        <span>/</span>
        <span className='text-gray-900 font-medium'>Internship Guide India (No Experience)</span>
      </nav>

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

        <div className='bg-green-50 border border-green-200 rounded-xl p-5 my-6'>
          <p className='font-semibold text-green-800 flex items-center gap-2'>
            <Target className='w-5 h-5' />
            Your Weekly Target:
          </p>
          <p className='text-green-700 text-sm mt-1'>
            Apply to <strong>10-15 internships per week</strong>. Track applications. After 4 weeks, you will likely have 2-4 interview calls.
          </p>
        </div>

        <div className='bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 my-10 text-white text-center'>
          <h3 className='text-2xl font-bold mb-2'>Ready to Start Your Internship Search?</h3>
          <p className='text-green-100 text-sm max-w-md mx-auto mb-4'>
            Browse internships on Internify. Updated daily. 100% free.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Link href='/internships' className='bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg'>
              Browse All Internships →
            </Link>
            <Link href='/auth/register' className='bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all'>
              Create Free Account
            </Link>
          </div>
        </div>
      </header>
    </article>
  );
}
