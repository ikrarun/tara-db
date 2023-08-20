import "./globals.css";
import type { Metadata } from "next";
import { Raleway as Font } from "next/font/google";
import Reload from "@/app/profile/Reload";
import AuthProvider from "@/server/AuthProvider";

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
        <div className="min-h-screen w-full tracking-wide">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
