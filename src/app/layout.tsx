import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "./globals.css";
import Header from "./components/Header";


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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
