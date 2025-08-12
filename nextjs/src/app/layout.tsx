import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoftHub – Cybersecurity, Web & Mobile Development",
  description:
    "Expert cybersecurity services, cutting-edge web development, and mobile app solutions. Protect your data and grow your business with SoftHub.",
  keywords:
    "cybersecurity, web development, mobile app development, penetration testing, full stack development, SoftHub",
  authors: [{ name: "SoftHub Team", url: "https://softhub.tn" }],
  creator: "SoftHub",
  metadataBase: new URL("https://softhub.tn"), // replace with your domain
  openGraph: {
    title: "SoftHub – Cybersecurity, Web & Mobile Development",
    description:
      "Secure your digital future with expert cybersecurity, responsive websites, and cross-platform mobile apps.",
    url: "https://softhub.tn", // replace with your URL
    siteName: "SoftHub",
    images: [
      {
        url: "/SoftHub_logo.png", // customize this
        width: 1200,
        height: 630,
        alt: "SoftHub – Cybersecurity & Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftHub – Cybersecurity, Web & Mobile Development",
    description:
      "Protect your business with cybersecurity and scalable web & mobile applications.",
    site: "@SoftHub", // replace with your Twitter handle
    creator: "@SoftHub",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/SoftHub_logo.png",
    shortcut: "/SoftHub_logo.png",
    apple: "/SoftHub_logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* You can add additional meta or structured data here if needed */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
