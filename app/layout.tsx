import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
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
  variable: "--font-mono",
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

const SNIPCART_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY ?? "";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link
          rel="preload"
          href="https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.css"
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
        {SNIPCART_KEY && (
          <>
            <Script
              async
              src="https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.js"
              strategy="afterInteractive"
            />
            <div
              hidden
              id="snipcart"
              data-api-key={SNIPCART_KEY}
              data-config-modal-style="side"
            />
          </>
        )}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
