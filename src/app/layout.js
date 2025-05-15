import "./globals.css"
import { Lexend, Azeret_Mono } from 'next/font/google';
import Header from '../components/Header';
import Script from "next/script"


const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
});

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-azeret-mono',
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
});

export const metadata = {
  title: "Abdul Majeed | Full Stack Developer & ML Engineer",
  description: "Full Stack Developer and Machine Learning Engineer specializing in React, Next.js, and AI solutions. View my portfolio and projects.",
  keywords: ["Abdul Majeed", "Full Stack Developer", "Machine Learning Engineer", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Abdul Majeed" }],
  creator: "Abdul Majeed",
  publisher: "Abdul Majeed",
  metadataBase: new URL("https://neuralblade.tech/"),
  openGraph: {
    title: "Abdul Majeed | Full Stack Developer & ML Engineer",
    description: "Full Stack Developer and Machine Learning Engineer specializing in React, Next.js, and AI solutions. View my portfolio and projects.",
    url: "https://neuralblade.tech/",
    siteName: "Abdul Majeed Portfolio",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Abdul Majeed - Full Stack Developer & ML Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Majeed | Full Stack Developer & ML Engineer",
    description: "Full Stack Developer and Machine Learning Engineer specializing in React, Next.js, and AI solutions. View my portfolio and projects.",
    images: ["/images/twitter.jpg"],
    creator: "@NeuralBlades",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "-s4eyykTqTuXVdKVE2oqo74T_8FuJ6e53b9l1ZmWsOE",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable} ${azeretMono.variable}`}>
      <body >
        <Header />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W5TBNJTXLK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W5TBNJTXLK');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
