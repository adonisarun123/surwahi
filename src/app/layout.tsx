import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = generateMetadata({
  title: 'Surwahi Eco-Lodge',
  description: 'Eco-lodge offering sustainable stays near the forest. Experience regenerative hospitality in harmony with nature.',
  url: 'https://surwahi.com',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Preconnect to font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#1E5741" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-ui bg-sand-50 text-ink-900 antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        
        <Header />
        
        <main id="main" className="min-h-screen">
          {children}
        </main>
        
        <Footer />
        
        {/* Schema.org structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://surwahi.com/#org",
                  "name": "Surwahi Eco-Lodge",
                  "url": "https://surwahi.com/",
                  "logo": "https://surwahi.com/assets/logo.png",
                  "sameAs": [
                    "https://www.facebook.com/surwahi",
                    "https://www.instagram.com/surwahi",
                    "https://www.linkedin.com/company/surwahi"
                  ],
                  "foundingDate": "2020",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Surwahi Social, Village Surwahi, P.O Majgaon, Tehsil Paraswada",
                    "addressLocality": "Balaghat",
                    "addressRegion": "Madhya Pradesh",
                    "postalCode": "481111",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "22.2587", 
                    "longitude": "80.1829"
                  },
                  "telephone": "+919744844777",
                  "email": "contact@surwahi.com",
                  "image": "https://www.surwahi.com/og-image.jpg",
                  "contactPoint": [{
                    "@type": "ContactPoint",
                    "telephone": "+919744844777",
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": ["en", "hi"]
                  }]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://surwahi.com/#website",
                  "url": "https://surwahi.com/",
                  "name": "Surwahi Eco-Lodge",
                  "publisher": {"@id": "https://surwahi.com/#org"},
                  "inLanguage": "en-IN",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://surwahi.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
