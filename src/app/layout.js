import "./globals.css"
import Header from '../components/Header';
import Script from "next/script"


export const metadata = {
  title: "Abdul Majeed",
  description: "developed by Majeed",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
