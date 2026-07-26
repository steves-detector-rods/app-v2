import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SNIPCART_CSS_URL } from "@/lib/snipcart";
import { CartProvider } from "@/components/cart/CartProvider";
import { SnipcartLoader } from "@/components/cart/SnipcartLoader";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SearchOverlay } from "@/components/ui/SearchOverlay";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stevesdetectorrods.com"),
  title: {
    default: "Steve's Detector Rods — Hand-built carbon-fiber shafts",
    template: "%s | Steve's Detector Rods",
  },
  description:
    "Precision-built carbon-fiber and glass-fiber shafts for 14 metal detector models across Minelab, Garrett, XP, and Tarsacci. Hand-assembled in Norman, Oklahoma.",
  openGraph: {
    title: "Steve's Detector Rods",
    description:
      "Hand-built carbon-fiber shafts for serious detectorists.",
    url: "https://stevesdetectorrods.com",
    siteName: "Steve's Detector Rods",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link
          rel="preload"
          href={SNIPCART_CSS_URL}
          as="style"
        />
        <link
          rel="stylesheet"
          href={SNIPCART_CSS_URL}
        />
      </head>
      <body className="font-sans bg-bg text-text antialiased" suppressHydrationWarning>
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <main>{children}</main>
          <Footer />
          <SearchOverlay />
        </CartProvider>
        <SnipcartLoader />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
