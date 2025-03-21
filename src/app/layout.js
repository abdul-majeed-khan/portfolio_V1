import "./globals.css"
import Header from '../components/Header';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ClientCursor from './ClientCursor';


export const metadata = {
  title: "Abdul Majeed",
  description: "developed by Majeed",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="StKnFVMdxYtC2pDJPSr7oQjfKmXrAl1UXRLLkokFj8o" />
        <meta name="google-site-verification" content="P2_1zWxkE0R-QmgUGw4dGpmHqVlIO0X-SaoFDdH-ciM" />
      </head>
      <body >
        <ClientCursor />
        <Header />
        <SpeedInsights/>
        <Analytics/>
        {children}
      </body>
    </html>
  )
}
