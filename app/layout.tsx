import type { Metadata } from 'next';
import Script from 'next/script';
import "./globals.css";
import Providers from "./providers";
import BanWatcher from "@/components/BanWatcher";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata: Metadata = {
  title: 'Internify: Find Verified Internships in India 2026 | 100% Free',
  description: 'Hand-picked, verified internships from real companies. No spam, no ghost listings. Frontend, Data Analyst, Marketing & more. Free internship portal for students.',
  keywords: 'internships in India, student internships, fresher jobs, remote internships, summer internships 2026, verified internships',
  authors: [{ name: 'Internify' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tryinternify.in',
  },
  openGraph: {
    title: 'Internify: Find Verified Internships in India 2026',
    description: 'Hand-picked, verified internships from real companies. 100% free.',
    url: 'https://tryinternify.in',
    siteName: 'Internify',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internify: Find Verified Internships in India 2026',
    description: 'Hand-picked, verified internships from real companies. 100% free.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* PERFORMANCE OPTIMIZATION: Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PERFORMANCE OPTIMIZATION: Preload Critical Assets */}
        <link rel="preload" href="/Internify.png" as="image" type="image/png" />
        
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Internify",
              "url": "https://tryinternify.in",
              "logo": "https://tryinternify.in/Internify.png",
              "sameAs": [
                "https://www.linkedin.com/company/join-internify/",
                "https://www.instagram.com/internify.in/",
                "https://x.com/internify83656"
              ]
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <NotificationProvider>
            <BanWatcher />
            {children}
          </NotificationProvider>
        </Providers>
        
        {/* Google Analytics - Loads after page is interactive */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-CZM79LK7MR"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CZM79LK7MR');
            `,
          }}
        />
        
        {/* Amplitude Analytics - Product analytics for user behavior tracking */}
        <Script
          strategy="lazyOnload"
          src="https://cdn.amplitude.com/libs/amplitude-8.21.0-min.gz.js"
        />
        <Script
          id="amplitude"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize Amplitude
              window.amplitude = window.amplitude || {};
              
              function initAmplitude() {
                if (typeof amplitude !== 'undefined') {
                  amplitude.init('c66e28122c6cfea9315d9422db79a9d5', null, {
                    defaultTracking: {
                      pageViews: true,
                      sessions: true,
                      formInteractions: true,
                      fileDownloads: true,
                      linkClicks: false
                    }
                  });
                  console.log('Amplitude initialized');
                }
              }
              
              // Wait for script to load
              if (typeof amplitude !== 'undefined') {
                initAmplitude();
              } else {
                window.addEventListener('load', initAmplitude);
              }
              
              // Track custom events helper
              window.trackEvent = function(eventName, eventProperties) {
                if (typeof amplitude !== 'undefined') {
                  amplitude.track(eventName, eventProperties);
                }
              };
            `,
          }}
        />
      </body>
    </html>
  );
}