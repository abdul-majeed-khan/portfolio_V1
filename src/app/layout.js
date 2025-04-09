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
  title: "Abdul Majeed",
  description: "developed by Majeed",
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
