import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans as Font } from "next/font/google";
import AuthProvider from "@/server/AuthProvider";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

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
      <AuthProvider>
        <body className={font.className}>
          <div className="flex flex-col w-full min-h-screen">
            <Nav />
            <div className="max-w-[900px] grow w-full flex flex-row  p-4 mx-auto">
              {children}
            </div>
            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
