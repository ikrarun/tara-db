import AuthProvider from "@/server/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";

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
    <AuthProvider>
      <html lang="en">
        <body className={font.className}>
          <div className="min-h-screen w-full">{children}</div>
        </body>
      </html>
    </AuthProvider>
  );
}
