import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DataViz Academy — Learn Data Engineering Visually",
    template: "%s | DataViz Academy",
  },
  description:
    "Master Data Science and Data Engineering through interactive visualizations, architecture diagrams, and hands-on pipeline walkthroughs.",
  keywords: [
    "data engineering",
    "data science",
    "apache spark",
    "snowflake",
    "data pipelines",
    "interactive learning",
    "visualization",
  ],
  authors: [{ name: "DataViz Academy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DataViz Academy",
    title: "DataViz Academy — Learn Data Engineering Visually",
    description:
      "Master Data Science and Data Engineering through interactive visualizations and pipeline diagrams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataViz Academy",
    description: "Learn Data Engineering through interactive visualizations.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <Header />
        <main style={{ paddingTop: "var(--nav-height)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
