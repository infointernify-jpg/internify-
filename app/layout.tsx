import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import "./globals.css";
import Providers from "./providers";
import BanWatcher from "@/components/BanWatcher";
import { NotificationProvider } from "@/context/NotificationContext";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  title: 'Finance Internships in India (2026) | 150+ Open Roles in Investment Banking & FinTech',
  description: 'Find 150+ verified finance internships in India. Investment Banking, Equity Research, FinTech, Financial Analyst & CA Articleship. No ghost jobs. 100% free.',
  keywords: 'finance internships, finance internships india, investment banking internship, equity research internship, fintech internships, financial analyst internship, CA articleship, paid finance internships',
  authors: [{ name: 'Internify' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.tryinternify.in',  // ✅ Fixed: Added www
  },
  openGraph: {
    title: 'Finance Internships in India (2026) | 150+ Open Roles in Investment Banking & FinTech',
    description: 'Verified finance internships in Investment Banking, Equity Research, FinTech & Financial Analysis. 100% free for students.',
    url: 'https://www.tryinternify.in',  // ✅ Fixed: Added www
    siteName: 'Internify',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.tryinternify.in/og-image.png',  // ✅ Fixed: Added www
        width: 1200,
        height: 630,
        alt: 'Internify - Finance Internships for Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance Internships in India (2026) | 150+ Open Roles in Investment Banking & FinTech',
    description: 'Verified finance internships in Investment Banking, Equity Research, FinTech & Financial Analysis. 100% free.',
    images: ['https://www.tryinternify.in/twitter-image.png'],  // ✅ Fixed: Added www
    creator: '@internify83656',
    site: '@internify83656',
  },
  category: 'education',
  classification: 'Internship Portal',
  referrer: 'origin-when-cross-origin',
  creator: 'Internify',
  publisher: 'Internify Pvt. Ltd.',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Internify',
    statusBarStyle: 'black-translucent',
  },
  verification: {
    google: 'pFMAqcI7R1rA_0xWzK7w5zl79-8RvsnoPfa7lOIdEHA',  // ✅ Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect and Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/Internify.png" as="image" type="image/png" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.amplitude.com" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Favicon Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Internify",
              "url": "https://www.tryinternify.in",
              "logo": "https://www.tryinternify.in/Internify.png",
              "description": "Finance-focused internship platform connecting students with manually verified roles in Investment Banking, Equity Research, FinTech & more.",
              "foundingDate": "2026",
              "foundingLocation": "India",
              "areaServed": "India",
              "sameAs": [
                "https://www.linkedin.com/company/join-internify/",
                "https://www.instagram.com/internify.in/",
                "https://x.com/internify83656"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "internifyhelp@gmail.com",
                "contactType": "customer support",
                "availableLanguage": ["English", "Hindi"],
                "responseTime": "PT24H"
              },
              "offers": {
                "@type": "Offer",
                "description": "Free internship listings for students",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/OnlineOnly"
              }
            })
          }}
        />
        
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Internify",
              "url": "https://www.tryinternify.in",
              "logo": "https://www.tryinternify.in/Internify.png",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.tryinternify.in/internships?search={search_term}&location={location}"
                },
                "query-input": "required name=search_term"
              }
            })
          }}
        />
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Internify",
              "url": "https://www.tryinternify.in",
              "logo": "https://www.tryinternify.in/Internify.png",
              "description": "India's fastest-growing finance internship platform",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "priceRange": "₹0",
              "telephone": "+91-XXXXXXXXXX",
              "email": "internifyhelp@gmail.com"
            })
          }}
        />
        
        {/* FAQ Schema for Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What types of finance internships are on Internify?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Investment Banking, Equity Research, Financial Analysis, FinTech, CA Articleship, Portfolio Management, Risk & Compliance, and Corporate Finance — all manually verified."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Internify free for students?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "100% free. No premium tiers, no pay-to-apply, no hidden fees. Companies pay to post — students never pay."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How are internships verified?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every listing is manually reviewed — company confirmed, role checked, links tested. No ghost jobs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I find remote finance internships?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Use the 'Remote' filter to find work-from-home roles in equity research, financial modeling, and FinTech."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <NotificationProvider>
            <BanWatcher />
            {children}
          </NotificationProvider>
        </Providers>
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-CZM79LK7MR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CZM79LK7MR', {
                page_path: window.location.pathname,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_enhanced_conversions: true
              });
              
              window.gtagEvent = function(eventName, eventParams = {}) {
                gtag('event', eventName, eventParams);
              };
            `,
          }}
        />
        
        {/* Amplitude Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://cdn.amplitude.com/libs/amplitude-8.21.0-min.gz.js"
        />
        <Script
          id="amplitude"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function initAmplitude() {
                  if (typeof amplitude !== 'undefined' && amplitude.init) {
                    try {
                      amplitude.init('c66e28122c6cfea9315d9422db79a9d5', null, {
                        defaultTracking: {
                          pageViews: true,
                          sessions: true,
                          formInteractions: false,
                          fileDownloads: false,
                          linkClicks: false
                        },
                        logLevel: 'WARN',
                        optOut: false,
                        saveEvents: true,
                        includeUtm: true,
                        includeReferrer: true,
                        includeGclid: true
                      });
                    } catch (error) {
                      console.warn('Amplitude initialization error:', error);
                    }
                  } else {
                    setTimeout(initAmplitude, 1000);
                  }
                }
                
                if (document.readyState === 'complete') {
                  initAmplitude();
                } else {
                  window.addEventListener('load', initAmplitude);
                }
                
                window.trackEvent = function(eventName, eventProperties) {
                  if (typeof amplitude !== 'undefined' && amplitude.track) {
                    try {
                      amplitude.track(eventName, eventProperties);
                    } catch (error) {
                      console.warn('Amplitude track error:', error);
                    }
                  }
                };
                
                window.identifyUser = function(userId, userProperties) {
                  if (typeof amplitude !== 'undefined' && amplitude.setUserId) {
                    amplitude.setUserId(userId);
                    if (userProperties) {
                      amplitude.setUserProperties(userProperties);
                    }
                  }
                };
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}