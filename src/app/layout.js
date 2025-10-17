import AuthProvider from "@/components/AuthProvider";
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
  title: "Mercedes-Benz | The best or nothing",
  description:
    "Find your dream car with Mercedes-Benz. Explore our extensive range of luxury vehicles and experience unparalleled performance and design.",
  keywords: "luxury cars, mercedes-benz, high performance",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div
            className={`${geistSans.variable} ${geistMono.variable} font-sans`}
          >
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
