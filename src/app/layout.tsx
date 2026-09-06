import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url,
  ),
  title: {
    default: "DevVault — Resources for Developers",
    template: "%s | DevVault",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  keywords: [
    "developer resources",
    "programming notes",
    "cheat sheets",
    "JavaScript notes",
    "React guides",
    "interview guides",
    "developer roadmap",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "DevVault — Resources for Developers",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DevVault — Resources for Developers",
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
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
