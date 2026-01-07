import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bereket Market - Lokaler Marktplatz für orientalische Spezialitäten",
    template: "%s | Bereket Market",
  },
  description:
    "Entdecken Sie die besten Angebote von orientalischen Geschäften in Ihrer Nähe. Händler laden Fotos hoch, unsere KI erkennt automatisch die Produkte.",
  keywords: [
    "orientalische Lebensmittel",
    "lokaler Marktplatz",
    "Middle Eastern food",
    "German marketplace",
    "halal",
    "türkische Lebensmittel",
    "arabische Lebensmittel",
  ],
  authors: [{ name: "Bereket Market" }],
  creator: "Bereket Market",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://bereket-market.de",
    siteName: "Bereket Market",
    title: "Bereket Market - Lokaler Marktplatz für orientalische Spezialitäten",
    description:
      "Entdecken Sie die besten Angebote von orientalischen Geschäften in Ihrer Nähe.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bereket Market",
    description:
      "Entdecken Sie die besten Angebote von orientalischen Geschäften in Ihrer Nähe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Force dynamic rendering to ensure Clerk has access to environment variables
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="de" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
