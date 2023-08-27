import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans as Font } from "next/font/google";
import AuthProvider from "Auth/AuthProvider";
import Footer from "_components/Footer";
import Nav from "_components/Nav";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TARA",
  description: "Truth and Reclamation for Ambedkarism",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <div className="flex h-screen">
            {/* Left Side Navigation */}
            <Nav />
            {/* Main Content Area */}
            {/* Centered Content Area */}
            <div className="mx-auto max-w-[900px] p-4 w-full">{children}</div>
            {/* Right Side Content */}
            <div className="bg-red-500 flex-grow hidden sm:flex flex-shrink-0 w-1/5 p-4">
              {/* Right side content goes here */}
              Right Content
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
