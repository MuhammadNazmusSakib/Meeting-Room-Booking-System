import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "./globals.css";
import Header from "./components/Header";
import QueryProvider from "./components/QueryProvider";
import Footer from "./components/Footer";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meeting Room Booking",
  description: "Meeting Room Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <QueryProvider>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Header />
            <main>{children}</main>
            <Footer />
          </body>
        </QueryProvider>
      </html>
    </ClerkProvider>
  );
}
