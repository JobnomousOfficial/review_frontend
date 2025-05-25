
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata = {
    title: "Maps Review Aggregator",
    description:
      "Discover, analyze, and compare reviews from multiple places using our smart Maps review tool. Ideal for businesses and customers looking for location-based insights.",
  };


  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body
         suppressHydrationWarning={true}
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    );
  }
