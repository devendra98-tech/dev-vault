import type { Metadata } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url,
  ),
  title: {
    default: "DevVault — Free Developer Notes & Learning Guides",
    template: "%s | DevVault",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "developer resources",
    "programming notes",
    "cheat sheets",
    "JavaScript notes",
    "React guides",
    "interview guides",
    "developer roadmap",
    "free PDF notes",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.creator,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "DevVault — Free Developer Notes & Learning Guides",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DevVault — Free Developer Notes & Learning Guides",
    description: siteConfig.description,
    creator: siteConfig.creator,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
